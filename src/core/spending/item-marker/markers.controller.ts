import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { SpendingItemMarkersService } from './markers.service';

import { CreateSpendingItemMarkerDto }     from './dto/create-marker.dto';
import { CreateSpendingMarkerResponseDto } from './dto/create-marker-respone.dto';
import { FindSpendingMarkerResponseDto }   from './dto/find-marker-response.dto';
import { ErrorResponseDto }                from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-items/markers')
@ApiTags('Маркеры расходных статей')
export class SpendingItemMarkersController {
  constructor(
    private readonly spendingItemMarkersService: SpendingItemMarkersService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание маркера расходных статей' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданный маркер расходных статей', type: CreateSpendingMarkerResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа',    type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',                type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',         type: ErrorResponseDto })
  @ApiBody({
    type: CreateSpendingItemMarkerDto,
    required: true,
    description: 'Информация о маркере расходных статей',
  })
  async create(
    @UserJWT() user_id: number,
    @Body()    marker:  CreateSpendingItemMarkerDto,
    ): Promise<CreateSpendingMarkerResponseDto> {
      return await this.spendingItemMarkersService.create(user_id, marker);
  }

  @Get(':marker_name')
  @ApiOperation({ summary: 'Получение маркера расходных статей' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Маркер расходных статей',        type: FindSpendingMarkerResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'marker_name',
    type: 'string',
    required: true,
    description: 'Имя маркера расходных статей',
    example: 'mark1'
  })
  async findOne(
    @UserJWT()            user_id:     number,
    @Param('marker_name') marker_name: string,
    ): Promise<FindSpendingMarkerResponseDto> {
      return await this.spendingItemMarkersService.findOne(user_id, marker_name);
  }

}