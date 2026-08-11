import {
  BadRequestException,
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
import { updateWorkspaceMemberDto } from './dto/update-workspace-member.dto';
import { EmailService } from 'src/email/email.service';
import { InviteWorkspaceMemberDto } from './dto/invite-workspace-member.dto';
import { createHash, hash, randomBytes } from 'crypto';
import { workspaceInvitationTemplate } from 'src/email/templates/invite-member-template';
import { NotificationService } from 'src/notification/notification.service';

@Injectable()
export class WorkspaceService {
  constructor(
    private prisma: PrismaService,
    private activity: ActivityService,
    private emailService: EmailService,
    private readonly notification: NotificationService,
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

  async getUserWorkspaces(userId: string) {
    return this.prisma.workspace.findMany({
      where: {
        memberships: {
          some: {
            userId,
          },
        },
      },
      include: {
        _count: {
          select: {
            projects: true,
          },
        },
      },
    });
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

    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

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
    await this.notification.createNotification({
      userId: userExists.id,
      title: 'Added to workspace',
      message: `You were added to workspace "${workspace.name}"`,
      entityId: workspace.id,
      entityType: 'WORKSPACE',
      workspaceId: workspace.id,
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

    const members = await this.prisma.workspaceMembership.findMany({
      where: {
        workspaceId,
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

    return {
      members,
      count: members.length,
    };
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
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
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

    await this.prisma.projectMembership.deleteMany({
      where: {
        userId: targetUserId,
        project: {
          workspaceId,
        },
      },
    });

    await this.prisma.workspaceMembership.delete({
      where: {
        userId_workspaceId: {
          userId: targetUserId,
          workspaceId,
        },
      },
    });
    await this.notification.createNotification({
      userId: targetUserId,
      title: 'Removed from workspace',
      message: `You were removed from workspace "${workspace.name}"`,
      entityId: workspace.id,
      entityType: 'WORKSPACE',
      workspaceId: workspace.id,
    });
    await this.activity.createActivity({
      userId: requesterId,
      workspaceId,
      message: `removed ${user?.name} from the workspace`,
    });

    return { message: 'user removed' };
  }

  async updateMember(
    workspaceId: string,
    requesterId: string,
    targetId: string,
    body: updateWorkspaceMemberDto,
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

    if (requesterMembership.role != MembershipRole.ADMIN) {
      throw new ForbiddenException('you are not authorized to update members');
    }

    if (requesterId === targetId) {
      throw new ForbiddenException('you cannot update your own role');
    }

    const targetMembership = await this.prisma.workspaceMembership.findUnique({
      where: {
        userId_workspaceId: { workspaceId, userId: targetId },
      },
    });

    if (!targetMembership) {
      throw new NotFoundException('user is not a member');
    }

    if (targetMembership.role === body.role) {
      throw new ConflictException('User already has this role');
    }

    if (
      targetMembership.role === MembershipRole.ADMIN &&
      body.role === MembershipRole.MEMBER
    ) {
      const adminCount = await this.prisma.workspaceMembership.count({
        where: {
          workspaceId,
          role: MembershipRole.ADMIN,
        },
      });

      if (adminCount === 1) {
        throw new ForbiddenException('Cannot demote the last workspace admin');
      }
    }

    const updatedMember = await this.prisma.workspaceMembership.update({
      where: {
        userId_workspaceId: {
          workspaceId,
          userId: targetId,
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
      title: 'Workspace role updated',
      message: `Your role was changed from ${targetMembership.role} to ${body.role}`,
      entityId: workspaceId,
      entityType: 'WORKSPACE',
      workspaceId,
    });
    await this.activity.createActivity({
      userId: requesterId,
      workspaceId,
      message: `changed ${updatedMember.user.name}'s role from ${targetMembership.role} to ${body.role}`,
    });

    return updatedMember;
  }

  async inviteMember(
    workspaceId: string,
    requesterId: string,
    body: InviteWorkspaceMemberDto,
  ) {
    // 1. Check workspace
    const workspace = await this.prisma.workspace.findUnique({
      where: {
        id: workspaceId,
      },
    });

    if (!workspace) {
      throw new NotFoundException('Workspace not found');
    }

    // 2. Check requester
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
      throw new ForbiddenException('You are not a member of this workspace');
    }

    if (requesterMembership.role !== MembershipRole.ADMIN) {
      throw new ForbiddenException('You are not authorized to invite members');
    }

    // 3. Find existing user if they already have an account
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    // 4. If existing user is already a member, stop
    if (existingUser) {
      const existingMembership =
        await this.prisma.workspaceMembership.findUnique({
          where: {
            userId_workspaceId: {
              userId: existingUser.id,
              workspaceId,
            },
          },
        });

      if (existingMembership) {
        throw new ConflictException(
          'User is already a member of this workspace',
        );
      }
    }

    // 5. Remove an older pending invitation for this email
    await this.prisma.invitation.deleteMany({
      where: {
        workspaceId,
        email: body.email,
        acceptedAt: null,
      },
    });

    const rawToken = randomBytes(32).toString('hex');
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const invitation = await this.prisma.invitation.create({
      data: {
        email: body.email,
        tokenHash,
        workspaceId,
        invitedById: requesterId,
        role: body.role,
        expiresAt,
      },
    });
    const inviter = await this.prisma.user.findUnique({
      where: {
        id: requesterId,
      },
      select: {
        name: true,
      },
    });

    const invitationUrl =
      `${process.env.FRONTEND_URL}` + `/invitations/${rawToken}`;

    const html = workspaceInvitationTemplate(
      workspace.name,
      inviter?.name ?? 'A workspace admin',
      invitationUrl,
    );
    try {
      await this.emailService.sendEmail(
        body.email,
        `You're invited to ${workspace.name} on CollabFlow`,
        html,
      );
    } catch (error) {
      // Don't leave a dead invitation in the DB
      await this.prisma.invitation.delete({
        where: {
          id: invitation.id,
        },
      });

      throw error;
    }

    if (existingUser) {
      await this.notification.createNotification({
        userId: existingUser.id,
        title: 'Workspace invitation',
        message: `You were invited to join "${workspace.name}"`,
        entityId: workspace.id,
        entityType: 'WORKSPACE',
        workspaceId: workspace.id,
      });
    }

    // 13. Activity
    await this.activity.createActivity({
      userId: requesterId,
      workspaceId,
      message: `invited ${body.email} to the workspace`,
    });

    return {
      message: 'Workspace invitation sent',
    };
  }

  async acceptInvite(rawToken: string, userId: string) {
    const tokenHash = createHash('sha256').update(rawToken).digest('hex');

    const invitation = await this.prisma.invitation.findUnique({
      where: {
        tokenHash,
      },
      include: {
        invitedBy: {
          select: {
            id: true,
            name: true,
          },
        },
        workspace: true,
      },
    });
    if (!invitation) {
      throw new BadRequestException('Invalid invitation');
    }

    if (invitation.acceptedAt) {
      throw new BadRequestException(
        'This invitation has already been accepted',
      );
    }

    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('This invitation has expired');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.email.toLowerCase() !== invitation.email.toLowerCase()) {
      throw new ForbiddenException(
        'This invitation was sent to a different email address',
      );
    }

    const existingMembership = await this.prisma.workspaceMembership.findUnique(
      {
        where: {
          userId_workspaceId: {
            userId,
            workspaceId: invitation.workspaceId,
          },
        },
      },
    );

    if (existingMembership) {
      throw new ConflictException('You are already a member of this workspace');
    }

    await this.prisma.$transaction([
      this.prisma.workspaceMembership.create({
        data: {
          userId,
          workspaceId: invitation.workspaceId,
          role: invitation.role,
        },
      }),

      this.prisma.invitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          acceptedAt: new Date(),
        },
      }),
    ]);
    await this.notification.createNotification({
      userId: invitation.invitedBy.id,
      title: 'Invitation accepted',
      message: `${user.name} joined workspace "${invitation.workspace.name}"`,
      entityId: invitation.workspace.id,
      entityType: 'WORKSPACE',
      workspaceId: invitation.workspace.id,
    });
    await this.activity.createActivity({
      userId,
      workspaceId: invitation.workspaceId,
      message: `joined the workspace "${invitation.workspace.name}"`,
    });

    return {
      message: 'Workspace invitation accepted',
      workspace: {
        id: invitation.workspace.id,
        name: invitation.workspace.name,
      },
    };
  }

  async getInvitation(token: string) {
    const tokenHash = createHash('sha256').update(token).digest('hex');
    const invitation = await this.prisma.invitation.findUnique({
      where: {
        tokenHash,
      },
      include: {
        workspace: {
          select: {
            id: true,
            name: true,
          },
        },
        invitedBy: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.acceptedAt) {
      throw new BadRequestException('Invitation has already been accepted');
    }

    if (invitation.expiresAt < new Date()) {
      throw new BadRequestException('Invitation has expired');
    }

    return {
      workspaceId: invitation.workspace.id,
      workspaceName: invitation.workspace.name,
      inviterName: invitation.invitedBy.name,
      role: invitation.role,
      expiresAt: invitation.expiresAt,
    };
  }
}
