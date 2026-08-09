import { IsEmail, IsEnum } from 'class-validator';
import { MembershipRole } from '@prisma/client';

export class InviteWorkspaceMemberDto {
  @IsEmail()
  email: string;

  @IsEnum(MembershipRole)
  role: MembershipRole;
}
