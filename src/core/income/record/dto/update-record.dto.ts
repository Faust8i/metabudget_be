import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeRecordDto } from './create-record.dto';

export class UpdateIncomeRecordDto extends PartialType(CreateIncomeRecordDto) {}