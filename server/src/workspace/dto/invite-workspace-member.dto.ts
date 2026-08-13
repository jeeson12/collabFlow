import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { MembershipRole } from '@prisma/client';

export class InviteWorkspaceMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(MembershipRole)
  @IsNotEmpty()
  role: MembershipRole;
}
