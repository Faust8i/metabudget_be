import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { IncomeRecordsService } from './income-records.service';

import { CreateIncomeRecordDto } from './dto/create-income-record.dto';
import { UpdateIncomeRecordDto } from './dto/update-income-record.dto';


@Controller('income-records')
export class IncomeRecordsController {
  constructor(
    private readonly incomeRecordService: IncomeRecordsService
  ) {}

  @Post()
  async create(@Body() createIncomeRecordDto: CreateIncomeRecordDto) {
    return await this.incomeRecordService.create(createIncomeRecordDto);
  }

  @Get()
  async findAll() {
    return await this.incomeRecordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.incomeRecordService.findOne(+id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateIncomeRecordDto: UpdateIncomeRecordDto) {
    return await this.incomeRecordService.patch(+id, updateIncomeRecordDto);
  }

}
