import { PartialType }         from '@nestjs/mapped-types';

import { CreateSpendingItemDto } from './create-spending-item.dto';


export class UpdateSpendingItemDto extends PartialType(CreateSpendingItemDto) {}
