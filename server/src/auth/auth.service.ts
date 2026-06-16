import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { stringify } from 'querystring';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name,
      },
    });

    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }
  async login(data: { email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (!user) {
      return 'no user found';
    }
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      return 'invalid credentials';
    }

    const token = this.jwt.sign({ userId: user.id, userEmail: user.email });

    return token;
  }
}
