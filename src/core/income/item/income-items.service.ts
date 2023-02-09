import { Injectable }       from '@nestjs/common';
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

  async create(incomeItem: CreateIncomeItemDto) {
    return await this.IncomeItemRep.insert(incomeItem);
  }

  async findAll() {
    return await this.IncomeItemRep.createQueryBuilder('ii')
      .select(['ii.income_item_id     as income_item_id',
               'ic.nm_income_category as nm_income_category',
               'ii.nm_income_item     as nm_income_item', 
               'ii.order_pos          as order_pos'])
      .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
      .orderBy({'ic.order_pos': 'ASC', 'ii.order_pos': 'ASC'})
      .getRawMany()
  }

  async findOne(income_item_id: number) {
    return await this.IncomeItemRep.findOne({where: {income_item_id}});
  }

  async update(income_item_id: number, incomeItem: UpdateIncomeItemDto) {
    return await this.IncomeItemRep.update(income_item_id, incomeItem);
  }

  async remove(income_item_id: number) {
    return await this.IncomeItemRep.delete(income_item_id);
  }

}
