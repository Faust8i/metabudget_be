import { PartialType } from '@nestjs/mapped-types';

import { CreateIncomeCategoryDto } from './create-income-category.dto';


export class UpdateIncomeCategoryDto extends PartialType(CreateIncomeCategoryDto) {}
