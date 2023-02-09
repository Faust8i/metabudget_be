import { PartialType }         from '@nestjs/mapped-types';

import { CreateIncomeItemDto } from './create-income-item.dto';


export class UpdateIncomeItemDto extends PartialType(CreateIncomeItemDto) {}
