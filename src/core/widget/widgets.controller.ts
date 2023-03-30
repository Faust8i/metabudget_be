import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../decorator/user-jwt.decorator';

import { WidgetsService } from './widgets.service';


@UseGuards(JwtAuthGuard)
@Controller('widgets')
export class WidgetsController {
  constructor(
    private readonly widgetService: WidgetsService
  ) {}

  @Get('two-line/:year')
  async getTwoLineWidgetData(
    @UserJWT()     user_id: number,
    @Param('year') year:    string,
    ) {
      return await this.widgetService.getTwoLineWidgetData(user_id, +year);
  }

}
