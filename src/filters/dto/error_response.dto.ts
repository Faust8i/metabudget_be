import { ApiProperty }          from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class ErrorResponseDto {

  @ApiProperty({
    description: 'Сообщение об ошибке',
    example: 'Произошла ошибка при ...'
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    description: 'Расширенное сообщение об ошибке',
    example: '...',
    required: false
  })
  @IsString()
  readonly messageUserError?: string;

}