import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateActivityDto } from './dto/create-activity.dto';

@Injectable()
export class ActivityService {
  constructor(private prisma: PrismaService) {}

  async createActivity(data: CreateActivityDto) {
    return this.prisma.activity.create({
      data,
    });
  }

  async getRecentActivities(projectId: string) {
    return this.prisma.activity.findMany({
      where: {
        projectId,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },

      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
