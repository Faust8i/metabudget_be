import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { IncomeCategory } from '../../entities/income-category.entity';

import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';


@Injectable()
export class IncomeCategoriesService {
  
  constructor(
    @InjectRepository(IncomeCategory) private readonly incomeCategoryRep: Repository<IncomeCategory>,
  ) {}

  async create(income_category: CreateIncomeCategoryDto) {
    try {
      return await this.incomeCategoryRep.insert(income_category);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании новой доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(): Promise<IncomeCategory[]> {
    try {
      return await this.incomeCategoryRep.find({ order: {order_pos: "ASC"} });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходных категорий.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(income_category_id: number): Promise<IncomeCategory> {
    try {
      return await this.incomeCategoryRep.findOne({where: {income_category_id}});
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(income_category_id: number, income_category: UpdateIncomeCategoryDto) {
    try {
      return await this.incomeCategoryRep.update(income_category_id, income_category);
    } catch (error) {
      error.userError = 'Произошла ошибка при обновлении доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(income_category_id: number) {
    try {
      return await this.incomeCategoryRep.delete(income_category_id);
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
