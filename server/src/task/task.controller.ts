import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createTaskDto } from './dto/create-task.dto';
import { get } from 'http';
import { updateTaskDto } from './dto/upate-task.dto';
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  createTask(@Body() body: createTaskDto) {
    return this.taskService.createTask(body);
  }

  @Get('/project/:projectId')
  getTasks(@Param('projectId') projectId: string) {
    return this.taskService.gettasks(projectId);
  }

  @Patch(':id')
  updateTask(@Param('id') id: string, @Body() body: updateTaskDto) {
    return this.taskService.updateTask(id, body);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.taskService.deleteTask(id);
  }
}
