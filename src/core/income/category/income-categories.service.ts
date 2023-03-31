import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { IncomeCategory } from '../../../entities/income-category.entity';

import { CreateIncomeCategoryDto } from './dto/create-income-category.dto';
import { UpdateIncomeCategoryDto } from './dto/update-income-category.dto';

import { SharesService } from '../../sharing/shares.service';


@Injectable()
export class IncomeCategoriesService {
  
  constructor(
    @InjectRepository(IncomeCategory) private readonly incomeCategoryRep: Repository<IncomeCategory>,
    private readonly SharesService: SharesService,
  ) {}

  async create(user_id: number, income_category: CreateIncomeCategoryDto) {
    try {
      income_category['creator_id'] = user_id;
      return await this.incomeCategoryRep.insert(income_category);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании новой доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user_id: number): Promise<IncomeCategory[]> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.incomeCategoryRep.find({ 
        where: {creator_id: In( [user_id, ...sharedUserIds] )},
        order: {order_pos: "ASC"},
      });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходных категорий.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user_id: number, income_category_id: number): Promise<IncomeCategory> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.incomeCategoryRep.findOne({
        where: {
          income_category_id, 
          creator_id: In( [user_id, ...sharedUserIds] ),
        },
      });
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(user_id: number, income_category_id: number, income_category: UpdateIncomeCategoryDto) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.incomeCategoryRep.update(
        {
          income_category_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        income_category,
      );
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}