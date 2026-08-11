import { Controller, Get, Patch, Param, Req, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/strategies/auth-guards/jwt-auth.guard';
import { NotificationService } from './notification.service';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  getNotifications(@Req() req) {
    return this.notificationService.getNotifications(req.user.id);
  }

  @Patch(':notificationId/read')
  markAsRead(@Param('notificationId') notificationId: string, @Req() req) {
    return this.notificationService.markAsRead(notificationId, req.user.id);
  }

  @Patch('read-all')
  markAllAsRead(@Req() req) {
    return this.notificationService.markAllAsRead(req.user.id);
  }
}
