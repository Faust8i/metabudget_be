import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateIncomeMarkerResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной метки доходных статей',
    example: '3050',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly income_marker_id: number;

}