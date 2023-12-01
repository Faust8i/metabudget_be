import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../../validators/parse-int.pipe';

import { SpendingCategoriesService } from './categories.service';

import { CreateSpendingCategoryDto } from './dto/create-category.dto';
import { UpdateSpendingCategoryDto } from './dto/update-category.dto';
import { CreateSpendingCategoryResponseDto } from './dto/create-category-respone.dto';
import { FindSpendingCategoryResponseDto }   from './dto/find-category-response.dto';
import { DeleteSpendingCategoryResponseDto } from './dto/delete-category-response.dto';
import { ErrorResponseDto }          from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-categories')
@ApiTags('Расходные категории')
export class SpendingCategoriesController {
  constructor(
    private readonly spendingCategoriesService: SpendingCategoriesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание расходной категории' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданная расходная категория',  type: CreateSpendingCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: CreateSpendingCategoryDto,
    required: true,
    description: 'Информация о расходной категории',
  })
  async create(
    @UserJWT() user_id:  number,
    @Body()    category: CreateSpendingCategoryDto,
    ): Promise<CreateSpendingCategoryResponseDto> {
      return await this.spendingCategoriesService.create(user_id, category);
  }

  @Get()
  @ApiOperation({ summary: 'Получение расходных категорий' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Расходные категории',            type: FindSpendingCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  async findAll(
    @UserJWT() user_id: number,
    ): Promise<FindSpendingCategoryResponseDto> {
      return await this.spendingCategoriesService.findAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение расходной категории' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Расходная категория',            type: FindSpendingCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор расходной категории',
    example: '10'
  })
  async findOne(
    @UserJWT()                    user_id:     number,
    @Param('id', ParseNumberPipe) category_id: number,
    ): Promise<FindSpendingCategoryResponseDto> {
      return await this.spendingCategoriesService.findOne(user_id, category_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление расходной категории' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Удаленная расходная категория',  type: DeleteSpendingCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор расходной категории',
    example: '10'
  })
  @ApiBody({
    type: UpdateSpendingCategoryDto,
    required: true,
    description: 'Информация о расходной категории',
  })
  async delete(
    @UserJWT()                    user_id:     number,
    @Param('id', ParseNumberPipe) category_id: number,
    @Body()                       category:    UpdateSpendingCategoryDto,
    ): Promise<DeleteSpendingCategoryResponseDto> {
      return await this.spendingCategoriesService.delete(user_id, category_id, category);
  }

}