import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateSpendingCategoryResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной расходной категории',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly spending_category_id: number;

}