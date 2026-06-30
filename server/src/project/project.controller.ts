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
import { AddProjectMemberDto } from './add-project-member.dto';

@Controller('project')
@UseGuards(JwtAuthGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  createProject(@Body() body: createProjectDto, @Req() req) {
    return this.projectService.createProject(body, req.user.userId);
  }

  @Get()
  getProject(@Req() req) {
    return this.projectService.getProject(req.user.userId);
  }

  @Get(':projectId')
  getProjectbyId(@Param('projectId') projectId: string, @Req() req) {
    return this.projectService.getProjectbyId(projectId, req.user.userId);
  }

  @Patch(':projectId')
  updateProject(
    @Param('projectId') projectId: string,
    @Req() req,
    @Body() body: updateProjectDto,
  ) {
    return this.projectService.updateProject(projectId, body, req.user.userId);
  }

  @Delete(':projectId')
  deleteProject(@Param('projectId') projectId: string, @Req() req) {
    return this.projectService.deleteProject(projectId, req.user.userId);
  }

  @Post('/:projectId/member')
  AddMember(
    @Param('projectId') projectId: string,
    @Req() req,
    @Body() body: AddProjectMemberDto,
  ) {
    return this.projectService.addMember(projectId, req.user.userId, body);
  }

  @Get(':projectId/member')
  getMember(@Param('projectId') projectId: string, @Req() req) {
    return this.projectService.getMember(projectId, req.user.userId);
  }

  @Delete(':projectId/member/:targetId')
  deleteMember(
    @Param('projectId') projectid: string,
    @Req() req,
    @Param('targetId') targetId: string,
  ) {
    console.log('DELETE HIT');

    return this.projectService.deleteMember(
      projectid,
      req.user.userId,
      targetId,
    );
  }
}
