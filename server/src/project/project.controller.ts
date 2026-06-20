import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ProjectService } from './project.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createProjectDto } from './dto/create-project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createProject(@Body() body: createProjectDto, @Req() req) {
    return this.projectService.createProject(body, req.user.userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getProject(@Req() req) {
    return this.projectService.getProject(req.user.userId);
  }
}
