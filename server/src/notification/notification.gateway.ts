import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  },
})
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private configService: ConfigService) {}

  handleConnection(client: Socket) {
    try {
      console.log('🔌 Socket connection:', client.id);

      const cookie = client.handshake.headers.cookie;

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

      const secret = this.configService.get<string>('JWT_SECRET');

      if (!secret) {
        console.error('❌ JWT_SECRET is not configured');
        client.disconnect();
        return;
      }

      const payload = jwt.verify(token, secret) as {
        userId: string;
        userEmail: string;
      };

      const userId = payload.userId;

      if (!userId) {
        console.error('❌ JWT does not contain userId');
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
    console.log('🔴 Socket disconnected:', client.id);
  }

  sendNotification(
    userId: string,
    notification: import('@prisma/client').Notification,
  ) {
    this.server.to(`user:${userId}`).emit('notification:new', notification);
  }
}
