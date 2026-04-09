// ─── Circuit Sphere Message Protocol ───
// All message type constants and payload builder functions.
// Centralizes the wire format so network.js, turn-manager.js, and lobby-ui.js
// all reference the same type strings and shapes.

// ─── Message Types ───

export const MSG = Object.freeze({
  // Lobby
  JOIN:                'join',
  PLAYERS:             'players',
  READY:               'ready',

  // Betting
  BET_PHASE:           'bet-phase',
  BET_SUBMIT:          'bet-submit',
  BET_CONFIRMED:       'bet-confirmed',

  // Game
  GAME_START:          'game-start',

  // Gameplay
  TURN_BEGIN:          'turn-begin',
  MOVE:                'move',
  MOVE_ACK:            'move-ack',
  TURN_REVEAL:         'turn-reveal',
  TURN_TIMEOUT:        'turn-timeout',

  // End
  ROUND_END:           'round-end',
  REMATCH:             'rematch',
  NEW_ROUND:           'new-round',

  // Connection
  HEARTBEAT:           'heartbeat',
  REJOIN:              'rejoin',
  REJOIN_ACK:          'rejoin-ack',
  STATE_SYNC:          'state-sync',
  PLAYER_DISCONNECTED: 'player-disconnected',
  PLAYER_RECONNECTED:  'player-reconnected',
});

// ─── Action Types ───

export const ACTION = Object.freeze({
  STEP:    'step',
  CASHOUT: 'cashout',
  TIMEOUT: 'timeout',
});

// ─── Player Status ───

export const STATUS = Object.freeze({
  ACTIVE:     'active',
  BUSTED:     'busted',
  CASHED_OUT: 'cashed_out',
  FORFEITED:  'forfeited',
});

// ─── Zone Types ───

export const ZONE = Object.freeze({
  SAFE:     'safe',
  CHARGED:  'charged',
  CRITICAL: 'critical',
});

// ─── Tile Types ───

export const TILE = Object.freeze({
  SAFE:   'safe',
  TRAP:   'trap',
  REWARD: 'reward',
});

// ─── Round Phases ───

export const PHASE = Object.freeze({
  LOBBY:      'lobby',
  BETTING:    'betting',
  PLAYING:    'playing',
  RESOLUTION: 'resolution',
  ENDED:      'ended',
});

// ─── Payload Builders ───
// Each returns a plain object ready for JSON.stringify().

export const Msg = {

  // ── Lobby ──

  join(name, playerId) {
    return { type: MSG.JOIN, name, playerId };
  },

  players(list) {
    // list: [{id, name, ready, color}]
    return { type: MSG.PLAYERS, list };
  },

  ready() {
    return { type: MSG.READY };
  },

  betPhase(playerList, timerDeadline, hostTimestamp) {
    // playerList: [{id, name, color, bankroll, hasBet?}]
    return { type: MSG.BET_PHASE, playerList, timerDeadline, hostTimestamp };
  },

  betSubmit(amount) {
    return { type: MSG.BET_SUBMIT, amount };
  },

  betConfirmed(bets) {
    // bets: { playerId: amount, ... }
    return { type: MSG.BET_CONFIRMED, bets };
  },

  gameStart({ seed, board, playerOrder, bets, config }) {
    return {
      type: MSG.GAME_START,
      seed,
      board,        // { tiles, startTiles, zoneRings }
      playerOrder,  // [{id, name, color, startTileId, bankroll}]
      bets,         // { playerId: amount }
      config,       // { turnTimerMs, voltageRates, trapDensity }
    };
  },

  // ── Gameplay ──

  turnBegin({ turnNumber, timerDeadline, hostTimestamp, activePlayers, resolvedPlayers }) {
    return {
      type: MSG.TURN_BEGIN,
      turnNumber,
      timerDeadline,
      hostTimestamp,
      activePlayers,   // [{id, name, currentTileId, voltage, status}]
      resolvedPlayers, // [{id, name, finalVoltage, status}]
    };
  },

  move(tileId, action) {
    // action: ACTION.STEP | ACTION.CASHOUT
    return { type: MSG.MOVE, tileId, action };
  },

  moveAck(ok, reason = null) {
    return { type: MSG.MOVE_ACK, ok, reason };
  },

  turnReveal({ turnNumber, results, newlyRevealedTiles, boardState }) {
    return {
      type: MSG.TURN_REVEAL,
      turnNumber,
      results,             // [{playerId, action, tileId, tileState, voltageGain, totalVoltage, status, ...}]
      newlyRevealedTiles,  // [{id, tileState, revealedBy}]
      boardState,          // {totalRevealed, totalTrapsFound, totalRewardsFound}
    };
  },

  turnTimeout(forfeitedPlayers) {
    return { type: MSG.TURN_TIMEOUT, forfeitedPlayers };
  },

  // ── End ──

  roundEnd({ roundNumber, totalTurns, results, leaderboard }) {
    return {
      type: MSG.ROUND_END,
      roundNumber,
      totalTurns,
      results,      // [{id, name, color, finalVoltage, status, payout, pathLength, deepestZone, tilesExplored, bustTile}]
      leaderboard,  // [{id, name, payout, rank}]
    };
  },

  rematch() {
    return { type: MSG.REMATCH };
  },

  newRound({ seed, board, playerOrder, config }) {
    return { type: MSG.NEW_ROUND, seed, board, playerOrder, config };
  },

  // ── Connection ──

  heartbeat() {
    return { type: MSG.HEARTBEAT, timestamp: Date.now() };
  },

  rejoin(playerId, roomCode) {
    return { type: MSG.REJOIN, playerId, roomCode };
  },

  rejoinAck(ok, state = null) {
    return { type: MSG.REJOIN_ACK, ok, state };
  },

  stateSync(gameState) {
    return { type: MSG.STATE_SYNC, ...gameState };
  },

  playerDisconnected(playerId, graceDeadline) {
    return { type: MSG.PLAYER_DISCONNECTED, playerId, graceDeadline };
  },

  playerReconnected(playerId) {
    return { type: MSG.PLAYER_RECONNECTED, playerId };
  },
};

// ─── Serialization Helpers ───

export function serialize(msg) {
  return JSON.stringify(msg);
}

export function deserialize(data) {
  try {
    return JSON.parse(data);
  } catch {
    console.warn('[Protocol] Failed to parse message:', data);
    return null;
  }
}
