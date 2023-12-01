import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { SpendingItem } from "../../../../entities/spending-item.entity";


export class FindSpendingItemResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: [SpendingItem],
    description: 'Найденные расходные статьи',
    example: [ {
      spending_item_id: 3,
      nm_spending_category: "Машина",
      nm_spending_item: "Бензин",
      order_pos: 1,
      user_marker: null
    } ],
  })
  @IsArray()
  readonly incomeItems: SpendingItem[];

}