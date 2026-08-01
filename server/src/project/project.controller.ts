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
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/strategies/auth-guards/jwt-auth.guard';
import { createProjectDto } from './dto/create-project.dto';
import { updateProjectDto } from './dto/update-project.dto';
import { AddProjectMemberDto } from './dto/add-project-member.dto';
import { UpdateProjectMemberDto } from './dto/update-project-member.dto';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() body: createProjectDto, @Req() req) {
    return this.projectService.createProject(body, req.user.id);
  }

  @Get()
  getProject(@Req() req) {
    return this.projectService.getProject(req.user.id);
  }

  @Get('workspace/:workspaceId')
  getWorkspaceProject(@Param('workspaceId') workspaceId: string, @Req() req) {
    return this.projectService.getWorkspaceProjects(workspaceId, req.user.id);
  }

  @Get(':projectId')
  getProjectbyId(@Param('projectId') projectId: string, @Req() req) {
    return this.projectService.getProjectbyId(projectId, req.user.id);
  }

  @Patch(':projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Req() req,
    @Body() body: updateProjectDto,
  ) {
    return this.projectService.updateProject(projectId, body, req.user.id);
  }

  @Delete(':projectId')
  deleteProject(@Param('projectId') projectId: string, @Req() req) {
    return this.projectService.deleteProject(projectId, req.user.id);
  }

  @Post('/:projectId/member')
  AddMember(
    @Param('projectId') projectId: string,
    @Req() req,
    @Body() body: AddProjectMemberDto,
  ) {
    return this.projectService.addMember(projectId, req.user.id, body);
  }

  @Get(':projectId/members')
  getMember(@Param('projectId') projectId: string, @Req() req) {
    return this.projectService.getMember(projectId, req.user.id);
  }

  @Delete(':projectId/member/:targetId')
  deleteMember(
    @Param('projectId') projectid: string,
    @Req() req,
    @Param('targetId') targetId: string,
  ) {
    console.log('DELETE HIT');

    return this.projectService.deleteMember(projectid, req.user.id, targetId);
  }

  @Patch(':projectId/member/:targetId')
  updateMemberRole(
    @Param('projectId') projectId: string,
    @Param('targetId') targetId: string,
    @Req() req,
    @Body() body: UpdateProjectMemberDto,
  ) {
    return this.projectService.updateMember(
      projectId,
      targetId,
      req.user.id,
      body,
    );
  }

  @Get(':projectId/members/available')
  getAvailableMembers(@Param('projectId') projectId: string, @Req() req) {
    return this.projectService.availableMembers(projectId, req.user.id);
  }
}
