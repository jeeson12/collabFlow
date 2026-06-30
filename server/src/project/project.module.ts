import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  providers: [ProjectService, PrismaService],
  controllers: [ProjectController],
  imports: [ActivityModule],
})
export class ProjectModule {}
