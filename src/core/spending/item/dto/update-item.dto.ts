import { PartialType }         from '@nestjs/mapped-types';

import { CreateSpendingItemDto } from './create-item.dto';


export class UpdateSpendingItemDto extends PartialType(CreateSpendingItemDto) {}