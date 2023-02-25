import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { SpendingItem }     from '../../entities/spending-item.entity';
import { SpendingCategory } from '../../entities/spending-category.entity';

import { CreateSpendingItemDto } from './dto/create-spending-item.dto';
import { UpdateSpendingItemDto } from './dto/update-spending-item.dto';


@Injectable()
export class SpendingItemsService {

  constructor(
    @InjectRepository(SpendingItem) private readonly SpendingItemRep: Repository<SpendingItem>,
  ) {}

  async create(spending_item: CreateSpendingItemDto) {
    try {
      return await this.SpendingItemRep.insert(spending_item);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.SpendingItemRep.createQueryBuilder('si')
      .select(['si.spending_item_id     as spending_item_id',
               'sc.nm_spending_category as nm_spending_category',
               'si.nm_spending_item     as nm_spending_item', 
               'si.order_pos            as order_pos'])
      .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
      .orderBy({'sc.order_pos': 'ASC', 'si.order_pos': 'ASC'})
      .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходных статей.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(spending_item_id: number) {
    try {
      return await this.SpendingItemRep.findOne({where: {spending_item_id}});
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(spending_item_id: number, spending_item: UpdateSpendingItemDto) {
    try {
      return await this.SpendingItemRep.update(spending_item_id, spending_item);
    } catch (error) {
      error.userError = 'Произошла ошибка при обновлении расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(spending_item_id: number) {
    try {
      return await this.SpendingItemRep.delete(spending_item_id);
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
