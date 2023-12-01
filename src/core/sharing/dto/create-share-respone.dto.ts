import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNotEmpty } from "class-validator";


export class CreateShareResponseDto {

  @ApiProperty({
    type: 'number',
    description: 'Номер записи о совместном доступе',
    example: '20',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly share_id: number;

}