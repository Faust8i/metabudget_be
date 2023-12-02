import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../../validators/parse-int.pipe';

import { SpendingItemsService } from './tems.service';

import { CreateSpendingItemDto } from './dto/create-item.dto';
import { UpdateSpendingItemDto } from './dto/update-item.dto';
import { CreateSpendingItemResponseDto } from './dto/create-item-respone.dto';
import { FindSpendingItemResponseDto }   from './dto/find-item-response.dto';
import { DeleteSpendingItemResponseDto } from './dto/delete-item-response.dto';
import { ErrorResponseDto }      from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-items')
@ApiTags('Расходные статьи')
export class SpendingItemsController {
  constructor(
    private readonly spendingItemsService: SpendingItemsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание расходной статьи' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданная расходная статья',     type: CreateSpendingItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: CreateSpendingItemDto,
    required: true,
    description: 'Информация о расходной статье',
  })
  async create(
    @UserJWT() user_id: number,
    @Body()    item:    CreateSpendingItemDto,
    ): Promise<CreateSpendingItemResponseDto> {
      return await this.spendingItemsService.create(user_id, item);
  }

  @Get()
  @ApiOperation({ summary: 'Получение расходых статей' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Расходные статьи',               type: FindSpendingItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  async findAll(
    @UserJWT() user_id: number,
    ): Promise<FindSpendingItemResponseDto> {
      return await this.spendingItemsService.findAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение расходной статьи' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Расходная статья',               type: FindSpendingItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор расходной статьи',
    example: '10'
  })
  async findOne(
    @UserJWT()                    user_id: number,
    @Param('id', ParseNumberPipe) item_id: number,
    ): Promise<FindSpendingItemResponseDto>  {
      return await this.spendingItemsService.findOne(user_id, item_id);
  }

  /**
  * Удаление расходной статьи
  * @param user_id 
  * @param item_id 
  * @param item 
  * @returns 
  */
  @Delete(':id')
  @ApiOperation({ summary: 'Удаление расходной статьи' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Удаленная расходная статья',     type: DeleteSpendingItemResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор расходной статьи',
    example: '10'
  })
  @ApiBody({
    type: UpdateSpendingItemDto,
    required: true,
    description: 'Информация о расходной статье',
  })
  async delete(
    @UserJWT()                    user_id: number,
    @Param('id', ParseNumberPipe) item_id: number,
    @Body()                       item:    UpdateSpendingItemDto,
    ): Promise<DeleteSpendingItemResponseDto> {
      return await this.spendingItemsService.delete(user_id, item_id, item);
  }

}