import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateSpendingRecordResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной записи о доходе',
    example: '3050',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly spending_record_id: number;

}