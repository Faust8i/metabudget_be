import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty } from "class-validator";


export class CreateShareDto {

  @ApiProperty({
    type: 'string',
    description: 'Емайл пользователя, которому разрешаем доступ к своим данным',
    example: 'email@gmail.com'
  })
  @IsString()
  @IsNotEmpty()
  readonly friendly_email: string;

  @ApiProperty({
    type: 'date',
    description: 'Дата создания',
    example: '2023-02-20T12:34:56+00:00'
  })
  @IsNotEmpty()
  readonly created_at: Date;

  @ApiProperty({
    type: 'date',
    description: 'Дата обновления',
    example: '2023-02-20T12:34:56+00:00'
  })
  @IsNotEmpty()
  readonly updated_at: Date;

}