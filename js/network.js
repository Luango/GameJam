// ─── Circuit Sphere Network Layer ───
// PeerJS wrapper for P2P multiplayer.
// Provides: createRoom, joinRoom, broadcast, sendToHost, heartbeat, reconnect.
// Ported from ThreeTest/index.html star topology pattern.

import { MSG, Msg, serialize, deserialize } from './protocol.js';

// ─── State ───

let peer = null;
let isHost = false;
let myId = '';
let myName = '';
let roomCode = '';

const connections = {};   // peerId -> DataConnection (host only)
let hostConn = null;      // Client's connection to host

let heartbeatInterval = null;
const HEARTBEAT_MS = 5000;

// Clock sync
let clockOffset = 0;      // hostTime - localTime
const clockSamples = [];
const MAX_CLOCK_SAMPLES = 5;

// ─── Callbacks ───

const callbacks = {
  onMessage: null,        // (msg, fromId) => void
  onPlayerJoin: null,     // (conn) => void
  onPlayerLeave: null,    // (peerId) => void
  onConnected: null,      // () => void
  onError: null,          // (error) => void
  onDisconnected: null,   // () => void
};

// ─── Public API ───

export function getState() {
  return { peer, isHost, myId, myName, roomCode, clockOffset };
}

export function setName(name) {
  myName = name;
}

export function on(event, callback) {
  if (event in callbacks) {
    callbacks[event] = callback;
  }
}

/**
 * Generate a 5-char room code (reused from ThreeTest).
 */
export function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let c = '';
  for (let i = 0; i < 5; i++) c += chars[Math.floor(Math.random() * chars.length)];
  return c;
}

/**
 * Create a room as host.
 * @returns {Promise<string>} Room code
 */
export function createRoom(playerName = 'Player 1') {
  return new Promise((resolve, reject) => {
    roomCode = genCode();
    isHost = true;
    myName = playerName;
    const peerId = 'circuit-' + roomCode;

    peer = new Peer(peerId);

    peer.on('open', (id) => {
      myId = id;
      console.log(`[Net] Host created room ${roomCode}, peer ID: ${myId}`);
      startHeartbeat();
      if (callbacks.onConnected) callbacks.onConnected();
      resolve(roomCode);
    });

    peer.on('connection', onHostConnection);

    peer.on('error', (err) => {
      console.error('[Net] Peer error:', err.type, err);
      if (callbacks.onError) callbacks.onError(err);
      reject(err);
    });

    peer.on('disconnected', () => {
      console.warn('[Net] Peer disconnected from signaling server');
      if (callbacks.onDisconnected) callbacks.onDisconnected();
    });
  });
}

/**
 * Join an existing room as client.
 * @param {string} code - Room code
 * @param {string} playerName - Display name
 * @returns {Promise<void>}
 */
export function joinRoom(code, playerName = 'Player') {
  return new Promise((resolve, reject) => {
    roomCode = code.trim().toUpperCase();
    isHost = false;
    myName = playerName;

    peer = new Peer();

    peer.on('open', (id) => {
      myId = id;
      console.log(`[Net] Client peer created: ${myId}, joining room ${roomCode}`);

      hostConn = peer.connect('circuit-' + roomCode, { reliable: true });

      hostConn.on('open', () => {
        console.log('[Net] Connected to host');
        sendToHost(Msg.join(myName, myId));
        startHeartbeat();
        if (callbacks.onConnected) callbacks.onConnected();
        resolve();
      });

      hostConn.on('data', (data) => {
        const msg = deserialize(data);
        if (!msg) return;
        handleIncomingMessage(msg, 'host');
      });

      hostConn.on('close', () => {
        console.warn('[Net] Lost connection to host');
        if (callbacks.onDisconnected) callbacks.onDisconnected();
      });

      hostConn.on('error', (err) => {
        console.error('[Net] Host connection error:', err);
        if (callbacks.onError) callbacks.onError(err);
        reject(err);
      });
    });

    peer.on('error', (err) => {
      console.error('[Net] Peer error:', err.type, err);
      if (callbacks.onError) callbacks.onError(err);
      reject(err);
    });
  });
}

/**
 * Broadcast a message to all connected clients (host only).
 * Also dispatches to self via onMessage callback.
 */
export function broadcast(msg) {
  if (!isHost) {
    console.warn('[Net] Only host can broadcast');
    return;
  }
  const data = serialize(msg);
  for (const conn of Object.values(connections)) {
    if (conn.open) {
      try { conn.send(data); } catch (e) { console.warn('[Net] Send failed to', conn.peer, e); }
    }
  }
  // Dispatch to self
  if (callbacks.onMessage) callbacks.onMessage(msg, myId);
}

/**
 * Send a message to the host (client only).
 */
export function sendToHost(msg) {
  if (isHost) {
    // Host sending to self — just dispatch directly
    if (callbacks.onMessage) callbacks.onMessage(msg, myId);
    return;
  }
  if (hostConn && hostConn.open) {
    try { hostConn.send(serialize(msg)); } catch (e) { console.warn('[Net] Send to host failed:', e); }
  }
}

/**
 * Send a message to a specific peer (host only).
 */
export function sendToPeer(peerId, msg) {
  if (!isHost) return;
  const conn = connections[peerId];
  if (conn && conn.open) {
    try { conn.send(serialize(msg)); } catch (e) { console.warn('[Net] Send to peer failed:', peerId, e); }
  }
}

/**
 * Get current clock offset for timer display.
 * clientDisplayTime = hostTimestamp - clockOffset
 */
export function getClockOffset() {
  return clockOffset;
}

/**
 * Get list of connected peer IDs (host only).
 */
export function getConnectedPeers() {
  return Object.keys(connections).filter(id => connections[id].open);
}

/**
 * Disconnect and clean up.
 */
export function disconnect() {
  stopHeartbeat();
  if (peer) {
    peer.destroy();
    peer = null;
  }
  isHost = false;
  myId = '';
  roomCode = '';
  Object.keys(connections).forEach(k => delete connections[k]);
  hostConn = null;
  clockOffset = 0;
  clockSamples.length = 0;
}

// ─── Internal ───

function onHostConnection(conn) {
  conn.on('open', () => {
    connections[conn.peer] = conn;
    console.log(`[Net] Client connected: ${conn.peer}`);

    conn.on('data', (data) => {
      const msg = deserialize(data);
      if (!msg) return;
      handleIncomingMessage(msg, conn.peer);
    });

    conn.on('close', () => {
      console.log(`[Net] Client disconnected: ${conn.peer}`);
      delete connections[conn.peer];
      if (callbacks.onPlayerLeave) callbacks.onPlayerLeave(conn.peer);
    });

    conn.on('error', (err) => {
      console.warn(`[Net] Connection error from ${conn.peer}:`, err);
    });
  });
}

function handleIncomingMessage(msg, fromId) {
  // Handle heartbeat for clock sync
  if (msg.type === MSG.HEARTBEAT) {
    if (!isHost && msg.timestamp) {
      // Client: update clock offset estimate
      const localNow = Date.now();
      const sample = msg.timestamp - localNow;
      clockSamples.push(sample);
      if (clockSamples.length > MAX_CLOCK_SAMPLES) clockSamples.shift();
      // Use median for robustness
      const sorted = [...clockSamples].sort((a, b) => a - b);
      clockOffset = sorted[Math.floor(sorted.length / 2)];
    }
    return; // Don't pass heartbeats to game logic
  }

  // Pass to game logic
  if (callbacks.onMessage) callbacks.onMessage(msg, fromId);
}

function startHeartbeat() {
  stopHeartbeat();
  heartbeatInterval = setInterval(() => {
    if (isHost) {
      broadcast(Msg.heartbeat());
    }
  }, HEARTBEAT_MS);
}

function stopHeartbeat() {
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval);
    heartbeatInterval = null;
  }
}
