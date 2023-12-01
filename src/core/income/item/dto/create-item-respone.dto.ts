import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateIncomeItemResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной доходной статьи',
    example: '250',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_item_id: number;

}