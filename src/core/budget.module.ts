import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ORMConfig } from '../configs/orm-config'

import { IncomeCategoriesController }    from './income/category/income-categories.controller';
import { IncomeItemsController }         from './income/item/income-items.controller';
import { IncomeRecordsController }       from './income/record/income-records.controller';
import { SpendingCategoriesController }  from './spending/category/spending-categories.controller';
import { SpendingItemsController }       from './spending/item/spending-items.controller';
import { SpendingRecordsController }     from './spending/record/spending-records.controller';
import { WidgetsController }             from './widget/widgets.controller';
import { SharesController }              from './sharing/shares.controller';
import { IncomeItemMarkersController }   from './income/item-marker/item-markers.controller';
import { SpendingItemMarkersController } from './spending/item-marker/item-markers.controller';

import { IncomeCategoriesService }    from './income/category/income-categories.service';
import { IncomeItemsService }         from './income/item/income-items.service';
import { IncomeRecordsService }       from './income/record/income-records.service';
import { SpendingCategoriesService }  from './spending/category/spending-categories.service';
import { SpendingItemsService }       from './spending/item/spending-items.service';
import { SpendingRecordsService }     from './spending/record/spending-records.service';
import { WidgetsService }             from './widget/widgets.service';
import { SharesService }              from './sharing/shares.service';
import { IncomeItemMarkersService }   from './income/item-marker/item-markers.service';
import { SpendingItemMarkersService } from './spending/item-marker/item-markers.service';

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
    TypeOrmModule.forRoot(ORMConfig),
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