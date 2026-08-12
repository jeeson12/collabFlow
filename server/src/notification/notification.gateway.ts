import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    try {
      const cookie = client.handshake.headers.cookie;

      console.log('🔌 Socket connection:', client.id);
      console.log('🍪 Cookie:', cookie);

      if (!cookie) {
        console.error('❌ No cookie received');
        client.disconnect();
        return;
      }

      const PREFIX = 'access_token=';
      const token = cookie
        .split(';')
        .map((c) => c.trim())
        .find((c) => c.startsWith(PREFIX))
        ?.slice(PREFIX.length);

      if (!token) {
        console.error('❌ access_token not found in cookie');
        client.disconnect();
        return;
      }

      console.log('🔑 JWT received');

      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET || 'secretKey',
      ) as {
        userId: string;
        userEmail: string;
      };

      console.log('✅ JWT verified:', payload);

      const userId = payload.userId;

      if (!userId) {
        console.error('❌ JWT does not contain sub');
        client.disconnect();
        return;
      }

      client.join(`user:${userId}`);

      console.log(`🟢 Socket connected: ${client.id} → user:${userId}`);
    } catch (error) {
      console.error('❌ Socket authentication failed:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    console.log('Socket disconnected:', client.id);
  }
  sendNotification(userId: string, notification: import('@prisma/client').Notification) {
    this.server.to(`user:${userId}`).emit('notification:new', notification);
  }
}
