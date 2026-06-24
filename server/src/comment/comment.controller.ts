import {
  Controller,
  Post,
  UseGuards,
  Req,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createCommentDto } from './dto/create-comment.dto';
import { updateCommentDto } from './dto/update-comment.dto';

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

  @Patch(':commentId')
  updateComment(
    @Body() body: updateCommentDto,
    @Req() req,
    @Param('commentId') commentId: string,
  ) {
    return this.commentService.updateComment(body, req.user.userId, commentId);
  }

  @Delete(':commentId')
  deleteComment(@Param('commentId') commentId: string, @Req() req) {
    return this.commentService.deleteComment(commentId, req.user.userId);
  }
}
