import { ApiProperty }          from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";


export class UserDto {

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
    description: 'Регистрационный номер',
    example: 1
  })
  @IsNumber()
  @IsNotEmpty()
  readonly user_id: number;

}