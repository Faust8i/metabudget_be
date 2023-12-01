import { ApiProperty }          from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class DecodedJWT {

  @ApiProperty({
    type: 'string',
    description: 'Электронная почта',
    example: 'abc@qwerty.com'
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: 'number',
    description: 'Срок экспирации токена',
    example: 1701332082
  })
  @IsString()
  @IsNotEmpty()
  readonly exp: number;

  @ApiProperty({
    type: 'number',
    description: 'Время генерации токена',
    example: 1701328482
  })
  @IsString()
  @IsNotEmpty()
  readonly iat: number;

  @ApiProperty({
    type: 'number',
    description: 'Регистрационный номер пользователя',
    example: '1'
  })
  @IsString()
  @IsNotEmpty()
  readonly id: number;

}