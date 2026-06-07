import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { prismaModule } from './prisma/prisma.module';

@Module({
  imports: [prismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
