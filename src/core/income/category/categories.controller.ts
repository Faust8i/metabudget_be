import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../../validators/parse-int.pipe';

import { IncomeCategoriesService } from './categories.service';

import { CreateIncomeCategoryDto } from './dto/create-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-category.dto';
import { CreateIncomeCategoryResponseDto } from './dto/create-category-respone.dto';
import { FindIncomeCategoryResponseDto }   from './dto/find-category-response.dto';
import { DeleteIncomeCategoryResponseDto } from './dto/delete-category-response.dto';
import { ErrorResponseDto }        from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-categories')
@ApiTags('Доходные категории')
export class IncomeCategoriesController {
  constructor(
    private readonly incomeCategoriesService: IncomeCategoriesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание доходной категории' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданная доходная категория',   type: CreateIncomeCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: CreateIncomeCategoryDto,
    required: true,
    description: 'Информация о доходной категории',
  })
  async create(
    @UserJWT() user_id:  number,
    @Body()    category: CreateIncomeCategoryDto,
    ): Promise<CreateIncomeCategoryResponseDto> {
      return await this.incomeCategoriesService.create(user_id, category);
  }

  @Get()
  @ApiOperation({ summary: 'Получение доступных доходных категорий' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Доходные категории',             type: FindIncomeCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
    async findAll(
    @UserJWT() user_id: number,
    ): Promise<FindIncomeCategoryResponseDto> {
      return await this.incomeCategoriesService.findAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение доходной категории' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Доходная категория',             type: FindIncomeCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор доходной категории',
    example: '10'
  })
  async findOne(
    @UserJWT()                    user_id:     number,
    @Param('id', ParseNumberPipe) category_id: number,
    ): Promise<FindIncomeCategoryResponseDto> {
      return await this.incomeCategoriesService.findOne(user_id, category_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление доходной категории' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Удаленная доходная категория',   type: DeleteIncomeCategoryResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор доходной категории',
    example: '10'
  })
  @ApiBody({
    type: UpdateIncomeCategoryDto,
    required: true,
    description: 'Информация о доходной категории',
  })
  async delete(
    @UserJWT()                    user_id:     number,
    @Param('id', ParseNumberPipe) category_id: number,
    @Body()                       category:    UpdateIncomeCategoryDto,
    ):Promise<DeleteIncomeCategoryResponseDto> {
      return await this.incomeCategoriesService.delete(user_id, category_id, category);
  }

}