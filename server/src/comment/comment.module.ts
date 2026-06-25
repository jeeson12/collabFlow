import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ActivityModule } from 'src/activity/activity.module';

@Module({
  providers: [CommentService, PrismaService],
  controllers: [CommentController],
  imports: [ActivityModule],
})
export class CommentModule {}
