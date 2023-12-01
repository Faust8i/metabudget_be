import { PartialType } from '@nestjs/mapped-types';

import { CreateSpendingCategoryDto } from './create-category.dto';


export class UpdateSpendingCategoryDto extends PartialType(CreateSpendingCategoryDto) {}