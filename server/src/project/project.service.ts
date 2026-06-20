import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProjectDto } from './dto/create-project.dto';
import { error } from 'console';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async createProject(body: createProjectDto, userId: string) {
    const membership = await this.prisma.workspaceMembership.findFirst({
      where: {
        userId: userId,
        workspaceId: body.workspaceId,
      },
    });
    if (!membership) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    const project = await this.prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
        workspaceId: body.workspaceId,
      },
    });

    await this.prisma.projectMembership.create({
      data: {
        userId,
        projectId: project.id,
        role: 'admin',
      },
    });

    return project;
  }

  async getProject(userId: string) {
    const membership = await this.prisma.projectMembership.findMany({
      where: {
        userId: userId,
      },
      include: {
        project: true,
      },
    });

    return membership;
  }

  async getProjectbyId(projectId: string, userId: string) {
    const membership = await this.prisma.projectMembership.findFirst({
      where: {
        projectId,
        userId,
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return project;
  }
}
