import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

    socket = io(apiUrl, {
      withCredentials: true,

      // Allow Socket.IO to fall back to polling
      // if the WebSocket connection cannot be established.
      transports: ["websocket", "polling"],

      autoConnect: false,

      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("[socket] Connected:", socket?.id);
    });

    socket.on("connect_error", (err) => {
      console.error("[socket] Connection error:", err.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket] Disconnected:", reason);
    });
  }

  return socket;
}

/**
 * Connect the shared socket.
 */
export function connectSocket(): void {
  const socket = getSocket();

  if (!socket.connected) {
    socket.connect();
  }
}

/**
 * Tear down the shared socket.
 * Call this when the user logs out.
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
