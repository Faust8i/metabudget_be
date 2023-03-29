import { Module }      from '@nestjs/common';
import { APP_FILTER }  from '@nestjs/core';
import { ErrorFilter } from './filters/error.filter';

import { BudgetModule } from './core/budget.module'


@Module({
  imports: [
    BudgetModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter
    }
  ],
})
export class AppModule {}