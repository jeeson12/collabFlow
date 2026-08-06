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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from 'src/auth/strategies/auth-guards/jwt-auth.guard';
import { createTaskDto } from './dto/create-task.dto';
import { updateTaskDto } from './dto/upate-task.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AttachmentService } from '../attachment/attachment.service';
@UseGuards(JwtAuthGuard)
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly attachmentService: AttachmentService,
  ) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async createTask(
    @Body() body: createTaskDto,
    @UploadedFiles() files: Express.Multer.File[],
    @Req() req,
  ) {
    const task = await this.taskService.createTask(body, req.user.id);

    if (files.length) {
      await this.attachmentService.upload(task.id, files, req.user.id);
    }
    return task;
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
  getTaskStats(@Param('projectId') projectId: string, @Req() req) {
    return this.taskService.getTaskOverview(projectId, req.user.id);
  }

  @Get('my-task')
  getMyTasks(@Req() req) {
    return this.taskService.getMyTasks(req.user.id);
  }
}
