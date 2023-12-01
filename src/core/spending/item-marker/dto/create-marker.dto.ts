import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";


export class CreateSpendingItemMarkerDto {

  @ApiProperty({
    type: 'number',
    description: 'Расходная статья',
    example: '1'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly spending_item_id: number;

  @ApiProperty({
    type: 'string',
    description: 'Маркер',
    example: 'Mark3'
  })
  @IsString()
  @IsNotEmpty()
  readonly marker_value: string;

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