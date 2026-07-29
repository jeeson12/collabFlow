import { PartialType } from '@nestjs/mapped-types';
import { AddProjectMemberDto } from './add-project-member.dto';

export class UpdateProjectMemberDto extends PartialType(AddProjectMemberDto) {}
