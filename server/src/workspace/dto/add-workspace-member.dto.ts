import { MembershipRole } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class AddWorkspaceMemberDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(MembershipRole)
  @IsNotEmpty()
  role: MembershipRole;
}
