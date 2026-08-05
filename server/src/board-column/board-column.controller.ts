import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { BoardColumnService } from './board-column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ReorderColumnsDto } from './dto/reorder-column.dto';

@Controller('board-column')
export class BoardColumnController {
  constructor(private readonly boardColumnService: BoardColumnService) {}

  @Post()
  createColumn(@Body() body: CreateColumnDto, @Req() req) {
    return this.boardColumnService.createColumn(body, req.user.id);
  }

  @Get('/project/:projectId')
  getColumns(@Param('projectId') projectId: string, @Req() req) {
    return this.boardColumnService.getColumns(projectId, req.user.id);
  }

  @Patch(':columnId')
  updateColumn(
    @Param('columnId') columnId: string,
    @Body() body: UpdateColumnDto,
    @Req() req,
  ) {
    return this.boardColumnService.updateColumn(columnId, body, req.user.id);
  }

  @Patch('reorder')
  reorderColumns(@Body() body: ReorderColumnsDto, @Req() req) {
    return this.boardColumnService.reorderColumns(body, req.user.id);
  }

  @Delete(':columnId')
  deleteColumn(@Param('columnId') columnId: string, @Req() req) {
    return this.boardColumnService.deleteColumn(columnId, req.user.id);
  }
}
