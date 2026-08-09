import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { EmailService } from 'src/email/email.service';
import { createHash, randomBytes } from 'crypto';
import { forgotPasswordTemplate } from 'src/email/templates/forgot-password-template';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private emailServicce: EmailService,
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
      throw new NotFoundException('no user found');
    }
    const passwordMatch = await bcrypt.compare(data.password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('invalid credentials');
    }

    const token = this.jwt.sign({ userId: user.id, userEmail: user.email });

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  async googleLogin(profile: any) {
    const email = profile?.emails[0]?.value;
    const name = profile.displayName;

    if (!email) {
      throw new UnauthorizedException('Incomplete email profile from google');
    }

    let user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          name,
          email,
          password: '',
        },
      });
    }
    return this.generateToken(user.id, user.email);
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return {
        message:
          'If an account exists with this email, a reset link has been sent.',
      };
    }

    await this.prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
    });

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 30 * 60 * 1000);

    await this.prisma.passwordResetToken.create({
      data: { tokenHash, userId: user.id, expiresAt },
    });

    const resetUrl =
      `${process.env.FRONTEND_URL}` + `/reset-password?token=${rawToken}`;

    const html = forgotPasswordTemplate(resetUrl, user.name ?? undefined);
    await this.emailServicce.sendEmail(user.email, 'Reset your password', html);
    return {
      message:
        'If an account exists with this email, a reset link has been sent.',
    };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');

    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: { tokenHash },
    });

    if (!resetToken) {
      throw new BadRequestException('Invalid or expired reset token');
    }

    if (resetToken.usedAt) {
      throw new BadRequestException('This reset link has already been used');
    }

    if (resetToken.expiresAt < new Date()) {
      throw new BadRequestException('This reset link has expired');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: {
          id: resetToken.userId,
        },
        data: {
          password: hashedPassword,
        },
      }),

      this.prisma.passwordResetToken.update({
        where: {
          id: resetToken.id,
        },
        data: {
          usedAt: new Date(),
        },
      }),

      this.prisma.passwordResetToken.deleteMany({
        where: {
          userId: resetToken.userId,
          id: {
            not: resetToken.id,
          },
          usedAt: null,
        },
      }),
    ]);

    return {
      message: 'Password reset successfully',
    };
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    /*
     * Google-only accounts currently have password = ''.
     */
    if (!user.password) {
      throw new BadRequestException(
        'This account does not have a password. Use Google authentication.',
      );
    }
    const passwordMatch = bcrypt.compare(currentPassword, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Incorrect current password');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    return {
      message: 'Password changed successfully',
    };
  }

  generateToken(userId: string, email: string) {
    return this.jwt.sign({
      userId,
      userEmail: email,
    });
  }
}
