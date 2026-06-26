import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ProjectModule } from './project/project.module';
import { TaskModule } from './task/task.module';
import { CommentModule } from './comment/comment.module';
import { ActivityService } from './activity/activity.service';
import { ActivityModule } from './activity/activity.module';
import { AttachmentModule } from './attachment/attachment.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    WorkspaceModule,
    ProjectModule,
    TaskModule,
    CommentModule,
    ActivityModule,
    AttachmentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
