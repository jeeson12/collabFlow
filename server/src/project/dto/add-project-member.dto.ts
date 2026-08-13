import { MembershipRole } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class AddProjectMemberDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsEnum(MembershipRole)
  @IsNotEmpty()
  role: MembershipRole;
}
