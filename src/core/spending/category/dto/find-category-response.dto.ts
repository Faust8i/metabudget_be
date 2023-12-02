import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { SpendingCategory } from "../../../../entities/spending-category.entity";


export class FindSpendingCategoryResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: [SpendingCategory],
    description: 'Найденные расходные категории',
    example: [ {
      spending_category_id: 2,
      nm_spending_category: "Машина",
      order_pos: 20,
      created_at: "2023-02-23T01:00:01.000Z",
      updated_at: "2023-02-23T02:00:01.000Z",
      deleted_at: null,
      creator_id: 2
    } ],
  })
  @IsArray()
  readonly spendingCategories: SpendingCategory[];

}