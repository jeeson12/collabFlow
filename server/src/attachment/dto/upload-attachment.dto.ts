import { IsNotEmpty, IsString } from 'class-validator';

export class UploadAttachmentDto {
  @IsString()
  @IsNotEmpty()
  taskId: string;
}
