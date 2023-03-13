import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';

import { IncomeCategoriesService } from './income-categories.service';

import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';


@Controller('income-categories')
export class IncomeCategoriesController {
  constructor(
    private readonly incomeCategoriesService: IncomeCategoriesService
  ) {}

  @Post()
  async create(@Body() incomeCategory: CreateIncomeCategoryDto) {
    return await this.incomeCategoriesService.create(incomeCategory);
  }

  @Get()
  async findAll() {
    return await this.incomeCategoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.incomeCategoriesService.findOne(+id);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Body() updateIncomeCategoryDto: UpdateIncomeCategoryDto) {
    return await this.incomeCategoriesService.delete(+id, updateIncomeCategoryDto);
  }

}
