// P1 OWNS this file long-term — P2 created it as the agreed event schema contract.
// P1 should import and re-export these constants so both sides stay in sync.
// P2 never modifies game state; it only listens to events and emits the three actions below.

/** Events P1 → P2 */
export const EVENTS = {
  onReveal:     'onReveal',     // { tileId: number, type: 'safe'|'trap'|'reward', playerId: number, voltage: number }
  onBust:       'onBust',       // { playerId: number }
  onCashout:    'onCashout',    // { playerId: number, voltage: number }
  onRoundEnd:   'onRoundEnd',   // { results: Array<{ playerId, voltage, status: 'bust'|'cashout'|'active' }> }
  onRoundStart: 'onRoundStart', // { boardSeed: number, playerCount: number, timerDuration: number, localPlayerId: number }
  onTimerSync:  'onTimerSync',  // { remaining: number }  — sent every second by P1
  onIdleStrikes: 'onIdleStrikes', // { count: number } — host idle strikes for local player (turn timer)
};

/** Actions P2 → P1 (the only three messages P2 ever sends) */
export const ACTIONS = {
  CASHOUT:       'CASHOUT',        // no payload
  MOVE_SELECTED: 'MOVE_SELECTED',  // { tileId: number }
  LOCK_IN:       'LOCK_IN',        // no payload — fired by TurnTimer on zero
  PLACE_BET:     'PLACE_BET',      // { amount: number }
  STAY_TURN:     'STAY_TURN',      // no payload — voluntarily idle this turn (costs 1 idle strike)
};
