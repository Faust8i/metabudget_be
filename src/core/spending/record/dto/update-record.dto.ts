import { PartialType } from '@nestjs/mapped-types';
import { CreateSpendingRecordDto } from './create-record.dto';


export class UpdateSpendingRecordDto extends PartialType(CreateSpendingRecordDto) {}