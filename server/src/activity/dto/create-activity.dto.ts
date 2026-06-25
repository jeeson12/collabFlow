import { IsOptional, isString, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  userId: string;
  @IsString()
  message: string;
  @IsString()
  @IsOptional()
  workspaceId?: string;
  @IsString()
  @IsOptional()
  projectId?: string;
}
