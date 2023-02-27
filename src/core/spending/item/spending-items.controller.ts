import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SpendingItemsService } from './spending-items.service';

import { CreateSpendingItemDto } from './dto/create-spending-item.dto';
import { UpdateSpendingItemDto } from './dto/update-spending-item.dto';


@Controller('spending-items')
export class SpendingItemsController {
  constructor(
    private readonly spendingItemsService: SpendingItemsService
  ) {}

  @Post()
  async create(@Body() createSpendingItemDto: CreateSpendingItemDto) {
    return await this.spendingItemsService.create(createSpendingItemDto);
  }

  @Get()
  async findAll() {
    return await this.spendingItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.spendingItemsService.findOne(+id);
  }

  @Patch(':id')
  async patch(@Param('id') id: string, @Body() updateSpendingItemDto: UpdateSpendingItemDto) {
    return await this.spendingItemsService.patch(+id, updateSpendingItemDto);
  }

}
