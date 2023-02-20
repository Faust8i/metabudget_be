import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator";


export class CreateIncomeItemDto {

  @ApiProperty({
    description: 'Наименование категории доходных статей',
    example: 'Работа'
  })
  @IsString()
  @IsNotEmpty()
  readonly nm_income_item: string;

  @ApiProperty({
    description: 'Позиция при сортировкие',
    example: '1'
  })
  @IsNumber()
  @IsOptional()
  readonly order_pos?: number;

  @ApiProperty({
    description: 'Позиция при сортировке',
    example: '1'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_category_id?: number;

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
