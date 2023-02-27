import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IncomeCategory }   from '../core/entities/income-category.entity';
import { IncomeItem }       from '../core/entities/income-item.entity';
import { IncomeRecord }     from '../core/entities/income-record.entity';
import { SpendingCategory } from '../core/entities/spending-category.entity';
import { SpendingItem }     from '../core/entities/spending-item.entity';
import { SpendingRecord }   from '../core/entities/spending-record.entity';


const dbConfig: TypeOrmModuleOptions = {
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
};

const ORMConfig: TypeOrmModuleOptions = {
  ...dbConfig,
  extra: {
    softDelete: true,
  },
};

export { ORMConfig };