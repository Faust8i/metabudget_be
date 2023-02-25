import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { WidgetsService } from './widgets.service';


@Controller('widgets')
export class WidgetsController {
  constructor(
    private readonly widgetService: WidgetsService
  ) {}

  @Get('two-line/:id')
  async getTwoLineWidgetData(@Param('id') id: string) {
    return await this.widgetService.getTwoLineWidgetData(+id);
  }

}
