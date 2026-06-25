import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  providers: [TaskService, PrismaService],
  controllers: [TaskController],
  imports: [ActivityModule],
})
export class TaskModule {}
