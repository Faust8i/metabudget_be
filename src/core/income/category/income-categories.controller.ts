import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { UserJWT }      from '../../../decorator/user-jwt.decorator';

import { IncomeCategoriesService } from './income-categories.service';

import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';


@UseGuards(JwtAuthGuard)
@Controller('income-categories')
export class IncomeCategoriesController {
  constructor(
    private readonly incomeCategoriesService: IncomeCategoriesService
  ) {}

  @Post()
  async create(
    @UserJWT() user_id:  number,
    @Body()    category: CreateIncomeCategoryDto,
    ) {
      return await this.incomeCategoriesService.create(user_id, category);
  }

  @Get()
  async findAll(
    @UserJWT() user_id: number,
    ) {
      return await this.incomeCategoriesService.findAll(user_id);
  }

  @Get(':id')
  async findOne(
    @UserJWT()   user_id:     number,
    @Param('id') category_id: string,
    ) {
      return await this.incomeCategoriesService.findOne(user_id, +category_id);
  }

  @Delete(':id')
  async delete(
    @UserJWT()   user_id:     number,
    @Param('id') category_id: string,
    @Body()      category:    UpdateIncomeCategoryDto,
    ) {
      return await this.incomeCategoriesService.delete(user_id, +category_id, category);
  }

}