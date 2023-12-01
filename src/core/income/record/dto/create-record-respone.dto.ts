import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateIncomeRecordResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной записи о доходе',
    example: '3050',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_record_id: number;

}