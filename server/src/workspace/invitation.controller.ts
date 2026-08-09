import { Controller, Get, Param } from '@nestjs/common';
import { WorkspaceService } from './workspace.service';

@Controller('workspace/invitations')
export class InvitationController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get(':token')
  getInvitation(@Param('token') token: string) {
    return this.workspaceService.getInvitation(token);
  }
}
