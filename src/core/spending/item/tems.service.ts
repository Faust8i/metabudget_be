import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SharesService } from '../../sharing/shares.service';

import { SpendingItem }       from '../../../entities/spending-item.entity';
import { SpendingCategory }   from '../../../entities/spending-category.entity';
import { SpendingItemMarker } from '../../../entities/spending-item-marker.entity';

import { CreateSpendingItemDto } from './dto/create-item.dto';
import { UpdateSpendingItemDto } from './dto/update-item.dto';
import { CreateSpendingItemResponseDto } from './dto/create-item-respone.dto';
import { FindSpendingItemResponseDto }   from './dto/find-item-response.dto';
import { DeleteSpendingItemResponseDto } from './dto/delete-item-response.dto';


@Injectable()
export class SpendingItemsService {

  constructor(
    @InjectRepository(SpendingItem) private readonly SpendingItemRep: Repository<SpendingItem>,
    private readonly SharesService: SharesService,
  ) {}

  /**
  * Создание расходной статьи
  * @param user_id Идентификатор пользователя
  * @param spending_item Расходная статья
  * @returns Номер созданной расходной статьи
  */
  async create(user_id: number, spending_item: CreateSpendingItemDto): Promise<CreateSpendingItemResponseDto> {
    try {
      spending_item['creator_id'] = user_id;
      const insertResult = await this.SpendingItemRep.insert(spending_item);
      return {
        spending_item_id: insertResult.identifiers[0]['spending_item_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании доходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение доступных расходных статей
  * @param user_id Идентификатор пользователя
  * @returns Массив расходных статей
  */
  async findAll(user_id: number): Promise<FindSpendingItemResponseDto>  {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return {
        message: 'OK',
        spendingItems: await this.SpendingItemRep.createQueryBuilder('si')
          .select(['si.spending_item_id    as spending_item_id',
                  'sc.nm_spending_category as nm_spending_category',
                  'si.nm_spending_item     as nm_spending_item', 
                  'si.order_pos            as order_pos',
                  'sm.marker_value         as user_marker'])
          .leftJoin(SpendingCategory,   'sc', 'sc.spending_category_id = si.spending_category_id')
          .leftJoin(SpendingItemMarker, 'sm', 'sm.spending_item_id     = si.spending_item_id ' +
            'and sm.deleted_at is null and sm.creator_id = :user_id', {user_id})
          .where(`si.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
          .andWhere('sc.spending_category_id is not null')  // subject analogue 'sc.deleted_at is null'
          .orderBy({'sc.order_pos': 'ASC', 'si.order_pos': 'ASC'})
          .getRawMany(),
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходных статей.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение расходной статьи
  * @param user_id Идентификатор пользователя
  * @param spending_item_id Идентификатор статьи
  * @returns Расходная статья в массиве
  */
  async findOne(user_id: number, spending_item_id: number): Promise<FindSpendingItemResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      const item = await this.SpendingItemRep.createQueryBuilder('si')
        .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
        .where({spending_item_id})
        .andWhere(`si.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('sc.spending_category_id is not null')
        .getOne();
      return {
        message: 'OK',
        spendingItems: item ? [item] : [],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление расходной статьи
  * @param user_id Идентификатор пользователя
  * @param spending_item_id Идентификатор статьи
  * @param spending_item Информация для удаления статьи
  * @returns Информационное сообщение
  */
  async delete(user_id: number, spending_item_id: number, spending_item: UpdateSpendingItemDto): Promise<DeleteSpendingItemResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      await this.SpendingItemRep.update(
        {
          spending_item_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        }, 
        spending_item,
      );
      return { message: 'OK', };
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении расходной статьи.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
