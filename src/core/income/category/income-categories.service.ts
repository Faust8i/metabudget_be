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
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }
  }

  async findAll(): Promise<IncomeCategory[]> {
    return await this.incomeCategoryRep.find({ order: {order_pos: "ASC"} });
  }

  async findOne(income_category_id: number): Promise<IncomeCategory> {
    return await this.incomeCategoryRep.findOne({where: {income_category_id}});
  }

  async update(income_category_id: number, income_category: UpdateIncomeCategoryDto) {
    return await this.incomeCategoryRep.update(income_category_id, income_category);
  }

  async remove(income_category_id: number) {
    return await this.incomeCategoryRep.delete(income_category_id);
  }

}
