import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { IncomeCategory }     from '../entities/income-category.entity';
import { IncomeItem }         from '../entities/income-item.entity';
import { IncomeRecord }       from '../entities/income-record.entity';
import { SpendingCategory }   from '../entities/spending-category.entity';
import { SpendingItem }       from '../entities/spending-item.entity';
import { SpendingRecord }     from '../entities/spending-record.entity';
import { User }               from '../entities/user.entity';
import { Share }              from '../entities/share.entity';
import { IncomeItemMarker }   from '../entities/income-item-marker.entity';
import { SpendingItemMarker } from '../entities/spending-item-marker.entity';


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
    User,
    Share,
    IncomeItemMarker, SpendingItemMarker,
  ],
};

const ORMConfig: TypeOrmModuleOptions = {
  ...dbConfig,
  extra: {
    softDelete: true,
  },
};

export { ORMConfig };