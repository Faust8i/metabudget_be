import { Controller, Get, Post, Body, Param, Delete, UseGuards, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { ParseNumberPipe } from '../../../validators/parse-int.pipe';

import { SpendingRecordsService } from './records.service';

import { CreateSpendingRecordDto } from './dto/create-record.dto';
import { UpdateSpendingRecordDto } from './dto/update-record.dto';
import { CreateSpendingRecordResponseDto } from './dto/create-record-respone.dto';
import { FindSpendingRecordResponseDto }   from './dto/find-record-response.dto';
import { DeleteSpendingRecordResponseDto } from './dto/delete-record-response.dto';
import { ErrorResponseDto }        from '../../../filters/dto/error_response.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-records')
@ApiTags('Записи о расходах')
export class SpendingRecordsController {
  constructor(
    private readonly spendingRecordService: SpendingRecordsService
  ) {}

  @Post()
  @ApiOperation({ summary: 'Создание записи о расходе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Созданная запись о расходах',    type: CreateSpendingRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiBody({
    type: CreateSpendingRecordDto,
    required: true,
    description: 'Запись о расходе',
  })
  async create(
    @UserJWT() user_id: number,
    @Body()    record:  CreateSpendingRecordDto,
    ): Promise<CreateSpendingRecordResponseDto> {
      return await this.spendingRecordService.create(user_id, record);
  }

  @Get()
  @ApiOperation({ summary: 'Получение записей о расходах' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Записи о расходах',              type: FindSpendingRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  async findAll(
    @UserJWT() user_id: number,
    ): Promise<FindSpendingRecordResponseDto> {
      return await this.spendingRecordService.findAll(user_id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение записи о расходах' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Запись о расходах',              type: FindSpendingRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор записи о расходе',
    example: '100'
  })
  async findOne(
    @UserJWT()                    user_id:   number,
    @Param('id', ParseNumberPipe) record_id: number,
    ): Promise<FindSpendingRecordResponseDto> {
      return await this.spendingRecordService.findOne(user_id, record_id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удаление записи о расходе' })
  @ApiResponse({ status: HttpStatus.OK,                    description: 'Удаленная запись о расходах',    type: DeleteSpendingRecordResponseDto })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED,          description: 'Ошибка авторизации или доступа', type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.UNPROCESSABLE_ENTITY,  description: 'Ошибка базы данных',             type: ErrorResponseDto })
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Внутренняя ошибка сервера',      type: ErrorResponseDto })
  @ApiQuery({
    name: 'id',
    type: 'number',
    required: true,
    description: 'Идентификатор записи о расходе',
    example: '10'
  })
  @ApiBody({
    type: UpdateSpendingRecordDto,
    required: true,
    description: 'Информация о записи о доходе',
  })
  async delete(
    @UserJWT()                    user_id:   number,
    @Param('id', ParseNumberPipe) record_id: number,
    @Body()      record:    UpdateSpendingRecordDto,
    ): Promise<DeleteSpendingRecordResponseDto> {
      return await this.spendingRecordService.delete(user_id, record_id, record);
  }

}
