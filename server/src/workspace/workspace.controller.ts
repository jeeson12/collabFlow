import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { WorkspaceService } from './workspace.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private workspaceService: WorkspaceService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createWorkspace(@Body() body: CreateWorkspaceDto, @Req() req) {
    return this.workspaceService.createWorkspace(body, req.user.userId);
  }

  @Get(':workspaceId')
  @UseGuards(JwtAuthGuard)
  getWorkspace(@Param('workspaceId') workspaceId: string, @Req() req) {
    return this.workspaceService.getWorkspace(workspaceId, req.user.userId);
  }
}
