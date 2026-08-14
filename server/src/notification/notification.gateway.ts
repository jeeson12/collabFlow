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
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'https://projectloom-web.vercel.app',
      process.env.FRONTEND_URL,
    ].filter(Boolean) as string[],

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

      // ============================================
      // GET COOKIE
      // ============================================

      const cookie = client.handshake.headers.cookie;

      if (!cookie) {
        console.error('❌ No authentication cookie received');
        client.disconnect();
        return;
      }

      // ============================================
      // EXTRACT JWT
      // ============================================

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

      // ============================================
      // GET JWT SECRET
      // ============================================

      const secret = this.configService.get<string>('JWT_SECRET');

      if (!secret) {
        console.error('❌ JWT_SECRET is not configured');
        client.disconnect();
        return;
      }

      // ============================================
      // VERIFY JWT
      // ============================================

      const payload = jwt.verify(token, secret) as {
        userId: string;
        userEmail: string;
      };

      // ============================================
      // GET USER ID
      // ============================================

      const userId = payload.userId;

      if (!userId) {
        console.error('❌ JWT does not contain userId');
        client.disconnect();
        return;
      }

      // ============================================
      // JOIN USER ROOM
      // ============================================

      client.join(`user:${userId}`);

      console.log(`🟢 Socket connected: ${client.id} → user:${userId}`);
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        console.error('❌ Socket JWT expired');
      } else if (error instanceof jwt.JsonWebTokenError) {
        console.error('❌ Socket JWT verification failed:', error.message);
      } else {
        console.error('❌ Socket authentication failed:', error);
      }

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
