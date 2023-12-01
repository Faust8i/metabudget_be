import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class DeleteSpendingItemResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

}