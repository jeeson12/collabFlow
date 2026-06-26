import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { updateWorkspaceDto } from './dto/update-workspace.dto';
import { MembershipRole } from '@prisma/client';
import { AddWorkspaceMemberDto } from './dto/add-workspace-member.dto';
import { ActivityService } from 'src/activity/activity.service';

@Injectable()
export class WorkspaceService {
  constructor(
    private prisma: PrismaService,
    private activity: ActivityService,
  ) {}
  async createWorkspace(body: CreateWorkspaceDto, userId: string) {
    const workspace = await this.prisma.workspace.create({
      data: { name: body.name },
    });
    await this.activity.createActivity({
      userId,
      workspaceId: workspace.id,
      message: `created workspace "${workspace.name}"`,
    });

    await this.prisma.workspaceMembership.create({
      data: { workspaceId: workspace.id, userId, role: MembershipRole.ADMIN },
    });

    return workspace;
  }

  async getWorkspace(workspaceId: string, userId: string) {
    const membership = await this.prisma.workspaceMembership.findFirst({
      where: { workspaceId, userId },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this workspace');
    }

    return this.prisma.workspace.findUnique({ where: { id: workspaceId } });
  }

  async updateWorkspace(
    workspaceId: string,
    userId: string,
    body: updateWorkspaceDto,
  ) {
    const workspace = await this.prisma.workspace.findUnique({
      where: { id: workspaceId },
    });
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }
    const membership = await this.prisma.workspaceMembership.findFirst({
      where: { workspaceId, userId, role: MembershipRole.ADMIN },
    });
    if (!membership) {
      throw new ForbiddenException(
        'You are not authorized to update this workspace',
      );
    }

    const updateWorkspace = await this.prisma.workspace.update({
      where: { id: workspaceId },
      data: { name: body.name },
    });
    await this.activity.createActivity({
      userId,
      workspaceId,
      message: `updated workspace "${updateWorkspace.name}"`,
    });

    return updateWorkspace;
  }

  async deleteWorkspace(workspaceId: string, userId: string) {
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });
    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    const membership = await this.prisma.workspaceMembership.findFirst({
      where: { workspaceId, userId, role: MembershipRole.ADMIN },
    });

    if (!membership) {
      throw new ForbiddenException(
        'You are not authorized to delete this workspace',
      );
    }

    await this.activity.createActivity({
      userId,
      workspaceId,
      message: `deleted workspace "${workspace.name}"`,
    });

    await this.prisma.workspace.delete({
      where: { id: workspaceId },
    });
    return { message: 'Workspace deleted successfully' };
  }

  async addMember(
    workspaceId: string,
    requesterId: string,
    body: AddWorkspaceMemberDto,
  ) {
    const requesterMembership =
      await this.prisma.workspaceMembership.findUnique({
        where: {
          userId_workspaceId: {
            userId: requesterId,
            workspaceId,
          },
        },
      });

    if (!requesterMembership) {
      throw new NotFoundException('you are not a part of this workspace');
    }
    if (requesterMembership.role !== MembershipRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to add members');
    }
    const userExists = await this.prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!userExists) {
      throw new NotFoundException('User not found');
    }

    const existingMembership = await this.prisma.workspaceMembership.findUnique(
      {
        where: {
          userId_workspaceId: {
            userId: userExists.id,
            workspaceId,
          },
        },
      },
    );

    if (existingMembership) {
      throw new ConflictException('user is already a member of this workspace');
    }
    await this.prisma.workspaceMembership.create({
      data: {
        userId: userExists.id,
        workspaceId: workspaceId,
        role: body.role,
      },
    });
    await this.activity.createActivity({
      userId: requesterId,
      workspaceId,
      message: `added ${userExists.name} to the workspace`,
    });
    return { message: 'member added' };
  }

  async getMember(workspaceId: string, requesterId: string) {
    const requesterMembership =
      await this.prisma.workspaceMembership.findUnique({
        where: {
          userId_workspaceId: { userId: requesterId, workspaceId },
        },
      });
    if (!requesterMembership) {
      throw new ForbiddenException('access denied');
    }

    return this.prisma.workspaceMembership.findMany({
      where: {
        workspaceId,
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
  }

  async deleteMember(
    workspaceId: string,
    requesterId: string,
    targetUserId: string,
  ) {
    const requesterMembership =
      await this.prisma.workspaceMembership.findUnique({
        where: {
          userId_workspaceId: { workspaceId, userId: requesterId },
        },
      });
    if (!requesterMembership) {
      throw new ForbiddenException('access denied');
    }
    if (requesterMembership.role !== MembershipRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to remove members');
    }

    const targetMembership = await this.prisma.workspaceMembership.findUnique({
      where: {
        userId_workspaceId: { workspaceId, userId: targetUserId },
      },
    });

    if (!targetMembership) {
      throw new NotFoundException('user is not a member');
    }

    if (targetMembership.role == MembershipRole.ADMIN) {
      const adminCount = await this.prisma.workspaceMembership.count({
        where: { workspaceId, role: MembershipRole.ADMIN },
      });
      if (adminCount === 1) {
        throw new ForbiddenException('cannot delete last admin');
      }
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
      select: {
        name: true,
      },
    });
    await this.activity.createActivity({
      userId: requesterId,
      workspaceId,
      message: `removed ${user?.name} from the workspace`,
    });

    await this.prisma.workspaceMembership.delete({
      where: {
        userId_workspaceId: { workspaceId, userId: targetUserId },
      },
    });

    return { message: 'user removed' };
  }
}
