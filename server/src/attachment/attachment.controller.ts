import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadAttachmentDto } from './dto/upload-attachment.dto';

@Controller('attachment')
export class AttachmentController {
  constructor(private readonly attachmentService: AttachmentService) {}
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadAttachment(
    @UploadedFiles() file: Express.Multer.File,
    @Body() body: UploadAttachmentDto,
    @Req() req,
  ) {
    return this.attachmentService.upload(file, body, req.user.userId);
  }
}
