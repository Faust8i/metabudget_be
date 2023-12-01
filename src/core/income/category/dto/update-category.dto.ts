import { PartialType } from '@nestjs/mapped-types';

import { CreateIncomeCategoryDto } from './create-category.dto';


export class UpdateIncomeCategoryDto extends PartialType(CreateIncomeCategoryDto) {}