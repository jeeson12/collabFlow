import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { ActivityModule } from 'src/activity/activity.module';
import { PrismaModule } from 'src/prisma/prisma.module';
import { NotificationModule } from 'src/notification/notification.module';

@Module({
  providers: [ProjectService],
  controllers: [ProjectController],
  imports: [ActivityModule, PrismaModule, NotificationModule],
})
export class ProjectModule {}
