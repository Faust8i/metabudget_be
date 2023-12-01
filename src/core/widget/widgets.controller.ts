import { Controller, Get, HttpStatus, Param, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../validators/parse-int.pipe';

import { WidgetsService }   from './widgets.service';

import { ErrorResponseDto } from '../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('widgets')
@ApiTags('Виджеты')
export class WidgetsController {
  constructor(
    private readonly widgetService: WidgetsService
  ) {}

  @Get('two-line/:year')
  @ApiOperation({ summary: 'Виджет аналитики доходов и расходов в разрезе года' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Информация для виджета' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'year',
    type: 'number',
    required: true,
    description: 'Номер года',
    example: '2023'
  })
  async getTwoLineWidgetData(
    @UserJWT()                      user_id: number,
    @Param('year', ParseNumberPipe) year:    number,
    ): Promise<object> {
      return await this.widgetService.getTwoLineWidgetData(user_id, +year);
  }

}