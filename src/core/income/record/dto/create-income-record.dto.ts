import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, IsOptional, IsNotEmpty } from "class-validator";

export class CreateIncomeRecordDto {

  @ApiProperty({
    description: 'Дата доходной операции',
    example: '2023-02-20'
  })
  @IsNotEmpty()
  readonly income_dt: Date;

  @ApiProperty({
    description: 'Доходная статья',
    example: '1'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_item_id?: number;

  @ApiProperty({
    description: 'Сумма дохода',
    example: '3000.50'
  })
  @IsNumber()
  @IsNotEmpty()
  readonly summa?: number;  

  @ApiProperty({
    description: 'Описание дохода',
    example: 'За март'
  })
  @IsString()
  @IsOptional()
  readonly description: string;

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
