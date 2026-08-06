import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ActivityModule } from 'src/activity/activity.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AttachmentModule } from 'src/attachment/attachment.module';

@Module({
  imports: [ActivityModule, PrismaModule, AttachmentModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
