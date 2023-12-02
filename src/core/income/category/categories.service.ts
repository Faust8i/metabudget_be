import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SharesService } from '../../sharing/shares.service';

import { IncomeCategory } from '../../../entities/income-category.entity';

import { CreateIncomeCategoryDto }  from './dto/create-category.dto';
import { UpdateIncomeCategoryDto }  from './dto/update-category.dto';
import { CreateIncomeCategoryResponseDto } from './dto/create-category-respone.dto';
import { FindIncomeCategoryResponseDto }   from './dto/find-category-response.dto';
import { DeleteIncomeCategoryResponseDto } from './dto/delete-category-response.dto';


@Injectable()
export class IncomeCategoriesService {
  
  constructor(
    @InjectRepository(IncomeCategory) private readonly incomeCategoryRep: Repository<IncomeCategory>,
    private readonly SharesService: SharesService,
  ) {}

  /**
  * Создание доходной категории
  * @param user_id Идентификатор пользователя
  * @param income_category Информация о создаваемой доходной категории
  * @returns Номер созданной доходной категории
  */
  async create(user_id: number, income_category: CreateIncomeCategoryDto): Promise<CreateIncomeCategoryResponseDto> {
    try {
      income_category['creator_id'] = user_id;
      const insertResult = await this.incomeCategoryRep.insert(income_category);
      return {
        income_category_id: insertResult.identifiers[0]['income_category_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании новой доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение доступных доходных категорий
  * @param user_id Идентификатор пользователя
  * @returns Массив доходных категорий
  */
  async findAll(user_id: number): Promise<FindIncomeCategoryResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return {
        message: 'OK',
        incomeCategories: await this.incomeCategoryRep.find({ 
          where: {creator_id: In( [user_id, ...sharedUserIds] )},
          order: {order_pos: "ASC"},
        }),
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходных категорий.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение доступных доходных категорий
  * @param user_id Идентификатор пользователя
  * @param income_category_id Идентификатор категории
  * @returns Доходная категория в массиве
  */
  async findOne(user_id: number, income_category_id: number): Promise<FindIncomeCategoryResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      const category = await this.incomeCategoryRep.findOne({
        where: {
          income_category_id, 
          creator_id: In( [user_id, ...sharedUserIds] ),
        },
      });
      return {
        message: 'OK',
        incomeCategories: category ? [category] : [],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление доходной категории
  * @param user_id Идентификатор пользователя
  * @param income_category_id Идентификатор категории
  * @param income_category Информация для удаления категории
  * @returns Информационное сообщение
  */
  async delete(user_id: number, income_category_id: number, income_category: UpdateIncomeCategoryDto): Promise<DeleteIncomeCategoryResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      await this.incomeCategoryRep.update(
        {
          income_category_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        income_category,
      );
      return { message: 'OK', };
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении доходной категории.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}