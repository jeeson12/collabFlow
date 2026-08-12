import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { createProjectDto } from './dto/create-project.dto';
import { updateProjectDto } from './dto/update-project.dto';
import { MembershipRole } from '@prisma/client';
import { AddProjectMemberDto } from './dto/add-project-member.dto';
import { ActivityService } from 'src/activity/activity.service';
import { UpdateProjectMemberDto } from './dto/update-project-member.dto';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class ProjectService {
  constructor(
    private prisma: PrismaService,
    private activity: ActivityService,
    private notification: NotificationService,
  ) {}
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

    const existingProject = await this.prisma.project.findFirst({
      where: {
        workspaceId: body.workspaceId,
        projectKey: body.projectKey,
      },
    });

    if (existingProject) {
      throw new ConflictException(
        'Project key already exists in this workspace',
      );
    }

    const project = await this.prisma.$transaction(async (tx) => {
      const project = await tx.project.create({
        data: {
          name: body.name,
          description: body.description,
          workspaceId: body.workspaceId,
          projectKey: body.projectKey,
        },
      });

      await tx.boardColumn.createMany({
        data: [
          {
            name: 'TODO',
            order: 1,
            projectId: project.id,
            isCompletionColumn: false,
          },
          {
            name: 'IN_PROGRESS',
            order: 2,
            projectId: project.id,
            isCompletionColumn: false,
          },
          {
            name: 'DONE',
            order: 3,
            projectId: project.id,
            isCompletionColumn: true,
          },
        ],
      });
      await tx.projectMembership.create({
        data: {
          userId,
          projectId: project.id,
          role: MembershipRole.ADMIN,
        },
      });
      return project;
    });
    await this.activity.createActivity({
      userId,
      projectId: project.id,
      workspaceId: body.workspaceId,
      message: `created project "${project.name}"`,
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

  async getWorkspaceProjects(workspaceId: string, userId: string) {
    const membership = await this.prisma.workspaceMembership.findUnique({
      where: {
        userId_workspaceId: {
          userId,
          workspaceId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    return this.prisma.project.findMany({
      where: {
        workspaceId,
      },
      include: {
        _count: {
          select: {
            memberships: true,
            tasks: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
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
      include: {
        _count: {
          select: {
            memberships: true,
            tasks: true,
          },
        },
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
    if (body.projectKey) {
      const existing = await this.prisma.project.findFirst({
        where: {
          workspaceId: project.workspaceId,
          projectKey: body.projectKey,
          NOT: {
            id: projectId,
          },
        },
      });

      if (existing) {
        throw new ConflictException(
          'Project key already exists in this workspace',
        );
      }
    }

    const updatedProject = await this.prisma.project.update({
      where: { id: projectId },
      data: {
        name: body.name,
        description: body.description,
        projectKey: body.projectKey,
      },
    });
    await this.activity.createActivity({
      userId,
      projectId: project.id,
      workspaceId: project.workspaceId,
      message: `updated project "${updatedProject.name}"`,
    });
    return updatedProject;
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
    const projectName = project.name;
    await this.activity.createActivity({
      userId,
      projectId,
      workspaceId: project.workspaceId,
      message: `deleted project "${projectName}"`,
    });

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
    const user = await this.prisma.user.findUnique({
      where: {
        id: body.userId,
      },
      select: {
        name: true,
        email: true,
        id: true,
      },
    });

    await this.notification.createNotification({
      userId: body.userId,
      title: 'Added to project',
      message: `You were added to project "${project.name}"`,
      entityId: project.id,
      entityType: 'PROJECT',
      projectId: project.id,
      workspaceId: project.workspaceId,
    });
    await this.activity.createActivity({
      userId: requesterId,
      workspaceId: project.workspaceId,
      projectId,
      message: `added ${user?.name} to the project`,
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

    const user = await this.prisma.user.findUnique({
      where: {
        id: targetId,
      },
      select: {
        name: true,
      },
    });

    await this.activity.createActivity({
      userId: requesterId,
      workspaceId: project.workspaceId,
      projectId,
      message: `removed ${user?.name} from the project`,
    });
    await this.prisma.projectMembership.delete({
      where: {
        userId_projectId: {
          userId: targetId,
          projectId: projectId,
        },
      },
    });
    await this.notification.createNotification({
      userId: targetId,
      title: 'Removed from project',
      message: `You were removed from project "${project.name}"`,
      entityId: project.id,
      entityType: 'PROJECT',
      projectId: project.id,
      workspaceId: project.workspaceId,
    });
    return {
      message: 'Member deleted successfully',
    };
  }

  async updateMember(
    projectId: string,
    targetId: string,
    requesterId: string,
    body: UpdateProjectMemberDto,
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
      throw new ForbiddenException('Only admins can change member roles');
    }
    if (requesterId === targetId) {
      throw new ForbiddenException(
        'You cannot change your own role or remove yourself from the project',
      );
    }

    // Check target member
    const targetMember = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId: targetId,
          projectId,
        },
      },
    });

    if (!targetMember) {
      throw new NotFoundException('Member not found');
    }

    if (targetMember.role === body.role) {
      throw new ConflictException('User already has this role');
    }

    if (
      targetMember.role === MembershipRole.ADMIN &&
      body.role === MembershipRole.MEMBER
    ) {
      const adminCount = await this.prisma.projectMembership.count({
        where: {
          projectId,
          role: MembershipRole.ADMIN,
        },
      });

      if (adminCount === 1) {
        throw new ForbiddenException('Cannot demote the last admin');
      }
    }

    // Update role
    const updatedMember = await this.prisma.projectMembership.update({
      where: {
        userId_projectId: {
          userId: targetId,
          projectId,
        },
      },
      data: {
        role: body.role,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    await this.notification.createNotification({
      userId: targetId,
      title: 'Project role updated',
      message: `Your role in "${project.name}" was changed to ${body.role}`,
      entityId: project.id,
      entityType: 'PROJECT',
      projectId: project.id,
      workspaceId: project.workspaceId,
    });
    await this.activity.createActivity({
      userId: requesterId,
      workspaceId: project.workspaceId,

      projectId,
      message: `changed ${updatedMember.user.name}'s role from ${targetMember.role} to ${body.role}`,
    });

    return updatedMember;
  }

  async availableMembers(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('project not found');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException(
        'You are not authorized to perform this action',
      );
    }
    const workspaceMembers = await this.prisma.workspaceMembership.findMany({
      where: {
        workspaceId: project.workspaceId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const projectMembers = await this.prisma.projectMembership.findMany({
      where: {
        projectId: projectId,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });
    const projectmembersIds = new Set(
      projectMembers.map((member) => member.user.id),
    );

    const availableMembers = workspaceMembers
      .filter((member) => !projectmembersIds.has(member.user.id))
      .map((member) => member.user);
    return availableMembers;
  }
}
