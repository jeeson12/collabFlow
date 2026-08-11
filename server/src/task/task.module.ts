import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ActivityModule } from 'src/activity/activity.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AttachmentModule } from 'src/attachment/attachment.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [ActivityModule, PrismaModule, AttachmentModule, NotificationModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
