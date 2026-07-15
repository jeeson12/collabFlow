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
import { JwtAuthGuard } from 'src/auth/strategies/auth-guards/jwt-auth.guard';
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

  @Get()
  getUserWorkspaces(@Req() req) {
    return this.workspaceService.getUserWorkspaces(req.user.userId);
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

  @Get(':workspaceId/members')
  getMember(@Param('workspaceId') workspaceId: string, @Req() req) {
    return this.workspaceService.getMember(workspaceId, req.user.userId);
  }

  @Delete(':workspaceId/members/:targetUserId')
  deleteMember(
    @Param('workspaceId') workspaceId: string,
    @Param('targetUserId') targetUserId: string,
    @Req() req,
  ) {
    return this.workspaceService.deleteMember(
      workspaceId,
      req.user.userId,
      targetUserId,
    );
  }
}
