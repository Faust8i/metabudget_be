import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { IncomeRecordsService } from './income-records.service';

import { CreateIncomeRecordDto } from './dto/create-income-record.dto';
import { UpdateIncomeRecordDto } from './dto/update-income-record.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-records')
export class IncomeRecordsController {
  constructor(
    private readonly incomeRecordService: IncomeRecordsService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id: number,
    @Body()    record:  CreateIncomeRecordDto,
    ) {
      return await this.incomeRecordService.create(user_id, record);
  }

  @Get()
  async findAll(
    @UserJWT() user_id: number,
    ) {
      return await this.incomeRecordService.findAll(user_id);
  }

  @Get(':id')
  async findOne(
    @UserJWT()   user_id:   number,
    @Param('id') record_id: string,
    ) {
      return await this.incomeRecordService.findOne(user_id, +record_id);
  }

  @Delete(':id')
  async delete(
    @UserJWT()   user_id:   number,
    @Param('id') record_id: string,
    @Body()      record:    UpdateIncomeRecordDto,
    ) {
      return await this.incomeRecordService.delete(user_id, +record_id, record);
  }

}