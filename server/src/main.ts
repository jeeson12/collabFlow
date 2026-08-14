import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser
  app.use(cookieParser());

  // Security headers
  app.use(
    helmet({
      crossOriginResourcePolicy: {
        policy: 'cross-origin',
      },
    }),
  );

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS
  const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'https://projectloom-web.vercel.app',
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header.
      // Common for curl, Postman, server-to-server requests, etc.
      if (!origin) {
        return callback(null, true);
      }

      // Explicitly allowed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow local-network development only outside production.
      const isLocalNetwork =
        process.env.NODE_ENV !== 'production' &&
        /^http:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(
          origin,
        );

      if (isLocalNetwork) {
        return callback(null, true);
      }

      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },

    // Required for cookie-based authentication
    credentials: true,
  });

  const port = process.env.PORT || 3001;

  await app.listen(port, '0.0.0.0');

  console.log(`🚀 Server running on port ${port}`);
}

bootstrap();
