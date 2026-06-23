import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { updateWorkspaceDto } from './dto/update-workspace.dto';
import { AddWorkspaceMemberDto } from './dto/add-workspace-member.dto';

@Controller('workspace')
@UseGuards(JwtAuthGuard)
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post()
  createWorkspace(@Body() body: CreateWorkspaceDto, @Req() req) {
    return this.workspaceService.createWorkspace(body, req.user.userId);
  }

  @Get(':workspaceId')
  getWorkspace(@Param('workspaceId') workspaceId: string, @Req() req) {
    return this.workspaceService.getWorkspace(workspaceId, req.user.userId);
  }

  @Patch(':workspaceId')
  updateProject(
    @Param('workspaceId') workspaceId: string,
    @Req() req,
    @Body() body: updateWorkspaceDto,
  ) {
    return this.workspaceService.updateWorkspace(
      workspaceId,
      req.user.userId,
      body,
    );
  }

  @Delete(':workspaceId')
  deleteWorkspace(@Param('workspaceId') workspaceId: string, @Req() req) {
    return this.workspaceService.deleteWorkspace(workspaceId, req.user.userId);
  }

  @Post(':workspaceId/members')
  addMember(
    @Param('workspaceId') workspaceId: string,
    @Req() req,
    @Body() body: AddWorkspaceMemberDto,
  ) {
    return this.workspaceService.addMember(workspaceId, req.user.userId, body);
  }
}
