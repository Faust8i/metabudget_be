import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../../validators/parse-int.pipe';

import { IncomeRecordsService } from './records.service';

import { CreateIncomeRecordDto } from './dto/create-record.dto';
import { UpdateIncomeRecordDto } from './dto/update-record.dto';
import { CreateIncomeRecordResponseDto } from './dto/create-record-respone.dto';
import { FindIncomeRecordResponseDto }   from './dto/find-record-response.dto';
import { DeleteIncomeRecordResponseDto } from './dto/delete-record-response.dto';
import { ErrorResponseDto }      from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-records')
@ApiTags('Записи о доходах')
export class IncomeRecordsController {
  constructor(
    private readonly incomeRecordService: IncomeRecordsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание записи о доходе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданная запись о доходах',     type: CreateIncomeRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: CreateIncomeRecordDto,
    required: true,
    description: 'Запись о доходе',
  })
  async create(
    @UserJWT() user_id: number,
    @Body()    record:  CreateIncomeRecordDto,
    ): Promise<CreateIncomeRecordResponseDto> {
      return await this.incomeRecordService.create(user_id, record);
  }

  @Get()
  @ApiOperation({ summary: 'Получение записей о доходах' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Записи о доходах',               type: FindIncomeRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  async findAll(
    @UserJWT() user_id: number,
    ): Promise<FindIncomeRecordResponseDto> {
      return await this.incomeRecordService.findAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение записи о доходе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Запись о доходах',               type: FindIncomeRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор записи о доходе',
    example: '100'
  })
  async findOne(
    @UserJWT()                    user_id:   number,
    @Param('id', ParseNumberPipe) record_id: number,
    ): Promise<FindIncomeRecordResponseDto> {
      return await this.incomeRecordService.findOne(user_id, record_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи о доходе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Удаленная запись о доходах',     type: DeleteIncomeRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор записи о доходе',
    example: '10'
  })
  @ApiBody({
    type: UpdateIncomeRecordDto,
    required: true,
    description: 'Информация о записи о доходе',
  })
  async delete(
    @UserJWT()                    user_id:   number,
    @Param('id', ParseNumberPipe) record_id: number,
    @Body()                       record:    UpdateIncomeRecordDto,
    ): Promise<DeleteIncomeRecordResponseDto> {
      return await this.incomeRecordService.delete(user_id, record_id, record);
  }

}