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

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}
  async createWorkspace(body: CreateWorkspaceDto, userId: string) {
    const workspace = await this.prisma.workspace.create({
      data: { name: body.name },
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

    return this.prisma.workspace.update({
      where: { id: workspaceId },
      data: { name: body.name },
    });
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
}
