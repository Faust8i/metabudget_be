import { Module }        from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ORMConfig } from '../configs/orm-config'

import { IncomeCategoriesController }   from '../core/income/category/income-categories.controller';
import { IncomeItemsController }        from '../core/income/item/income-items.controller';
import { IncomeRecordsController }      from '../core/income/record/income-records.controller';
import { SpendingCategoriesController } from '../core/spending/category/spending-categories.controller';
import { SpendingItemsController }      from '../core/spending/item/spending-items.controller';
import { SpendingRecordsController }    from '../core/spending/record/spending-records.controller';
import { WidgetsController }            from '../core/widget/widgets.controller';
import { SharesController }             from './sharing/shares.controller';

import { IncomeCategoriesService }   from '../core/income/category/income-categories.service';
import { IncomeItemsService }        from '../core/income/item/income-items.service';
import { IncomeRecordsService }      from '../core/income/record/income-records.service';
import { SpendingCategoriesService } from '../core/spending/category/spending-categories.service';
import { SpendingItemsService }      from '../core/spending/item/spending-items.service';
import { SpendingRecordsService }    from '../core/spending/record/spending-records.service';
import { WidgetsService }            from '../core/widget/widgets.service';
import { SharesService }             from './sharing/shares.service';

import { IncomeCategory }   from '../entities/income-category.entity';
import { IncomeItem }       from '../entities/income-item.entity';
import { IncomeRecord }     from '../entities/income-record.entity';
import { SpendingCategory } from '../entities/spending-category.entity';
import { SpendingItem }     from '../entities/spending-item.entity';
import { SpendingRecord }   from '../entities/spending-record.entity';
import { Share }            from '../entities/share.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot(ORMConfig),
    TypeOrmModule.forFeature([
      IncomeCategory,   IncomeItem,   IncomeRecord,
      SpendingCategory, SpendingItem, SpendingRecord,
      Share,
    ]),
  ],
  controllers: [
    IncomeCategoriesController,   IncomeItemsController,   IncomeRecordsController,
    SpendingCategoriesController, SpendingItemsController, SpendingRecordsController,
    WidgetsController,
    SharesController,
  ],
  providers: [
    IncomeCategoriesService,   IncomeItemsService,   IncomeRecordsService,
    SpendingCategoriesService, SpendingItemsService, SpendingRecordsService,
    WidgetsService,
    SharesService,
  ],
})
export class BudgetModule {}