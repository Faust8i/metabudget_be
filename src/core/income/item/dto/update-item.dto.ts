import { PartialType }         from '@nestjs/mapped-types';

import { CreateIncomeItemDto } from './create-item.dto';


export class UpdateIncomeItemDto extends PartialType(CreateIncomeItemDto) {}