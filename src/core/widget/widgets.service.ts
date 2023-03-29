import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository }       from 'typeorm';

import { SpendingRecord } from '../../entities/spending-record.entity';


@Injectable()
export class WidgetsService {
  constructor(
    @InjectRepository(SpendingRecord) private readonly SpendingRecordRep: Repository<SpendingRecord>,
  ) {}

  async getTwoLineWidgetData(year: number) {
    try {
      return await this.SpendingRecordRep.query(`
        with months as (
          select generate_series(1, 12) as txn_month
        ), 
        monthly_incomes AS (
          select 
            cast( to_char(ir.income_dt, 'MM') as int ) as txn_month, 
            sum(ir.summa) as monthly_sum
          from "income-records" ir
            left join "income-items" ii on ii.income_item_id = ir.income_item_id
            left join "income-categories" ic on ic.income_category_id = ii.income_category_id
          where extract(year from ir.income_dt) = $1
            and ir.deleted_at is null
            and ic.deleted_at is null
            and ii.deleted_at is null
          group by txn_month
        ),
        monthly_spendings AS (
          select 
            cast( to_char(sr.spending_dt, 'MM') as int ) as txn_month, 
            sum(sr.summa) as monthly_sum
          from "spending-records" sr
            left join "spending-items" si on si.spending_item_id = sr.spending_item_id
            left join "spending-categories" sc on sc.spending_category_id = si.spending_category_id
          where extract(year from sr.spending_dt) = $1
            and sr.deleted_at is null
            and sc.deleted_at is null
            and si.deleted_at is null
          group by txn_month
        )
        select
          m.txn_month                as month, 
          coalesce(i.monthly_sum, 0) as incomes,
          coalesce(s.monthly_sum, 0) as spendings
        from months m
          left join monthly_incomes i   on m.txn_month = i.txn_month
          left join monthly_spendings s on m.txn_month = s.txn_month
        order by m.txn_month`, [year])
    } catch (error) {
      error.userError = 'Произошла ошибка при получении данных для виджета Доходы-Расходы.';
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

}
