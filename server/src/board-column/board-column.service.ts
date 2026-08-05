import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ActivityService } from 'src/activity/activity.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ReorderColumnsDto } from './dto/reorder-column.dto';

@Injectable()
export class BoardColumnService {
  constructor(
    private prisma: PrismaService,
    private activity: ActivityService,
  ) {}

  async createColumn(body: CreateColumnDto, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: body.projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: body.projectId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }

    const existingColumn = await this.prisma.boardColumn.findFirst({
      where: {
        projectId: body.projectId,
        name: body.name,
      },
    });

    if (existingColumn) {
      throw new ConflictException('Column already exists');
    }
    const lastcolumn = await this.prisma.boardColumn.findFirst({
      where: { projectId: body.projectId },
      orderBy: {
        order: 'desc',
      },
    });

    const order = lastcolumn ? lastcolumn.order + 1 : 1;

    const column = await this.prisma.boardColumn.create({
      data: {
        name: body.name,
        projectId: body.projectId,
        order,
      },
    });

    await this.activity.createActivity({
      userId,
      workspaceId: project.workspaceId,
      projectId: project.id,
      message: `created column "${column.name}"`,
    });
    return column;
  }

  async getColumns(projectId: string, userId: string) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
      },
    });

    if (!project) {
      throw new NotFoundException('Project not found');
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
      throw new ForbiddenException('You are not a member of this project');
    }

    const columns = await this.prisma.boardColumn.findMany({
      where: {
        projectId,
      },
      orderBy: { order: 'asc' },
    });
    return columns;
  }

  async updateColumn(columnId: string, body: UpdateColumnDto, userId: string) {
    const column = await this.prisma.boardColumn.findUnique({
      where: {
        id: columnId,
      },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: column.projectId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }

    if (body.name) {
      const existingColumn = await this.prisma.boardColumn.findFirst({
        where: {
          projectId: column.projectId,
          name: body.name,
          NOT: { id: columnId },
        },
      });
      if (existingColumn) {
        throw new ConflictException('Column already exists');
      }
    }
    const updatedColumn = await this.prisma.boardColumn.update({
      where: {
        id: columnId,
      },
      data: body,
    });

    const project = await this.prisma.project.findUnique({
      where: {
        id: column.projectId,
      },
    });
    await this.activity.createActivity({
      userId,
      workspaceId: project?.workspaceId,
      projectId: column.projectId,
      message: `renamed column "${column.name}" to "${updatedColumn.name}"`,
    });
    return updatedColumn;
  }

  async reorderColumns(body: ReorderColumnsDto, userId: string) {
    if (!body.columns || body.columns.length === 0) {
      return; // Nothing to reorder
    }

    const firstColumnId = body.columns[0].id;
    const column = await this.prisma.boardColumn.findUnique({
      where: { id: firstColumnId },
      select: { projectId: true },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: { userId_projectId: { userId, projectId: column.projectId } },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }
    await this.prisma.$transaction(
      body.columns.map((column) =>
        this.prisma.boardColumn.update({
          where: {
            id: column.id,
          },
          data: {
            order: column.order,
          },
        }),
      ),
    );
  }
  async deleteColumn(columnId: string, userId: string) {
    const column = await this.prisma.boardColumn.findUnique({
      where: {
        id: columnId,
      },
    });

    if (!column) {
      throw new NotFoundException('Column not found');
    }

    const membership = await this.prisma.projectMembership.findUnique({
      where: {
        userId_projectId: {
          userId,
          projectId: column.projectId,
        },
      },
    });

    if (!membership) {
      throw new ForbiddenException('You are not a member of this project');
    }

    const taskCount = await this.prisma.task.count({
      where: {
        columnId,
      },
    });

    if (taskCount > 0) {
      throw new ConflictException('Cannot delete a column that contains tasks');
    }

    const project = await this.prisma.project.findUnique({
      where: {
        id: column.projectId,
      },
    });

    await this.activity.createActivity({
      userId,
      workspaceId: project?.workspaceId,
      projectId: column.projectId,
      message: `deleted column "${column.name}"`,
    });

    await this.prisma.boardColumn.delete({
      where: {
        id: columnId,
      },
    });

    return {
      message: 'Column deleted successfully',
    };
  }
}
