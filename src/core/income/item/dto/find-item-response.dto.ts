import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { IncomeItem } from "../../../../entities/income-item.entity";


export class FindIncomeItemResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: [IncomeItem],
    description: 'Найденные доходные статьи',
    example: [ {
      income_item_id: 65,
      nm_income_category: "Заработок",
      nm_income_item: "Аванс",
      order_pos: 10,
      user_marker: null
    } ],
  })
  @IsArray()
  readonly incomeItems: IncomeItem[];

}