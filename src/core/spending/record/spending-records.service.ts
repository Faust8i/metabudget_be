import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { SpendingRecord } from '../../entities/spending-record.entity';
import { SpendingItem }   from '../../entities/spending-item.entity';

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
       .select(['sr.spending_record_id as spending_record_id',
                'si.nm_spending_item   as nm_spending_item',
                'si.spending_item_id   as spending_item_id',
                'sr.summa              as summa',
                'sr.description        as description'])
        .leftJoin(SpendingItem, 'si', 'si.spending_item_id = sr.spending_item_id')
        .orderBy({'sr.spending_dt': 'ASC', 'si.order_pos': 'ASC'})
        .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записей о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(spending_record_id: number) {
    try {
      return await this.SpendingRecordRep.findOne({where: {spending_record_id}});
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(spending_record_id: number, spending_record: UpdateSpendingRecordDto) {
    try {
      return await this.SpendingRecordRep.update(spending_record_id, spending_record);
    } catch (error) {
      error.userError = 'Произошла ошибка при обновлении записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(spending_record_id: number) {
    try {
      return await this.SpendingRecordRep.delete(spending_record_id);
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении записи о расходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
