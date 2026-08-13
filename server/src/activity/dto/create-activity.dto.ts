import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  workspaceId?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  projectId?: string;
}
