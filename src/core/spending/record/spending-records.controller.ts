import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SpendingRecordsService } from './spending-records.service';

import { CreateSpendingRecordDto } from './dto/create-spending-record.dto';
import { UpdateSpendingRecordDto } from './dto/update-spending-record.dto';


@Controller('spending-records')
export class SpendingRecordsController {
  constructor(
    private readonly spendingRecordService: SpendingRecordsService
  ) {}

  @Post()
  async create(@Body() createSpendingRecordDto: CreateSpendingRecordDto) {
    return await this.spendingRecordService.create(createSpendingRecordDto);
  }

  @Get()
  async findAll() {
    return await this.spendingRecordService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.spendingRecordService.findOne(+id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateSpendingRecordDto: UpdateSpendingRecordDto) {
    return await this.spendingRecordService.patch(+id, updateSpendingRecordDto);
  }

}
