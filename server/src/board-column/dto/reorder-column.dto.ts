import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ReorderColumnItemDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsInt()
  @Min(0)
  order: number;
}

export class ReorderColumnsDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ReorderColumnItemDto)
  columns: ReorderColumnItemDto[];
}
