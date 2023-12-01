import { ApiProperty }          from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class AccountDto {

  @ApiProperty({
    type: 'string',
    description: 'Электронная почта',
    example: 'abc@qwerty.com'
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    type: 'string',
    description: 'Пароль',
    example: 'kiP@M0lxOC'
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

}