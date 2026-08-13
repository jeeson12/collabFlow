import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, { message: 'Workspace name must be at least 3 characters' })
  name: string;
}
