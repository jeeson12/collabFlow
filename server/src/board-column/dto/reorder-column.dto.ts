import { IsArray, ValidateNested, IsInt, IsString } from 'class-validator';
import { Type } from 'class-transformer';

class ReorderColumnItemDto {
  @IsString()
  id: string;

  @IsInt()
  order: number;
}

export class ReorderColumnsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReorderColumnItemDto)
  columns: ReorderColumnItemDto[];
}
