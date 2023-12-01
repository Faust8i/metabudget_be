import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator";


export class CreateSpendingRecordDto {

  @ApiProperty({
    type: 'date',
    description: 'Дата расходной операции',
    example: '2023-02-20'
  })
  @IsNotEmpty()
  readonly spending_dt: Date;

  @ApiProperty({
    type: 'number',
    description: 'Расходная статья',
    example: '1'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly spending_item_id?: number;

  @ApiProperty({
    type: 'number',
    description: 'Сумма расхода',
    example: '3000.50'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly summa?: number;  

  @ApiProperty({
    type: 'string',
    description: 'Описание расхода',
    example: 'За март'
  })
  @IsString()
  @IsOptional()
  readonly description: string;

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
