import { PartialType } from '@nestjs/mapped-types';
import { createTaskDto } from './create-task.dto';

export class updateTaskDto extends PartialType(createTaskDto) {}
