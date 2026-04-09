// ─── Circuit Sphere Turn Manager ───
// Simultaneous turn state machine with host-owned timer.
// Manages: turn begin → submission collection → resolve → reveal → next/end.

import { MSG, ACTION, STATUS, TILE, Msg } from './protocol.js';
import { isAdjacent, isForwardMove, getTile } from './board.js';
import { calculateStepVoltage, calculatePayout } from './voltage.js';
import {
  isActive, isResolved, applyStepResult, bustPlayer,
  cashOutPlayer, forfeitPlayer, serializePlayer
} from './player.js';

// ─── Turn States ───

export const TURN_STATE = Object.freeze({
  IDLE:       'idle',       // Between rounds or before game
  AWAITING:   'awaiting',   // Waiting for player moves
  RESOLVING:  'resolving',  // All moves collected, computing results
  REVEALING:  'revealing',  // Animation window after broadcast
});

/**
 * Create a TurnManager instance.
 * Only the host runs the authoritative turn flow; clients mirror state from broadcasts.
 *
 * @param {object} opts
 * @param {Function} opts.broadcast - (msg) => void, send to all peers
 * @param {Function} opts.sendToPeer - (peerId, msg) => void
 * @param {Function} opts.onTurnReveal - (revealData) => void, called after reveal for animation
 * @param {Function} opts.onRoundEnd - (endData) => void
 * @param {number} opts.turnTimerMs - Turn duration in ms
 * @param {number} opts.revealDelayMs - Animation window after reveal (default 2500)
 */
export function createTurnManager(opts) {
  const {
    broadcast,
    sendToPeer,
    onTurnReveal,
    onRoundEnd,
    turnTimerMs = 15000,
    revealDelayMs = 2500,
  } = opts;

  // ─── State ───

  let state = TURN_STATE.IDLE;
  let turnNumber = 0;
  let timerDeadline = null;
  let timerTimeout = null;

  let board = null;
  let players = {};          // id -> player object
  let bet = 100;             // Default bet
  let pendingMoves = {};     // playerId -> { tileId, action }
  let revealedTiles = {};    // tileId -> { tileState, revealedBy, turnRevealed }
  let config = null;

  // ─── Public API ───

  function init(boardData, playerMap, gameConfig, betAmount = 100) {
    board = boardData;
    players = playerMap;
    config = gameConfig;
    bet = betAmount;
    turnNumber = 0;
    pendingMoves = {};
    revealedTiles = {};
    state = TURN_STATE.IDLE;
  }

  function getState() {
    return { state, turnNumber, timerDeadline, revealedTiles };
  }

  /**
   * Start the next turn (host only).
   */
  function beginTurn() {
    turnNumber++;
    pendingMoves = {};
    state = TURN_STATE.AWAITING;

    const now = Date.now();
    timerDeadline = now + turnTimerMs;

    // Build active/resolved player lists
    const activePlayers = [];
    const resolvedPlayers = [];

    for (const p of Object.values(players)) {
      if (isActive(p)) {
        activePlayers.push({
          id: p.id,
          name: p.name,
          currentTileId: p.currentTileId,
          voltage: p.voltage,
          status: p.status,
        });
      } else {
        resolvedPlayers.push({
          id: p.id,
          name: p.name,
          finalVoltage: p.voltage,
          status: p.status,
        });
      }
    }

    // Broadcast turn-begin
    broadcast(Msg.turnBegin({
      turnNumber,
      timerDeadline,
      hostTimestamp: now,
      activePlayers,
      resolvedPlayers,
    }));

    // Start timer
    clearTimeout(timerTimeout);
    timerTimeout = setTimeout(() => {
      onTimerExpired();
    }, turnTimerMs);
  }

  /**
   * Handle a move submission from a player (host only).
   * Returns { ok, reason }.
   */
  function handleMove(playerId, tileId, action) {
    if (state !== TURN_STATE.AWAITING) {
      return { ok: false, reason: 'not_awaiting_moves' };
    }

    const player = players[playerId];
    if (!player || !isActive(player)) {
      return { ok: false, reason: 'player_not_active' };
    }

    if (pendingMoves[playerId]) {
      return { ok: false, reason: 'already_submitted' };
    }

    if (action === ACTION.CASHOUT) {
      pendingMoves[playerId] = { tileId: null, action: ACTION.CASHOUT };
      checkAllSubmitted();
      return { ok: true };
    }

    if (action === ACTION.STEP) {
      // Validate adjacency
      if (!isAdjacent(board, player.currentTileId, tileId)) {
        return { ok: false, reason: 'not_adjacent' };
      }
      // Validate forward-only
      if (!isForwardMove(board, player.currentTileId, tileId)) {
        return { ok: false, reason: 'not_forward' };
      }
      // Validate tile exists
      if (!getTile(board, tileId)) {
        return { ok: false, reason: 'invalid_tile' };
      }

      pendingMoves[playerId] = { tileId, action: ACTION.STEP };
      checkAllSubmitted();
      return { ok: true };
    }

    return { ok: false, reason: 'invalid_action' };
  }

  /**
   * Check if all active players have submitted.
   */
  function checkAllSubmitted() {
    const activeIds = Object.values(players)
      .filter(p => isActive(p))
      .map(p => p.id);

    const allSubmitted = activeIds.every(id => pendingMoves[id]);

    if (allSubmitted) {
      clearTimeout(timerTimeout);
      resolveTurn();
    }
  }

  /**
   * Timer expired — forfeit non-submitters and resolve.
   */
  function onTimerExpired() {
    if (state !== TURN_STATE.AWAITING) return;

    // Find players who didn't submit
    const forfeitedIds = [];
    for (const p of Object.values(players)) {
      if (isActive(p) && !pendingMoves[p.id]) {
        // Auto-forfeit: skip this turn (player stays active but loses turn)
        pendingMoves[p.id] = { tileId: null, action: ACTION.TIMEOUT };
        forfeitedIds.push(p.id);
      }
    }

    if (forfeitedIds.length > 0) {
      broadcast(Msg.turnTimeout(forfeitedIds));
    }

    resolveTurn();
  }

  /**
   * Resolve all pending moves and broadcast results (host only).
   */
  function resolveTurn() {
    state = TURN_STATE.RESOLVING;

    const results = [];
    const newlyRevealed = {};    // tileId -> { tileState, revealedBy }
    const tileClaimants = {};    // tileId -> [playerId] — for simultaneous claims

    // Group step moves by tile for simultaneous detection
    for (const [playerId, move] of Object.entries(pendingMoves)) {
      if (move.action === ACTION.STEP && move.tileId != null) {
        if (!tileClaimants[move.tileId]) tileClaimants[move.tileId] = [];
        tileClaimants[move.tileId].push(playerId);
      }
    }

    // Process each player's move
    for (const [playerId, move] of Object.entries(pendingMoves)) {
      const player = players[playerId];
      if (!player) continue;

      // ── Cash Out ──
      if (move.action === ACTION.CASHOUT) {
        cashOutPlayer(player, bet);
        results.push({
          playerId,
          action: ACTION.CASHOUT,
          tileId: null,
          tileState: null,
          voltageGain: 0,
          totalVoltage: player.voltage,
          status: player.status,
          isResistanceApplied: false,
          isSimultaneousClaim: false,
          rewardClaimed: false,
          payout: player.payout,
        });
        continue;
      }

      // ── Timeout ──
      if (move.action === ACTION.TIMEOUT) {
        // Player loses this turn but stays active (first timeout = skip, could escalate)
        results.push({
          playerId,
          action: ACTION.TIMEOUT,
          tileId: null,
          tileState: null,
          voltageGain: 0,
          totalVoltage: player.voltage,
          status: player.status,
          isResistanceApplied: false,
          isSimultaneousClaim: false,
          rewardClaimed: false,
          payout: null,
        });
        continue;
      }

      // ── Step ──
      const tile = getTile(board, move.tileId);
      if (!tile) continue;

      const tileState = tile.tileType;
      const isSimultaneous = (tileClaimants[move.tileId] || []).length > 1;
      const simultaneousCount = (tileClaimants[move.tileId] || []).length;

      // Was this tile already revealed safe by a prior turn?
      const isFollower = revealedTiles[move.tileId] &&
                         revealedTiles[move.tileId].tileState !== TILE.TRAP;

      if (tileState === TILE.TRAP) {
        // ── Bust ──
        bustPlayer(player);
        // Track newly revealed tile
        if (!newlyRevealed[move.tileId]) {
          newlyRevealed[move.tileId] = { tileState, revealedBy: [] };
        }
        newlyRevealed[move.tileId].revealedBy.push(playerId);

        results.push({
          playerId,
          action: ACTION.STEP,
          tileId: move.tileId,
          tileState: TILE.TRAP,
          voltageGain: 0,
          totalVoltage: player.voltage,
          status: player.status,
          isResistanceApplied: false,
          isSimultaneousClaim: isSimultaneous,
          rewardClaimed: false,
          payout: null,
        });
      } else {
        // ── Safe or Reward ──
        const { voltageGain } = calculateStepVoltage(
          tile.zone,
          tileState,
          {
            isFollower,
            isSimultaneous,
            simultaneousCount,
            rates: config ? config.voltageRates : undefined,
          }
        );

        const rewardClaimed = tileState === TILE.REWARD && !isFollower;
        applyStepResult(player, move.tileId, voltageGain, tile.zone);

        if (!isFollower) {
          player.tilesExplored++;
        }

        // Track newly revealed tile
        if (!revealedTiles[move.tileId] && !newlyRevealed[move.tileId]) {
          newlyRevealed[move.tileId] = { tileState, revealedBy: [] };
        }
        if (newlyRevealed[move.tileId]) {
          newlyRevealed[move.tileId].revealedBy.push(playerId);
        }

        results.push({
          playerId,
          action: ACTION.STEP,
          tileId: move.tileId,
          tileState,
          voltageGain,
          totalVoltage: player.voltage,
          status: player.status,
          isResistanceApplied: isFollower,
          isSimultaneousClaim: isSimultaneous,
          rewardClaimed,
          payout: null,
        });
      }
    }

    // Update revealedTiles master record
    for (const [tileId, data] of Object.entries(newlyRevealed)) {
      revealedTiles[tileId] = {
        tileState: data.tileState,
        revealedBy: data.revealedBy,
        turnRevealed: turnNumber,
      };
    }

    // Build board state summary
    const boardState = {
      totalRevealed: Object.keys(revealedTiles).length,
      totalTrapsFound: Object.values(revealedTiles).filter(t => t.tileState === TILE.TRAP).length,
      totalRewardsFound: Object.values(revealedTiles).filter(t => t.tileState === TILE.REWARD).length,
    };

    // Build newly revealed tiles array
    const newlyRevealedTiles = Object.entries(newlyRevealed).map(([id, data]) => ({
      id: parseInt(id),
      tileState: data.tileState,
      revealedBy: data.revealedBy,
    }));

    // Broadcast turn-reveal
    const revealMsg = Msg.turnReveal({ turnNumber, results, newlyRevealedTiles, boardState });
    broadcast(revealMsg);

    state = TURN_STATE.REVEALING;

    // Notify local handler for animations
    if (onTurnReveal) onTurnReveal(revealMsg);

    // After reveal animation delay, check for round end or next turn
    setTimeout(() => {
      checkRoundEnd();
    }, revealDelayMs);
  }

  /**
   * Check if round should end or continue.
   */
  function checkRoundEnd() {
    const activePlayers = Object.values(players).filter(p => isActive(p));

    if (activePlayers.length === 0) {
      endRound();
    } else {
      beginTurn();
    }
  }

  /**
   * End the round and broadcast results.
   */
  function endRound() {
    state = TURN_STATE.IDLE;
    clearTimeout(timerTimeout);

    const results = Object.values(players).map(p => ({
      id: p.id,
      name: p.name,
      color: p.color,
      finalVoltage: p.voltage,
      status: p.status,
      payout: p.payout || 0,
      pathLength: p.path.length,
      deepestZone: p.deepestZone,
      tilesExplored: p.tilesExplored,
      bustTile: p.status === STATUS.BUSTED ? p.path[p.path.length - 1] : null,
    }));

    // Build leaderboard sorted by payout
    const leaderboard = [...results]
      .sort((a, b) => b.payout - a.payout)
      .map((r, i) => ({ id: r.id, name: r.name, payout: r.payout, rank: i + 1 }));

    const endMsg = Msg.roundEnd({
      roundNumber: 1, // Could track this if supporting multiple rounds
      totalTurns: turnNumber,
      results,
      leaderboard,
    });

    broadcast(endMsg);
    if (onRoundEnd) onRoundEnd(endMsg);
  }

  /**
   * Clean up timers.
   */
  function destroy() {
    clearTimeout(timerTimeout);
    state = TURN_STATE.IDLE;
  }

  return {
    init,
    getState,
    beginTurn,
    handleMove,
    destroy,
  };
}
