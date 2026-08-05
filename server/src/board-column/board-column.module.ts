import { Module } from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { BoardColumnController } from './board-column.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  providers: [BoardColumnService],
  imports: [PrismaModule, ActivityModule],
  controllers: [BoardColumnController],
})
export class BoardColumnModule {}
