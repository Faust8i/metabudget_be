import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ErrorFilter } from './core/filters/error.filter';
import { APP_FILTER }  from '@nestjs/core';

import { IncomeCategoriesController }   from './core/income/category/income-categories.controller';
import { IncomeItemsController }        from './core/income/item/income-items.controller';
import { IncomeRecordsController }      from './core/income/record/income-records.controller';
import { SpendingCategoriesController } from './core/spending/category/spending-categories.controller';
import { SpendingItemsController }      from './core/spending/item/spending-items.controller';
import { SpendingRecordsController }    from './core/spending/record/spending-records.controller';
import { WidgetsController }            from './core/widget/widgets.controller';

import { IncomeCategoriesService }   from './core/income/category/income-categories.service';
import { IncomeItemsService }        from './core/income/item/income-items.service';
import { IncomeRecordsService }      from './core/income/record/income-records.service';
import { SpendingCategoriesService } from './core/spending/category/spending-categories.service';
import { SpendingItemsService }      from './core/spending/item/spending-items.service';
import { SpendingRecordsService }    from './core/spending/record/spending-records.service';
import { WidgetsService }            from './core/widget/widgets.service';

import { IncomeCategory }   from './core/entities/income-category.entity';
import { IncomeItem }       from './core/entities/income-item.entity';
import { IncomeRecord }     from './core/entities/income-record.entity';
import { SpendingCategory } from './core/entities/spending-category.entity';
import { SpendingItem }     from './core/entities/spending-item.entity';
import { SpendingRecord }   from './core/entities/spending-record.entity';


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
        SpendingCategory, SpendingItem, SpendingRecord,
      ],
    }), 
    TypeOrmModule.forFeature([
      IncomeCategory, IncomeItem, IncomeRecord,
      SpendingCategory, SpendingItem, SpendingRecord,
    ]),
  ],
    controllers: [
      IncomeCategoriesController, IncomeItemsController, IncomeRecordsController,
      SpendingCategoriesController, SpendingItemsController, SpendingRecordsController,
      WidgetsController,
    ],
    providers: [
      {
        provide: APP_FILTER,
        useClass: ErrorFilter
      },
      IncomeCategoriesService,  IncomeItemsService, IncomeRecordsService,
      SpendingCategoriesService,  SpendingItemsService, SpendingRecordsService,
      WidgetsService,
    ],
})
export class AppModule {}