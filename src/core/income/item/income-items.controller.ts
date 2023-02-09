import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { IncomeItemsService } from './income-items.service';

import { CreateIncomeItemDto } from './dto/create-income-item.dto';
import { UpdateIncomeItemDto } from './dto/update-income-item.dto';


@Controller('income-items')
export class IncomeItemsController {
  constructor(
    private readonly incomeItemsService: IncomeItemsService
  ) {}

  @Post()
  async create(@Body() createIncomeItemDto: CreateIncomeItemDto) {
    return await this.incomeItemsService.create(createIncomeItemDto);
  }

  @Get()
  async findAll() {
    return await this.incomeItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.incomeItemsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIncomeItemDto: UpdateIncomeItemDto) {
    return await this.incomeItemsService.update(+id, updateIncomeItemDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.incomeItemsService.remove(+id);
  }
}
