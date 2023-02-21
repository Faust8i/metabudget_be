import { Injectable } from '@nestjs/common';
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
    return await this.IncomeRecordRep.insert(createIncomeRecordDto);
  }

  async findAll() {
    return await this.IncomeRecordRep.createQueryBuilder('ir')
      .select(['ir.income_record_id as income_record_id',
               'ii.nm_income_item   as nm_income_item',
               'ii.income_item_id   as income_item_id',
               'ir.summa            as summa',
               'ir.description      as description'])
      .leftJoin(IncomeItem, 'ii', 'ii.income_item_id = ir.income_item_id')
      .orderBy({'ir.income_dt': 'ASC', 'ii.order_pos': 'ASC'})
      .getRawMany()
  }

  async findOne(income_record_id: number) {
    return await this.IncomeRecordRep.findOne({where: {income_record_id}});
  }

  async update(income_record_id: number, income_record: UpdateIncomeRecordDto) {
    return await this.IncomeRecordRep.update(income_record_id, income_record);
  }

  async remove(income_record_id: number) {
    return await this.IncomeRecordRep.delete(income_record_id);
  }
}
