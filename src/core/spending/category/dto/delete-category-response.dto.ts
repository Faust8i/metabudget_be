import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class DeleteSpendingCategoryResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

}