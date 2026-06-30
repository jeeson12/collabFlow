import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from 'src/auth/strategies/auth-guards/jwt-auth.guard';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}
  @Get('project/:projectId')
  getActivity(@Param('projectId') projectId: string) {
    return this.activityService.getActivity(projectId);
  }
}
