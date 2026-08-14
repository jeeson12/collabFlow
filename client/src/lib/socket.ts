import { io, Socket } from "socket.io-client";
import { getApiBaseUrl } from "./api/axios";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    const apiUrl = getApiBaseUrl();

    socket = io(apiUrl, {
      // Send authentication cookies with the Socket.IO connection.
      withCredentials: true,

      // Try WebSocket first and fall back to HTTP long-polling.
      transports: ["websocket", "polling"],

      // We explicitly connect after authentication.
      autoConnect: false,

      // Reconnect automatically if the connection drops.
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on("connect", () => {
      console.log("[socket] Connected:", socket?.id);
    });

    socket.on("connect_error", (error) => {
      console.error("[socket] Connection error:", error.message);
    });

    socket.on("disconnect", (reason) => {
      console.log("[socket] Disconnected:", reason);
    });
  }

  return socket;
}

/**
 * Connect the shared socket.
 * The browser's authentication cookie is sent automatically
 * because withCredentials is enabled.
 */
export function connectSocket(): void {
  const currentSocket = getSocket();

  if (!currentSocket.connected) {
    currentSocket.connect();
  }
}

/**
 * Disconnect and destroy the shared socket.
 * Call this when the user logs out.
 */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
