import { Module }      from '@nestjs/common';
import { APP_FILTER }  from '@nestjs/core';
import { ErrorFilter } from './filters/error.filter';

import { AuthModule }  from './auth/auth.module'
import { UsersModule } from './users/users.module'

import { BudgetModule } from './core/budget.module'


@Module({
  imports: [
    BudgetModule,
    AuthModule, UsersModule
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorFilter
    }
  ],
})
export class AppModule {}