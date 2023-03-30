import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { SpendingItemsService } from './spending-items.service';

import { CreateSpendingItemDto } from './dto/create-spending-item.dto';
import { UpdateSpendingItemDto } from './dto/update-spending-item.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-items')
export class SpendingItemsController {
  constructor(
    private readonly spendingItemsService: SpendingItemsService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id: number,
    @Body()    item:    CreateSpendingItemDto,
    ) {
      return await this.spendingItemsService.create(user_id, item);
  }

  @Get()
  async findAll(
    @UserJWT() user_id: number,
    ) {
      return await this.spendingItemsService.findAll(user_id);
  }

  @Get(':id')
  async findOne(
    @UserJWT()   user_id: number,
    @Param('id') item_id: string,
    ) {
      return await this.spendingItemsService.findOne(user_id, +item_id);
  }

  @Delete(':id')
  async delete(
    @UserJWT()   user_id: number,
    @Param('id') item_id: string,
    @Body()      item:    UpdateSpendingItemDto,
    ) {
      return await this.spendingItemsService.delete(user_id, +item_id, item);
  }

}