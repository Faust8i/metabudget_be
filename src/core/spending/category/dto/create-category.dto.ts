import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator";


export class CreateSpendingCategoryDto {

  @ApiProperty({
    description: 'Наименование категории расходных статей',
    example: 'Квартира'
  })
  @IsString()
  @IsNotEmpty()
  readonly nm_spending_category: string;

  @ApiProperty({
    description: 'Позиция при сортировке',
    example: '1'
  })
  @IsNumber()
  @IsOptional()
  readonly order_pos?: number;

  @ApiProperty({
    description: 'Дата создания',
    example: '2023-02-20T12:34:56+00:00'
  })
  @IsNotEmpty()
  readonly created_at: Date;

  @ApiProperty({
    description: 'Дата обновления',
    example: '2023-02-20T12:34:56+00:00'
  })
  @IsNotEmpty()
  readonly updated_at: Date;

}