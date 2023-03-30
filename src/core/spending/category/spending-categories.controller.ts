import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { SpendingCategoriesService } from './spending-categories.service';

import { CreateSpendingCategoryDto } from './dto/create-spending-category.dto';
import { UpdateSpendingCategoryDto } from './dto/update-spending-category.dto';


@UseGuards(JwtAuthGuard)
@Controller('spending-categories')
export class SpendingCategoriesController {
  constructor(
    private readonly spendingCategoriesService: SpendingCategoriesService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id:  number,
    @Body()    category: CreateSpendingCategoryDto,
    ) {
      return await this.spendingCategoriesService.create(user_id, category);
  }

  @Get()
  async findAll(
    @UserJWT() user_id: number,
    ) {
      return await this.spendingCategoriesService.findAll(user_id);
  }

  @Get(':id')
  async findOne(
    @UserJWT()   user_id:     number,
    @Param('id') category_id: string,
    ) {
      return await this.spendingCategoriesService.findOne(user_id, +category_id);
  }

  @Delete(':id')
  async delete(
    @UserJWT()   user_id:     number,
    @Param('id') category_id: string,
    @Body()      category:    UpdateSpendingCategoryDto,
    ) {
      return await this.spendingCategoriesService.delete(user_id, +category_id, category);
  }

}