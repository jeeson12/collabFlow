import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class createProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  workspaceId: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 6)
  @Matches(/^[A-Z0-9]+$/, {
    message: 'Project key must contain only uppercase letters and numbers.',
  })
  projectKey: string;
}
