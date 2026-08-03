import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

import { AttachmentService } from './attachment.service';
import { UploadAttachmentDto } from './dto/upload-attachment.dto';

@Controller('attachment')
@UseGuards(AuthGuard('jwt'))
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadAttachment(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadAttachmentDto,
    @Req() req,
  ) {
    return this.attachmentService.upload(file, body, req.user.id);
  }

  @Get('project/:projectId/recent')
  getRecentFiles(@Param('projectId') projectId: string, @Req() req) {
    return this.attachmentService.getReccentFiles(projectId, req.user.id);
  }

  @Get(':attachmentId/download')
  downloadAttachment(@Param('attachmentId') attachmentId: string, @Req() req) {
    return this.attachmentService.downloadAttachent(attachmentId, req.user.id);
  }
}
