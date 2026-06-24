import { MembershipRole } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export class AddProjectMemberDto {
  @IsString()
  userId: string;
  @IsEnum(MembershipRole)
  role: MembershipRole;
}
