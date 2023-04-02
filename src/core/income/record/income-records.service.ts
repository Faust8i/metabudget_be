import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository }   from 'typeorm';

import { IncomeRecord }     from '../../../entities/income-record.entity';
import { IncomeItem }       from '../../../entities/income-item.entity';
import { IncomeCategory }   from '../../../entities/income-category.entity';

import { CreateIncomeRecordDto } from './dto/create-income-record.dto';
import { UpdateIncomeRecordDto } from './dto/update-income-record.dto';

import { SharesService } from '../../sharing/shares.service';


@Injectable()
export class IncomeRecordsService {

  constructor(
    @InjectRepository(IncomeRecord) private readonly IncomeRecordRep: Repository<IncomeRecord>,
    private readonly SharesService: SharesService,
  ) {}

  async create(user_id: number, income_record: CreateIncomeRecordDto) {
    try {
      income_record['creator_id'] = user_id;
      return await this.IncomeRecordRep.insert(income_record);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(user_id: number) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.IncomeRecordRep.createQueryBuilder('ir')
       .select(["ir.income_record_id                 as income_record_id",
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
        .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записей о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(user_id: number, income_record_id: number) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.IncomeRecordRep.createQueryBuilder('ir')
        .leftJoin(IncomeItem, 'ii', 'ii.income_item_id = ir.income_item_id')
        .leftJoin(IncomeCategory, 'ic', 'ic.income_category_id = ii.income_category_id')
        .where({income_record_id})
        .andWhere(`ir.creator_id in (:...user_ids)`, { user_ids: [user_id, ...sharedUserIds] })
        .andWhere('ii.income_item_id is not null')      // subject analogue 'ii.deleted_at is null'
        .andWhere('ic.income_category_id is not null')  // subject analogue 'ic.deleted_at is null'
        .getOne()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delete(user_id: number, income_record_id: number, income_record: UpdateIncomeRecordDto) {
    try {
      const sharedUserIds = await this.SharesService.getSharedUserIds(user_id);
      return await this.IncomeRecordRep.update(
        {
          income_record_id,
          creator_id: In( [user_id, ...sharedUserIds] ),
        },
        income_record,
      );
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
}
