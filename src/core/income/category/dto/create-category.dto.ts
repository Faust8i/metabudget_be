import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator";


export class CreateIncomeCategoryDto {

  @ApiProperty({
    type: 'string',
    description: 'Наименование категории доходных статей',
    example: 'Работа'
  })
  @IsString()
  @IsNotEmpty()
  readonly nm_income_category: string;

  @ApiProperty({
    type: 'number',
    description: 'Позиция при сортировке',
    example: '1',
  })
  @IsNumber()
  @IsOptional()
  readonly order_pos?: number;

  @ApiProperty({
    type: 'date',
    description: 'Дата создания',
    example: '2023-02-20T12:34:56+00:00',
  })
  @IsNotEmpty()
  readonly created_at: Date;

  @ApiProperty({
    type: 'date',
    description: 'Дата обновления',
    example: '2023-02-20T12:34:56+00:00',
  })
  @IsNotEmpty()
  readonly updated_at: Date;

}