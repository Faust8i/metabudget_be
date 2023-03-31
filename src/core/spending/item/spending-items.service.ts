import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SpendingItem }     from '../../../entities/spending-item.entity';
import { SpendingCategory } from '../../../entities/spending-category.entity';

import { CreateSpendingItemDto } from './dto/create-spending-item.dto';
import { UpdateSpendingItemDto } from './dto/update-spending-item.dto';

import { SharesService } from '../../sharing/shares.service';


@Injectable()
export class SpendingItemsService {

  constructor(
    @InjectRepository(SpendingItem) private readonly SpendingItemRep: Repository<SpendingItem>,
    private readonly SharesService: SharesService,
  ) {}

  async create(user_id: number, spending_item: CreateSpendingItemDto) {
    try {
      spending_item['creator_id'] = user_id;
      return await this.SpendingItemRep.insert(spending_item);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user_id: number) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.SpendingItemRep.createQueryBuilder('si')
      .select(['si.spending_item_id     as spending_item_id',
               'sc.nm_spending_category as nm_spending_category',
               'si.nm_spending_item     as nm_spending_item', 
               'si.order_pos            as order_pos'])
      .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
      .where(`si.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
      .andWhere('sc.spending_category_id is not null')  // subject analogue 'sc.deleted_at is null'
      .orderBy({'sc.order_pos': 'ASC', 'si.order_pos': 'ASC'})
      .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходных статей.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user_id: number, spending_item_id: number) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.SpendingItemRep.createQueryBuilder('si')
        .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
        .where({spending_item_id})
        .andWhere(`si.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('sc.spending_category_id is not null')
        .getOne()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(user_id: number, spending_item_id: number, spending_item: UpdateSpendingItemDto) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.SpendingItemRep.update(
        {
          spending_item_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        spending_item,
      );
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
