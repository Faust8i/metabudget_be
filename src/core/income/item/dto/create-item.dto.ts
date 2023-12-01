import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator";


export class CreateIncomeItemDto {

  @ApiProperty({
    type: 'string',
    description: 'Наименование категории доходных статей',
    example: 'Зарплата'
  })
  @IsString()
  @IsNotEmpty()
  readonly nm_income_item: string;

  @ApiProperty({
    type: 'number',
    description: 'Позиция при сортировкие',
    example: '1'
  })
  @IsNumber()
  @IsOptional()
  readonly order_pos?: number;

  @ApiProperty({
    type: 'string',
    description: 'Идентификатор доходной категории',
    example: '1'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_category_id?: number;

  @ApiProperty({
    type: 'date',
    description: 'Дата создания',
    example: '2023-02-20T12:34:56+00:00'
  })
  @IsNotEmpty()
  readonly created_at: Date;

  @ApiProperty({
    type: 'date',
    description: 'Дата обновления',
    example: '2023-02-20T12:34:56+00:00'
  })
  @IsNotEmpty()
  readonly updated_at: Date;

}
