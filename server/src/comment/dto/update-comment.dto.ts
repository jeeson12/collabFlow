import { PartialType } from '@nestjs/mapped-types';
import { createCommentDto } from './create-comment.dto';

export class updateCommentDto extends PartialType(createCommentDto) {}
