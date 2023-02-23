import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { SpendingCategory } from '../../entities/spending-category.entity';

import { CreateSpendingCategoryDto } from './dto/create-spending-category.dto';
import { UpdateSpendingCategoryDto } from './dto/update-spending-category.dto';


@Injectable()
export class SpendingCategoriesService {
  
  constructor(
    @InjectRepository(SpendingCategory) private readonly spendingCategoryRep: Repository<SpendingCategory>,
  ) {}

  async create(spending_category: CreateSpendingCategoryDto) {
    try {
      return await this.spendingCategoryRep.insert(spending_category);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании новой расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<SpendingCategory[]> {
    try {
      return await this.spendingCategoryRep.find({ order: {order_pos: "ASC"} });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходных категорий.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(spending_category_id: number): Promise<SpendingCategory> {
    try {
      return await this.spendingCategoryRep.findOne({where: {spending_category_id}});
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(spending_category_id: number, spending_category: UpdateSpendingCategoryDto) {
    try {
      return await this.spendingCategoryRep.update(spending_category_id, spending_category);
    } catch (error) {
      error.userError = 'Произошла ошибка при обновлении расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(spending_category_id: number) {
    try {
      return await this.spendingCategoryRep.delete(spending_category_id);
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
