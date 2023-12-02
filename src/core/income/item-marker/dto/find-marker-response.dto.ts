import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { IncomeItemMarker } from "src/entities/income-item-marker.entity";
import { IncomeRecord } from "src/entities/income-record.entity";


export class FindIncomeMarkerResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: IncomeItemMarker,
    description: 'Найденный маркер доходных статей',
    example: [ {
      income_marker_id: 82,
      income_item_id: 62,
      marker_value: 'mark2',
      created_at: '2023-04-06 22:58:36.679 +0500',
      updated_at: '2023-04-06 22:58:36.679 +0500',
      deleted_at: null,
      creator_id: 2
    } ],
  })
  @IsArray()
  readonly incomeMarker: IncomeItemMarker;

}