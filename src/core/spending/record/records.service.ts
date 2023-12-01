import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SharesService } from '../../sharing/shares.service';

import { SpendingRecord }   from '../../../entities/spending-record.entity';
import { SpendingItem }     from '../../../entities/spending-item.entity';
import { SpendingCategory } from '../../../entities/spending-category.entity';

import { CreateSpendingRecordDto } from './dto/create-record.dto';
import { UpdateSpendingRecordDto } from './dto/update-record.dto';
import { CreateSpendingRecordResponseDto } from './dto/create-record-respone.dto';
import { FindSpendingRecordResponseDto }   from './dto/find-record-response.dto';
import { DeleteSpendingRecordResponseDto } from './dto/delete-record-response.dto';


@Injectable()
export class SpendingRecordsService {

  constructor(
    @InjectRepository(SpendingRecord) private readonly SpendingRecordRep: Repository<SpendingRecord>,
    private readonly SharesService: SharesService,
  ) {}

  /**
  * Создание записи о расходе
  * @param user_id Идентификатор пользователя
  * @param spending_record Запись о расходе
  * @returns Номер созданной записи о расходе
  */
  async create(user_id: number, spending_record: CreateSpendingRecordDto): Promise<CreateSpendingRecordResponseDto> {
    try {
      spending_record['creator_id'] = user_id;
      const insertResult = await this.SpendingRecordRep.insert(spending_record);
      return {
        spending_record_id: insertResult.identifiers[0]['spending_record_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение записей о расходах
  * @param user_id Идентификатор пользователя
  * @returns Массив записей о расходах
  */
  async findAll(user_id: number): Promise<FindSpendingRecordResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return {
        message: 'OK',
        spendingRecords: await this.SpendingRecordRep.createQueryBuilder('sr')
          .select(["sr.spending_record_id                 as spending_record_id",
                  "si.nm_spending_item                   as nm_spending_item",
                  "si.spending_item_id                   as spending_item_id",
                  "sr.summa                              as summa",
                  "to_char(sr.spending_dt, 'YYYY.MM.DD') as spending_dt",
                  "sr.description                        as description"])
          .leftJoin(SpendingItem, 'si', 'si.spending_item_id = sr.spending_item_id')
          .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
          .where(`sr.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
          .andWhere('si.spending_item_id is not null')      // subject analogue 'ii.deleted_at is null'
          .andWhere('sc.spending_category_id is not null')  // subject analogue 'ic.deleted_at is null'
          .orderBy({'sr.spending_dt': 'DESC', 'si.order_pos': 'ASC'})
          .getRawMany(),
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записей о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение записи о расходах
  * @param user_id Идентификатор пользователя
  * @param spending_record_id Идентификатор записи о расходе
  * @returns Запись о расходе в массиве
  */
  async findOne(user_id: number, spending_record_id: number): Promise<FindSpendingRecordResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      const record = await this.SpendingRecordRep.createQueryBuilder('sr')
        .leftJoin(SpendingItem, 'si', 'si.spending_item_id = sr.spending_item_id')
        .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
        .where({spending_record_id})
        .andWhere(`sr.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('si.spending_item_id is not null')      // subject analogue 'si.deleted_at is null'
        .andWhere('sc.spending_category_id is not null')  // subject analogue 'sc.deleted_at is null'
        .getOne();
      return {
        message: 'OK',
        spendingRecords: record ? [record] : [],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление записи о расходе
  * @param user_id Идентификатор пользователя
  * @param spending_record_id Идентификатор записи о расходе
  * @param spending_record Информация для удаления записи
  * @returns Информационное сообщение
  */
  async delete(user_id: number, spending_record_id: number, spending_record: UpdateSpendingRecordDto): Promise<DeleteSpendingRecordResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      await this.SpendingRecordRep.update(
        {
          spending_record_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        },
        spending_record
      );
      return { message: 'OK', };
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
