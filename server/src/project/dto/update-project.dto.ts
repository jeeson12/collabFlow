import { PartialType } from '@nestjs/mapped-types';
import { createProjectDto } from './create-project.dto';

export class updateProjectDto extends PartialType(createProjectDto) {}
