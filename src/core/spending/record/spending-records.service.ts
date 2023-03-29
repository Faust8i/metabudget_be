import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { SpendingRecord }   from '../../../entities/spending-record.entity';
import { SpendingItem }     from '../../../entities/spending-item.entity';
import { SpendingCategory } from '../../../entities/spending-category.entity';

import { CreateSpendingRecordDto } from './dto/create-spending-record.dto';
import { UpdateSpendingRecordDto } from './dto/update-spending-record.dto';


@Injectable()
export class SpendingRecordsService {

  constructor(
    @InjectRepository(SpendingRecord) private readonly SpendingRecordRep: Repository<SpendingRecord>,
  ) {}

  async create(createSpendingRecordDto: CreateSpendingRecordDto) {
    try {
      return await this.SpendingRecordRep.insert(createSpendingRecordDto);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.SpendingRecordRep.createQueryBuilder('sr')
       .select(["sr.spending_record_id                 as spending_record_id",
                "si.nm_spending_item                   as nm_spending_item",
                "si.spending_item_id                   as spending_item_id",
                "sr.summa                              as summa",
                "to_char(sr.spending_dt, 'YYYY.MM.DD') as spending_dt",
                "sr.description                        as description"])
        .leftJoin(SpendingItem, 'si', 'si.spending_item_id = sr.spending_item_id')
        .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
        .where('si.spending_item_id is not null')         // subject analogue 'ii.deleted_at is null'
        .andWhere('sc.spending_category_id is not null')  // subject analogue 'ic.deleted_at is null'
        .orderBy({'sr.spending_dt': 'ASC', 'si.order_pos': 'ASC'})
        .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записей о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(spending_record_id: number) {
    try {
      return await this.SpendingRecordRep.createQueryBuilder('sr')
        .leftJoin(SpendingItem, 'si', 'si.spending_item_id = sr.spending_item_id')
        .leftJoin(SpendingCategory, 'sc', 'sc.spending_category_id = si.spending_category_id')
        .where({spending_record_id})
        .andWhere('si.spending_item_id is not null')      // subject analogue 'si.deleted_at is null'
        .andWhere('sc.spending_category_id is not null')  // subject analogue 'sc.deleted_at is null'
        .getOne()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(spending_record_id: number, spending_record: UpdateSpendingRecordDto) {
    try {
      return await this.SpendingRecordRep.update(spending_record_id, spending_record);
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
