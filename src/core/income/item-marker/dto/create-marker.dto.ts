import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class CreateIncomeItemMarkerDto {

  @ApiProperty({
    description: 'Доходная статья',
    example: '1'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_item_id: number;

  @ApiProperty({
    description: 'Маркер',
    example: 'Mark3'
  })
  @IsString()
  @IsNotEmpty()
  readonly marker_value: string;

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