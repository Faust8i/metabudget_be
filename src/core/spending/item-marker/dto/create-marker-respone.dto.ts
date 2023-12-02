import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateSpendingMarkerResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер созданной метки расходных статей',
    example: '3050',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly spending_marker_id: number;

}