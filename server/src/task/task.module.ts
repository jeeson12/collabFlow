import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ActivityModule } from 'src/activity/activity.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AttachmentService } from 'src/attachment/attachment.service';

@Module({
  providers: [TaskService, AttachmentService],
  controllers: [TaskController],
  imports: [ActivityModule, PrismaModule],
})
export class TaskModule {}
