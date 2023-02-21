import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IncomeCategoriesController } from './core/income/category/income-categories.controller';
import { IncomeItemsController }      from './core/income/item/income-items.controller';
import { IncomeRecordsController }    from './core/income/record/income-records.controller';

import { IncomeCategoriesService } from './core/income/category/income-categories.service';
import { IncomeItemsService }      from './core/income/item/income-items.service';
import { IncomeRecordsService }    from './core/income/record/income-records.service';

import { IncomeCategory } from './core/entities/income-category.entity';
import { IncomeItem }     from './core/entities/income-item.entity';
import { IncomeRecord }   from './core/entities/income-record.entity';

import { ErrorFilter } from './core/filters/error.filter';
import { APP_FILTER }  from '@nestjs/core';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234QWer',
      database: 'metabudget',
      entities: [
        IncomeCategory, IncomeItem, IncomeRecord,
      ],
    }), 
    TypeOrmModule.forFeature([
      IncomeCategory, IncomeItem, IncomeRecord,
    ]),
  ],
    controllers: [
      IncomeCategoriesController, IncomeItemsController, IncomeRecordsController,
    ],
    providers: [
      {
        provide: APP_FILTER,
        useClass: ErrorFilter
      },
      IncomeCategoriesService,  IncomeItemsService, IncomeRecordsService,
    ],
})
export class AppModule {}