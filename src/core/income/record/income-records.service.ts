import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { IncomeRecord } from '../../entities/income-record.entity';
import { IncomeItem }   from '../../entities/income-item.entity';

import { CreateIncomeRecordDto } from './dto/create-income-record.dto';
import { UpdateIncomeRecordDto } from './dto/update-income-record.dto';


@Injectable()
export class IncomeRecordsService {

  constructor(
    @InjectRepository(IncomeRecord) private readonly IncomeRecordRep: Repository<IncomeRecord>,
  ) {}

  async create(createIncomeRecordDto: CreateIncomeRecordDto) {
    try {
      return await this.IncomeRecordRep.insert(createIncomeRecordDto);
    } catch (error) {
      error.userError = 'Произошла ошибка при создании записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await this.IncomeRecordRep.createQueryBuilder('ir')
       .select(["ir.income_record_id                 as income_record_id",
                "ii.nm_income_item                   as nm_income_item",
                "ii.income_item_id                   as income_item_id",
                "ir.summa                            as summa",
                "to_char(ir.income_dt, 'YYYY.MM.DD') as income_dt",
                "ir.description                      as description"])
        .leftJoin(IncomeItem, 'ii', 'ii.income_item_id = ir.income_item_id')
        .orderBy({'ir.income_dt': 'ASC', 'ii.order_pos': 'ASC'})
        .getRawMany()
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записей о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(income_record_id: number) {
    try {
      return await this.IncomeRecordRep.findOne({where: {income_record_id}});
    } catch (error) {
      error.userError = 'Произошла ошибка при поиске записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(income_record_id: number, income_record: UpdateIncomeRecordDto) {
    try {
      return await this.IncomeRecordRep.update(income_record_id, income_record);
    } catch (error) {
      error.userError = 'Произошла ошибка при обновлении записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(income_record_id: number) {
    try {
      return await this.IncomeRecordRep.delete(income_record_id);
    } catch (error) {
      error.userError = 'Произошла ошибка при удалении записи о доходах.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
