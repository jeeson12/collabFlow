import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  Param,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createCommentDto } from './dto/create-comment.dto';

@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  createComment(@Req() req, @Body() body: createCommentDto) {
    return this.commentService.createComment(body, req.user.userId);
  }

  @Get('task/:taskId')
  getComment(@Param('taskId') taskId: string, @Req() req) {
    return this.commentService.getComment(taskId, req.user.userId);
  }
}
