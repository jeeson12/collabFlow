import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class createProjectDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  workspaceId: string;

  @IsString()
  @Length(2, 6)
  @Matches(/^[A-Z0-9]+$/, {
    message: 'Project key must contain only uppercase letters and numbers.',
  })
  projectKey: string;
}
