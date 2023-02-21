import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { IncomeItem }     from '../../entities/income-item.entity';
import { IncomeCategory } from '../../entities/income-category.entity';

import { CreateIncomeItemDto } from './dto/create-income-item.dto';
import { UpdateIncomeItemDto } from './dto/update-income-item.dto';


@Injectable()
export class IncomeItemsService {

  constructor(
    @InjectRepository(IncomeItem) private readonly IncomeItemRep: Repository<IncomeItem>,
  ) {}

  async create(income_item: CreateIncomeItemDto) {
    try {
      return await this.IncomeItemRep.insert(income_item);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.IncomeItemRep.createQueryBuilder('ii')
      .select(['ii.income_item_id     as income_item_id',
               'ic.nm_income_category as nm_income_category',
               'ii.nm_income_item     as nm_income_item', 
               'ii.order_pos          as order_pos'])
      .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
      .orderBy({'ic.order_pos': 'ASC', 'ii.order_pos': 'ASC'})
      .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходных статей.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(income_item_id: number) {
    try {
      return await this.IncomeItemRep.findOne({where: {income_item_id}});
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(income_item_id: number, income_item: UpdateIncomeItemDto) {
    try {
      return await this.IncomeItemRep.update(income_item_id, income_item);
    } catch (error) {
      error.userError = 'Произошла ошибка при обновлении доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(income_item_id: number) {
    try {
      return await this.IncomeItemRep.delete(income_item_id);
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
