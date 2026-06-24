import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProjectDto } from './dto/create-project.dto';
import { error, time } from 'console';
import { updateProjectDto } from './dto/update-project.dto';
import { MembershipRole } from '@prisma/client';
import { AddProjectMemberDto } from './add-project-member.dto';

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
        role: MembershipRole.ADMIN,
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

  async updateProject(
    projectId: string,
    body: updateProjectDto,
    userId: string,
  ) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const permission =
      (await this.prisma.projectMembership.findFirst({
        where: {
          projectId,
          userId,
          role: MembershipRole.ADMIN,
        },
      })) ||
      (await this.prisma.workspaceMembership.findFirst({
        where: {
          workspaceId: project.workspaceId,
          userId,
          role: MembershipRole.ADMIN,
        },
      }));

    if (!permission) {
      throw new ForbiddenException(
        'You are not authorized to update this project',
      );
    }

    return this.prisma.project.update({
      where: { id: projectId },
      data: {
        name: body.name,
        description: body.description,
      },
    });
  }

  async deleteProject(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const permission =
      (await this.prisma.projectMembership.findFirst({
        where: {
          projectId,
          userId,
          role: MembershipRole.ADMIN,
        },
      })) ||
      (await this.prisma.workspaceMembership.findFirst({
        where: {
          workspaceId: project.workspaceId,
          userId,
          role: MembershipRole.ADMIN,
        },
      }));

    if (!permission) {
      throw new ForbiddenException(
        'You are not authorized to delete this project',
      );
    }

    await this.prisma.project.delete({
      where: { id: projectId },
    });
    return {
      message: 'Project deleted successfully',
    };
  }

  async addMember(
    projectId: string,
    requesterId: string,
    body: AddProjectMemberDto,
  ) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const permission =
      (await this.prisma.projectMembership.findFirst({
        where: {
          userId: requesterId,
          projectId: projectId,
          role: MembershipRole.ADMIN,
        },
      })) ||
      (await this.prisma.workspaceMembership.findFirst({
        where: {
          userId: requesterId,
          workspaceId: project.workspaceId,
          role: MembershipRole.ADMIN,
        },
      }));

    if (!permission) {
      throw new ForbiddenException('You are not authorized to add members');
    }

    const workspaceMembership =
      await this.prisma.workspaceMembership.findUnique({
        where: {
          userId_workspaceId: {
            userId: body.userId,
            workspaceId: project.workspaceId,
          },
        },
      });

    if (!workspaceMembership) {
      throw new ForbiddenException('User is not a member of this workspace');
    }

    const existingMembership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: { userId: body.userId, projectId: projectId },
      },
    });
    if (existingMembership) {
      throw new ConflictException('User is already a member of this project');
    }
    const newMember = await this.prisma.projectMembership.create({
      data: {
        userId: body.userId,
        role: body.role,
        projectId,
      },
    });
    return {
      message: 'Member added successfully',
      member: newMember,
    };
  }

  async getMember(projectId: string, userId: string) {
    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });
    if (!membership) {
      throw new NotFoundException('Member not found');
    }
    const members = await this.prisma.projectMembership.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            id: true,
          },
        },
      },
    });
    return {
      members,
      count: members.length,
    };
  }

  async deleteMember(projectId: string, requesterId: string, targetId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    const permission =
      (await this.prisma.projectMembership.findFirst({
        where: {
          userId: requesterId,
          projectId,
          role: MembershipRole.ADMIN,
        },
      })) ||
      (await this.prisma.workspaceMembership.findFirst({
        where: {
          userId: requesterId,
          workspaceId: project.workspaceId,
          role: MembershipRole.ADMIN,
        },
      }));
    if (!permission) {
      throw new ForbiddenException('You are not authorized to delete members');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId: targetId,
          projectId,
        },
      },
    });
    if (!membership) {
      throw new NotFoundException('Member not found');
    }
    await this.prisma.projectMembership.delete({
      where: {
        userId_projectId: {
          userId: targetId,
          projectId: projectId,
        },
      },
    });
    return {
      message: 'Member deleted successfully',
    };
  }
}
