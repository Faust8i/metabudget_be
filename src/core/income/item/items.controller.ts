import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../../validators/parse-int.pipe';

import { IncomeItemsService } from './items.service';

import { CreateIncomeItemDto } from './dto/create-item.dto';
import { UpdateIncomeItemDto } from './dto/update-item.dto';
import { CreateIncomeItemResponseDto } from './dto/create-item-respone.dto';
import { FindIncomeItemResponseDto }   from './dto/find-item-response.dto';
import { DeleteIncomeItemResponseDto } from './dto/delete-item-response.dto';
import { ErrorResponseDto }    from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-items')
@ApiTags('Доходные статьи')
export class IncomeItemsController {
  constructor(
    private readonly incomeItemsService: IncomeItemsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание доходной статьи' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданная доходная статья',      type: CreateIncomeItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: CreateIncomeItemDto,
    required: true,
    description: 'Информация о доходной статье',
  })
  async create(
    @UserJWT() user_id: number,
    @Body()    item:    CreateIncomeItemDto,
    ): Promise<CreateIncomeItemResponseDto> {
      return await this.incomeItemsService.create(user_id, item);
  }

  @Get()
  @ApiOperation({ summary: 'Получение доступных доходных статей' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Доходные статьи',                type: FindIncomeItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  async findAll(
    @UserJWT() user_id: number,
    ): Promise<FindIncomeItemResponseDto> {
      return await this.incomeItemsService.findAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение доходной статьи' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Доходная статья',                type: FindIncomeItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор доходной статьи',
    example: '10'
  })
  async findOne(
    @UserJWT()                    user_id: number,
    @Param('id', ParseNumberPipe) item_id: number,
    ): Promise<FindIncomeItemResponseDto> {
      return await this.incomeItemsService.findOne(user_id, item_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление доходной статьи' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Удаленная доходная статья',      type: DeleteIncomeItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор доходной статьи',
    example: '10'
  })
  @ApiBody({
    type: UpdateIncomeItemDto,
    required: true,
    description: 'Информация о доходной статье',
  })
  async delete(
    @UserJWT()                    user_id: number,
    @Param('id', ParseNumberPipe) item_id: number, 
    @Body()                       item:    UpdateIncomeItemDto,
    ): Promise<DeleteIncomeItemResponseDto> {
      return await this.incomeItemsService.delete(user_id, item_id, item);
  }

}
