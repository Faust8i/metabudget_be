import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SharesService } from '../../sharing/shares.service';

import { IncomeItem }       from '../../../entities/income-item.entity';
import { IncomeCategory }   from '../../../entities/income-category.entity';
import { IncomeItemMarker } from '../../../entities/income-item-marker.entity';

import { CreateIncomeItemDto } from './dto/create-item.dto';
import { UpdateIncomeItemDto } from './dto/update-item.dto';
import { CreateIncomeItemResponseDto } from './dto/create-item-respone.dto';
import { FindIncomeItemResponseDto }   from './dto/find-item-response.dto';
import { DeleteIncomeItemResponseDto } from './dto/delete-item-response.dto';


@Injectable()
export class IncomeItemsService {

  constructor(
    @InjectRepository(IncomeItem) private readonly IncomeItemRep: Repository<IncomeItem>,
    private readonly SharesService: SharesService,
  ) {}

  /**
  * Создание доходной статьи
  * @param user_id Идентификатор пользователя
  * @param income_item Доходная статья
  * @returns Номер созданной доходной статьи
  */
  async create(user_id: number, income_item: CreateIncomeItemDto): Promise<CreateIncomeItemResponseDto> {
    try {
      income_item['creator_id'] = user_id;
      const insertResult = await this.IncomeItemRep.insert(income_item);
      return {
        income_item_id: insertResult.identifiers[0]['income_item_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение доступных доходных статей
  * @param user_id Идентификатор пользователя
  * @returns Массив доходных статей
  */
  async findAll(user_id: number): Promise<FindIncomeItemResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return {
        message: 'OK',
        incomeItems: await this.IncomeItemRep.createQueryBuilder('ii')
          .select(['ii.income_item_id    as income_item_id',
                  'ic.nm_income_category as nm_income_category',
                  'ii.nm_income_item     as nm_income_item', 
                  'ii.order_pos          as order_pos',
                  'im.marker_value       as user_marker'])
          .leftJoin(IncomeCategory,   'ic', 'ic.income_category_id = ii.income_category_id')
          .leftJoin(IncomeItemMarker, 'im', 'im.income_item_id     = ii.income_item_id ' +
            'and im.deleted_at is null and im.creator_id = :user_id', {user_id})
          .where(`ii.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
          .andWhere('ic.income_category_id is not null')  // subject analogue 'ic.deleted_at is null'
          .orderBy({'ic.order_pos': 'ASC', 'ii.order_pos': 'ASC'})
          .getRawMany(),
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходных статей.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение доходной статьи
  * @param user_id Идентификатор пользователя
  * @param income_item_id Идентификатор статьи
  * @returns Доходная статья в массиве
  */
  async findOne(user_id: number, income_item_id: number): Promise<FindIncomeItemResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      const item = await this.IncomeItemRep.createQueryBuilder('ii')
        .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
        .where({income_item_id})
        .andWhere(`ii.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('ic.income_category_id is not null')
        .getOne();
      return {
        message: 'OK',
        incomeItems: item ? [item] : [],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление доходной статьи
  * @param user_id Идентификатор пользователя
  * @param income_item_id Идентификатор статьи
  * @param income_item Информация для удаления статьи
  * @returns Информационное сообщение
  */
  async delete(user_id: number, income_item_id: number, income_item: UpdateIncomeItemDto): Promise<DeleteIncomeItemResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      await this.IncomeItemRep.update(
        {
          income_item_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        income_item,
      );
      return { message: 'OK', };
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
