import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IncomeItemMarkersService } from './markers.service';

import { CreateIncomeItemMarkerDto }     from './dto/create-marker.dto';
import { CreateIncomeMarkerResponseDto } from './dto/create-marker-respone.dto';
import { FindIncomeMarkerResponseDto }   from './dto/find-marker-response.dto';
import { ErrorResponseDto }              from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-items/markers')
@ApiTags('Маркеры доходных статей')
export class IncomeItemMarkersController {
  constructor(
    private readonly incomeItemMarkersService: IncomeItemMarkersService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание маркера доходных статей' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданный маркер доходных статей', type: CreateIncomeMarkerResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа',   type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',               type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',        type: ErrorResponseDto })
  @ApiBody({
    type: CreateIncomeItemMarkerDto,
    required: true,
    description: 'Информация о маркере доходных статей',
  })
  async create(
    @UserJWT() user_id: number,
    @Body()    marker:  CreateIncomeItemMarkerDto,
    ): Promise<CreateIncomeMarkerResponseDto> {
      return await this.incomeItemMarkersService.create(user_id, marker);
  }

  @Get(':marker_name')
  @ApiOperation({ summary: 'Получение маркер доходных статей' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Маркер доходных статей',         type: FindIncomeMarkerResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'marker_name',
    type: 'string',
    required: true,
    description: 'Имя маркера доходных статей',
    example: 'mark1'
  })
  async findOne(
    @UserJWT()            user_id:     number,
    @Param('marker_name') marker_name: string,
    ): Promise<FindIncomeMarkerResponseDto> {
      return await this.incomeItemMarkersService.findOne(user_id, marker_name);
  }

}