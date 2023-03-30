import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { IncomeItemsService } from './income-items.service';

import { CreateIncomeItemDto } from './dto/create-income-item.dto';
import { UpdateIncomeItemDto } from './dto/update-income-item.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-items')
export class IncomeItemsController {
  constructor(
    private readonly incomeItemsService: IncomeItemsService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id: number,
    @Body()    item:    CreateIncomeItemDto,
    ) {
      return await this.incomeItemsService.create(user_id, item);
  }

  @Get()
  async findAll(
    @UserJWT() user_id: number,
    ) {
      return await this.incomeItemsService.findAll(user_id);
  }

  @Get(':id')
  async findOne(
    @UserJWT()   user_id: number,
    @Param('id') item_id: string,
    ) {
      return await this.incomeItemsService.findOne(user_id, +item_id);
  }

  @Delete(':id')
  async delete(
    @UserJWT()   user_id: number,
    @Param('id') item_id: string, 
    @Body()      item:    UpdateIncomeItemDto,
    ) {
      return await this.incomeItemsService.delete(user_id, +item_id, item);
  }

}
