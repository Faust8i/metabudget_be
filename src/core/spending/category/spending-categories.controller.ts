import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SpendingCategoriesService } from './spending-categories.service';

import { CreateSpendingCategoryDto } from './dto/create-spending-category.dto';
import { UpdateSpendingCategoryDto } from './dto/update-spending-category.dto';


@Controller('spending-categories')
export class SpendingCategoriesController {
  constructor(
    private readonly spendingCategoriesService: SpendingCategoriesService
  ) {}

  @Post()
  async create(@Body() spendingCategory: CreateSpendingCategoryDto) {
    return await this.spendingCategoriesService.create(spendingCategory);
  }

  @Get()
  async findAll() {
    return await this.spendingCategoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.spendingCategoriesService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatespendingCategoryDto: UpdateSpendingCategoryDto) {
    return await this.spendingCategoriesService.update(+id, updatespendingCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.spendingCategoriesService.remove(+id);
  }
}
