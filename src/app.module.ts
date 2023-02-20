import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IncomeCategoriesController } from './core/income/category/income-categories.controller';
import { IncomeItemsController }      from './core/income/item/income-items.controller';

import { IncomeCategoriesService } from './core/income/category/income-categories.service';
import { IncomeItemsService }      from './core/income/item/income-items.service';

import { IncomeCategory } from './core/entities/income-category.entity';
import { IncomeItem }     from './core/entities/income-item.entity';

import { ErrorFilter } from './core/filters/error.filter';
import { APP_FILTER } from '@nestjs/core';


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
        IncomeCategory, 
        IncomeItem, 
      ],
    }), 
    TypeOrmModule.forFeature([
      IncomeCategory, 
      IncomeItem, 
    ]),
  ],
    controllers: [
      IncomeCategoriesController, 
      IncomeItemsController, 
    ],
    providers: [
      {
        provide: APP_FILTER,
        useClass: ErrorFilter
      },
      IncomeCategoriesService,
      IncomeItemsService,
    ],
})
export class AppModule {}