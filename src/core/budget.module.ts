import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';

import { IncomeCategoriesController }    from './income/category/categories.controller';
import { IncomeItemsController }         from './income/item/items.controller';
import { IncomeRecordsController }       from './income/record/records.controller';
import { SpendingCategoriesController }  from './spending/category/categories.controller';
import { SpendingItemsController }       from './spending/item/items.controller';
import { SpendingRecordsController }     from './spending/record/records.controller';
import { WidgetsController }             from './widget/widgets.controller';
import { SharesController }              from './sharing/shares.controller';
import { IncomeItemMarkersController }   from './income/item-marker/markers.controller';
import { SpendingItemMarkersController } from './spending/item-marker/markers.controller';

import { IncomeCategoriesService }    from './income/category/categories.service';
import { IncomeItemsService }         from './income/item/items.service';
import { IncomeRecordsService }       from './income/record/records.service';
import { SpendingCategoriesService }  from './spending/category/categories.service';
import { SpendingItemsService }       from './spending/item/tems.service';
import { SpendingRecordsService }     from './spending/record/records.service';
import { WidgetsService }             from './widget/widgets.service';
import { SharesService }              from './sharing/shares.service';
import { IncomeItemMarkersService }   from './income/item-marker/markers.service';
import { SpendingItemMarkersService } from './spending/item-marker/markers.service';

import { IncomeCategory }     from '../entities/income-category.entity';
import { IncomeItem }         from '../entities/income-item.entity';
import { IncomeRecord }       from '../entities/income-record.entity';
import { SpendingCategory }   from '../entities/spending-category.entity';
import { SpendingItem }       from '../entities/spending-item.entity';
import { SpendingRecord }     from '../entities/spending-record.entity';
import { Share }              from '../entities/share.entity';
import { IncomeItemMarker }   from '../entities/income-item-marker.entity';
import { SpendingItemMarker } from '../entities/spending-item-marker.entity';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('db.host'),
        port: configService.get('db.port'),
        username: configService.get('db.username'),
        password: configService.get('db.password'),
        database: configService.get('db.database'),
        entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
        extra: { softDelete: true, },
      })
    }),
    TypeOrmModule.forFeature([
      IncomeCategory,   IncomeItem,   IncomeRecord,
      SpendingCategory, SpendingItem, SpendingRecord,
      Share,
      IncomeItemMarker, SpendingItemMarker,
    ]),
  ],
  controllers: [
    IncomeCategoriesController,   IncomeItemsController,   IncomeRecordsController,
    SpendingCategoriesController, SpendingItemsController, SpendingRecordsController,
    WidgetsController,
    SharesController,
    IncomeItemMarkersController, SpendingItemMarkersController,
  ],
  providers: [
    IncomeCategoriesService,   IncomeItemsService,   IncomeRecordsService,
    SpendingCategoriesService, SpendingItemsService, SpendingRecordsService,
    WidgetsService,
    SharesService,
    IncomeItemMarkersService, SpendingItemMarkersService,
  ],
})
export class BudgetModule {}