import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { AttachmentService } from './attachment.service';
import { UploadAttachmentDto } from './dto/upload-attachment.dto';

@Controller('attachment')
@UseGuards(AuthGuard('jwt'))
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    }),
  )
  uploadAttachment(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: UploadAttachmentDto,
    @Req() req,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('At least one file is required');
    }

    return this.attachmentService.upload(body.taskId, files, req.user.id);
  }

  @Get('task/:taskId')
  getAttachments(@Param('taskId') taskId: string, @Req() req) {
    return this.attachmentService.getAttachment(taskId, req.user.id);
  }

  @Get('project/:projectId/recent')
  getRecentFiles(@Param('projectId') projectId: string, @Req() req) {
    return this.attachmentService.getRecentFiles(projectId, req.user.id);
  }

  @Get(':attachmentId/download')
  downloadAttachment(@Param('attachmentId') attachmentId: string, @Req() req) {
    return this.attachmentService.downloadAttachment(attachmentId, req.user.id);
  }

  @Delete(':attachmentId')
  deleteAttachment(@Param('attachmentId') attachmentId: string, @Req() req) {
    return this.attachmentService.deleteAttachment(attachmentId, req.user.id);
  }
}
