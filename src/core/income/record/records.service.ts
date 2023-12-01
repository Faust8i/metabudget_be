import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { SharesService } from '../../sharing/shares.service';

import { IncomeRecord }     from '../../../entities/income-record.entity';
import { IncomeItem }       from '../../../entities/income-item.entity';
import { IncomeCategory }   from '../../../entities/income-category.entity';

import { CreateIncomeRecordDto } from './dto/create-record.dto';
import { UpdateIncomeRecordDto } from './dto/update-record.dto';
import { CreateIncomeRecordResponseDto } from './dto/create-record-respone.dto';
import { FindIncomeRecordResponseDto }   from './dto/find-record-response.dto';
import { DeleteIncomeRecordResponseDto } from './dto/delete-record-response.dto';


@Injectable()
export class IncomeRecordsService {

  constructor(
    @InjectRepository(IncomeRecord) private readonly IncomeRecordRep: Repository<IncomeRecord>,
    private readonly SharesService: SharesService,
  ) {}

  /**
  * Создание записи о доходе
  * @param user_id Идентификатор пользователя
  * @param income_record Запись о доходе
  * @returns Номер созданной записи о доходе
  */
  async create(user_id: number, income_record: CreateIncomeRecordDto): Promise<CreateIncomeRecordResponseDto> {
    try {
      income_record['creator_id'] = user_id;
      const insertResult = await this.IncomeRecordRep.insert(income_record);
      return {
        income_record_id: insertResult.identifiers[0]['income_record_id'],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при создании записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение записей о доходах
  * @param user_id Идентификатор пользователя
  * @returns Массив записей о доходах
  */
  async findAll(user_id: number): Promise<FindIncomeRecordResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return {
        message: 'OK',
        incomeRecords: await this.IncomeRecordRep.createQueryBuilder('ir')
          .select(["ir.income_record_id                as income_record_id",
                  "ii.nm_income_item                   as nm_income_item",
                  "ii.income_item_id                   as income_item_id",
                  "ir.summa                            as summa",
                  "to_char(ir.income_dt, 'YYYY.MM.DD') as income_dt",
                  "ir.description                      as description"])
          .leftJoin(IncomeItem, 'ii', 'ii.income_item_id = ir.income_item_id')
          .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
          .where(`ir.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
          .andWhere('ii.income_item_id is not null')      // subject analogue 'ii.deleted_at is null'
          .andWhere('ic.income_category_id is not null')  // subject analogue 'ic.deleted_at is null'
          .orderBy({'ir.income_dt': 'DESC', 'ii.order_pos': 'ASC'})
          .getRawMany(),
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записей о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Получение записи о доходе
  * @param user_id Идентификатор пользователя
  * @param income_record_id Идентификатор записи о доходе
  * @returns Запись о доходе в массиве
  */
  async findOne(user_id: number, income_record_id: number): Promise<FindIncomeRecordResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      const record = await this.IncomeRecordRep.createQueryBuilder('ir')
        .leftJoin(IncomeItem, 'ii', 'ii.income_item_id = ir.income_item_id')
        .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
        .where({income_record_id})
        .andWhere(`ir.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('ii.income_item_id is not null')      // subject analogue 'ii.deleted_at is null'
        .andWhere('ic.income_category_id is not null')  // subject analogue 'ic.deleted_at is null'
        .getOne();
      return {
        message: 'OK',
        incomeRecords: record ? [record] : [],
      };
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
  * Удаление записи о доходе
  * @param user_id Идентификатор пользователя
  * @param income_record_id Идентификатор записи о доходе
  * @param income_record Информация для удаления записи
  * @returns Информационное сообщение
  */
  async delete(user_id: number, income_record_id: number, income_record: UpdateIncomeRecordDto): Promise<DeleteIncomeRecordResponseDto> {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      await this.IncomeRecordRep.update(
        {
          income_record_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        },
        income_record,
      );
      return { message: 'OK', };
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
