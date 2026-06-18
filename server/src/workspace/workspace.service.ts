import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Injectable()
export class WorkspaceService {
  constructor(private prisma: PrismaService) {}
  async createWorkspace(body: CreateWorkspaceDto, userId: string) {
    const workspace = await this.prisma.workspace.create({
      data: { name: body.name },
    });
    await this.prisma.workspaceMembership.create({
      data: { workspaceId: workspace.id, userId, role: 'OWNER' },
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
}
