import { ApiProperty }          from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class AccountDto {

  @ApiProperty({
    description: 'Электронная почта',
    example: 'abc@qwerty.com'
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'Пароль',
    example: 'kiP@M0lxOC'
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

}