import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../validators/parse-int.pipe';

import { SharesService } from './shares.service';

import { CreateShareDto }   from './dto/create-share.dto';
import { UpdateShareDto }   from './dto/update-share.dto';
import { CreateShareResponseDto } from './dto/create-share-respone.dto';
import { FindShareResponseDto }   from './dto/find-share-response.dto';
import { DeleteShareResponseDto } from './dto/delete-share-response.dto';
import { ErrorResponseDto } from '../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('shares')
@ApiTags('Совместный доступ')
export class SharesController {
  constructor(
    private readonly SharesService: SharesService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание записи о совместном доступе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданная запись о совместном доступе', type: CreateShareResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа',        type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',                    type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',             type: ErrorResponseDto })
  @ApiBody({
    type: CreateShareDto,
    required: true,
    description: 'Запись о совместном доступе',
  })
  async create(
    @UserJWT() user_id: number,
    @Body()    share:   CreateShareDto,
    ): Promise<CreateShareResponseDto> {
      return await this.SharesService.create(user_id, share);
  }

  @Get()
  @ApiOperation({ summary: 'Получение информации о совместном доступе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Записи о совместном доступе',    type: FindShareResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  async findAll(
    @UserJWT() user_id: number,
    ): Promise<FindShareResponseDto> {
      return await this.SharesService.findAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение информации о записи совместного доступа' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Запись о совместном доступе',    type: FindShareResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор записи о совместном доступе',
    example: '5'
  })
  async findOne(
    @UserJWT()                    user_id:  number,
    @Param('id', ParseNumberPipe) share_id: number,
    ): Promise<FindShareResponseDto> {
      return await this.SharesService.findOne(user_id, share_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи о совместном доступе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Удаленная запись о совместном доступе', type: DeleteShareResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа',        type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',                    type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',             type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор записи о совместном доступе',
    example: '10'
  })
  @ApiBody({
    type: UpdateShareDto,
    required: true,
    description: 'Информация о записи о совместном доступе',
  })
  async delete(
    @UserJWT()                    user_id:  number,
    @Param('id', ParseNumberPipe) share_id: number,
    @Body()                       category: UpdateShareDto,
    ): Promise<DeleteShareResponseDto> {
      return await this.SharesService.delete(user_id, share_id, category);
  }

}