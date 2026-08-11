import { Module } from '@nestjs/common';
import { WorkspaceController } from './workspace.controller';
import { WorkspaceService } from './workspace.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityModule } from 'src/activity/activity.module';
import { EmailModule } from 'src/email/email.module';
import { InvitationController } from './invitation.controller';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  imports: [ActivityModule, EmailModule, NotificationModule],
  controllers: [WorkspaceController, InvitationController],
  providers: [WorkspaceService, PrismaService],
})
export class WorkspaceModule {}
