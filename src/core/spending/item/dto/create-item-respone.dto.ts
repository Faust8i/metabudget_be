import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateSpendingItemResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной расходной статьи',
    example: '300',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly spending_item_id: number;

}