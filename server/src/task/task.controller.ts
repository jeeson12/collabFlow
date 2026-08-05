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
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/strategies/auth-guards/jwt-auth.guard';
import { createTaskDto } from './dto/create-task.dto';
import { get } from 'http';
import { updateTaskDto } from './dto/upate-task.dto';
import { UpdateProjectMemberDto } from 'src/project/dto/update-project-member.dto';
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() body: createTaskDto, @Req() req) {
    return this.taskService.createTask(body, req.user.id);
  }

  @Get('project/:projectId')
  getTasks(@Param('projectId') projectId: string, @Req() req) {
    return this.taskService.gettasks(projectId, req.user.id);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: updateTaskDto, @Req() req) {
    return this.taskService.updateTask(id, body, req.user.id);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string, @Req() req) {
    return this.taskService.deleteTask(id, req.user.id);
  }

  @Get('project/:projectId/stats')
  getTaskStats(
    @Param('projectId') projectId: string,
    @Req() req,
    @Body() body: UpdateProjectMemberDto,
  ) {
    return this.taskService.getTaskStats(projectId, req.user.id);
  }

  @Get('my-task')
  getMyTasks(@Req() req) {
    return this.taskService.getMyTasks(req.user.id);
  }
}
