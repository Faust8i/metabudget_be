import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { IncomeItem }     from '../../../entities/income-item.entity';
import { IncomeCategory } from '../../../entities/income-category.entity';

import { CreateIncomeItemDto } from './dto/create-income-item.dto';
import { UpdateIncomeItemDto } from './dto/update-income-item.dto';

import { SharesService } from '../../sharing/shares.service';


@Injectable()
export class IncomeItemsService {

  constructor(
    @InjectRepository(IncomeItem) private readonly IncomeItemRep: Repository<IncomeItem>,
    private readonly SharesService: SharesService,
  ) {}

  async create(user_id: number, income_item: CreateIncomeItemDto) {
    try {
      income_item['creator_id'] = user_id;
      return await this.IncomeItemRep.insert(income_item);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user_id: number) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.IncomeItemRep.createQueryBuilder('ii')
        .select(['ii.income_item_id     as income_item_id',
                'ic.nm_income_category as nm_income_category',
                'ii.nm_income_item     as nm_income_item', 
                'ii.order_pos          as order_pos'])
        .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
        .where(`ii.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('ic.income_category_id is not null')  // subject analogue 'ic.deleted_at is null'
        .orderBy({'ic.order_pos': 'ASC', 'ii.order_pos': 'ASC'})
        .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходных статей.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user_id: number, income_item_id: number) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.IncomeItemRep.createQueryBuilder('ii')
        .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
        .where({income_item_id})
        .andWhere(`ii.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('ic.income_category_id is not null')
        .getOne()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(user_id: number, income_item_id: number, income_item: UpdateIncomeItemDto) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.IncomeItemRep.update(
        {
          income_item_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        income_item,
      );
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
