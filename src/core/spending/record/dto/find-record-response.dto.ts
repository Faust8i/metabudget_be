import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { SpendingRecord } from "../../../../entities/spending-record.entity";


export class FindSpendingRecordResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: [SpendingRecord],
    description: 'Найденные записи о расходах',
    example: [ {
      spending_record_id: 15,
      nm_spending_item: "Массаж",
      spending_item_id: 8,
      summa: "3000.00",
      spending_dt: "2023.10.30",
      description: "МассажПро"
    } ],
  })
  @IsArray()
  readonly spendingRecords: SpendingRecord[];

}