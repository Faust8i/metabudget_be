import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SpendingCategory } from '../../../entities/spending-category.entity';

import { CreateSpendingCategoryDto } from './dto/create-spending-category.dto';
import { UpdateSpendingCategoryDto } from './dto/update-spending-category.dto';

import { SharesService } from '../../sharing/shares.service';


@Injectable()
export class SpendingCategoriesService {
  
  constructor(
    @InjectRepository(SpendingCategory) private readonly spendingCategoryRep: Repository<SpendingCategory>,
    private readonly SharesService: SharesService,
  ) {}

  async create(user_id: number, spending_category: CreateSpendingCategoryDto) {
    try {
      spending_category['creator_id'] = user_id;
      return await this.spendingCategoryRep.insert(spending_category);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании новой расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user_id: number): Promise<SpendingCategory[]> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.spendingCategoryRep.find({ 
        where: {creator_id: In( [user_id, ...sharedUserIds] )},
        order: {order_pos: "ASC"},
      });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходных категорий.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user_id: number, spending_category_id: number): Promise<SpendingCategory> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.spendingCategoryRep.findOne({
        where: {
          spending_category_id, 
          creator_id: In( [user_id, ...sharedUserIds] ),
        },
      });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(user_id: number, spending_category_id: number, spending_category: UpdateSpendingCategoryDto) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.spendingCategoryRep.update(
        {
          spending_category_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        spending_category,
      );
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}