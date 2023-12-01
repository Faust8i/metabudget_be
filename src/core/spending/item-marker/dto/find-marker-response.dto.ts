import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { SpendingItemMarker } from "../../../../entities/spending-item-marker.entity";


export class FindSpendingMarkerResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: SpendingItemMarker,
    description: 'Найденный маркер расходных статей',
    example: [ {
      spending_marker_id: 24,
      spending_item_id: 2,
      marker_value: 'mark1',
      created_at: '2023-04-02 17:35:43.905 +0500',
      updated_at: '2023-04-02 17:35:43.905 +0500',
      deleted_at: null,
      creator_id: 2
    } ],
  })
  @IsArray()
  readonly spendingMarker: SpendingItemMarker;

}