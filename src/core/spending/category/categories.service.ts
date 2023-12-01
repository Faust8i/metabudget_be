import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SharesService } from '../../sharing/shares.service';

import { SpendingCategory } from '../../../entities/spending-category.entity';

import { CreateSpendingCategoryDto } from './dto/create-category.dto';
import { UpdateSpendingCategoryDto } from './dto/update-category.dto';
import { CreateSpendingCategoryResponseDto } from './dto/create-category-respone.dto';
import { FindSpendingCategoryResponseDto }   from './dto/find-category-response.dto';
import { DeleteSpendingCategoryResponseDto } from './dto/delete-category-response.dto';


@Injectable()
export class SpendingCategoriesService {
  
  constructor(
    @InjectRepository(SpendingCategory) private readonly spendingCategoryRep: Repository<SpendingCategory>,
    private readonly SharesService: SharesService,
  ) {}

  /**
  * Создание расходной категории
  * @param user_id Идентификатор пользователя
  * @param spending_category Информация о создаваемой расходной категории
  * @returns Номер созданной расходной категории
  */
  async create(user_id: number, spending_category: CreateSpendingCategoryDto): Promise<CreateSpendingCategoryResponseDto> {
    try {
      spending_category['creator_id'] = user_id;
      const insertResult = await this.spendingCategoryRep.insert(spending_category);
      return {
        spending_category_id: insertResult.identifiers[0]['spending_category_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании новой расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение расходных категорий
  * @param user_id Идентификатор пользователя
  * @returns Массив расходных категорий
  */
  async findAll(user_id: number): Promise<FindSpendingCategoryResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return {
        message: 'OK',
        spendingCategories: await this.spendingCategoryRep.find({ 
          where: {creator_id: In( [user_id, ...sharedUserIds] )},
          order: {order_pos: "ASC"},
        }),
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходных категорий.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение расходной категории
  * @param user_id Идентификатор пользователя
  * @param spending_category_id Идентификатор категории
  * @returns Расходная категория
  */
  async findOne(user_id: number, spending_category_id: number): Promise<FindSpendingCategoryResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      const category = await this.spendingCategoryRep.findOne({
        where: {
          spending_category_id, 
          creator_id: In( [user_id, ...sharedUserIds] ),
        },
      });
      return {
        message: 'OK',
        spendingCategories: category ? [category] : [],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление расходной категории
  * @param user_id Идентификатор пользователя
  * @param spending_category_id Идентификатор категории
  * @param spending_category Информация для удаления категории
  * @returns Информационное сообщение
  */
  async delete(user_id: number, spending_category_id: number, spending_category: UpdateSpendingCategoryDto): Promise<DeleteSpendingCategoryResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      await this.spendingCategoryRep.update(
        {
          spending_category_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        spending_category,
      );
      return { message: 'OK', };
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении расходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}