import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

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

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIncomeCategoryDto: UpdateIncomeCategoryDto) {
    return await this.incomeCategoriesService.update(+id, updateIncomeCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.incomeCategoriesService.remove(+id);
  }
}
