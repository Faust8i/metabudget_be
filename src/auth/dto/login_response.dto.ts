import { ApiProperty }          from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class LoginResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Токен доступа',
    example: '...'
  })
  @IsString()
  @IsNotEmpty()
  readonly access_token: string;

}