import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { IncomeCategory } from "../../../../entities/income-category.entity";


export class FindIncomeCategoryResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: [IncomeCategory],
    description: 'Найденные доходные категории',
    example: [ {
      income_category_id: 5,
      nm_income_category: "Прочие",
      order_pos: 1001,
      created_at: "2023-02-20T08:00:00.000Z",
      updated_at: "2023-02-20T08:00:00.000Z",
      deleted_at: null,
      creator_id: 2
    } ],
  })
  @IsArray()
  readonly incomeCategories: IncomeCategory[];

}