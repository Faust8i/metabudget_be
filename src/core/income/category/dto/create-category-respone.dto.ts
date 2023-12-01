import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateIncomeCategoryResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной доходной категории',
    example: '100',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_category_id: number;

}