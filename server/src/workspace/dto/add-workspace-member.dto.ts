import { MembershipRole } from '@prisma/client';
import { IsEmail, IsEnum } from 'class-validator';

export class AddWorkspaceMemberDto {
  @IsEmail()
  email: string;
  @IsEnum(MembershipRole)
  role: MembershipRole;
}
