import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { IncomeRecord } from "src/entities/income-record.entity";


export class FindIncomeRecordResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: [IncomeRecord],
    description: 'Найденные записи о доходах',
    example: [ {
      income_record_id: 18,
      nm_income_item: "Подарок",
      income_item_id: 62,
      summa: "100.50",
      income_dt: "2023.10.28",
      description: "Нашел"
    } ],
  })
  @IsArray()
  readonly incomeRecords: IncomeRecord[];

}