import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { use } from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';


interface jwtPayload {
  userId: string;
  userEmail: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies?.access_token,
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey',
    });
  }
  async validate(payload: jwtPayload) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.userEmail,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
        avatarPath: true,
      },
    });

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      hasPassword: Boolean(user.password),
      avatarPath: user.avatarPath,
    };
  }
}
