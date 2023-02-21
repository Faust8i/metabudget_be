import { PartialType } from '@nestjs/mapped-types';
import { CreateIncomeRecordDto } from './create-income-record.dto';

export class UpdateIncomeRecordDto extends PartialType(CreateIncomeRecordDto) {}
