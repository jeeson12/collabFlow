import { IsString } from 'class-validator';

export class UploadAttachmentDto {
  @IsString()
  taskId: string;
}
