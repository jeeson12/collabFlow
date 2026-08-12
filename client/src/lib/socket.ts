import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io("http://localhost:3001", {
      withCredentials: true,
      transports: ["websocket"],
      // Reconnect automatically but stop after auth failures
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
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

/** Tear down the shared socket (call on logout). */
export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}
