import { IsInt, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class UpdateColumnDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  order?: number;
}
