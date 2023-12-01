import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsArray } from "class-validator";
import { Share } from "../../../entities/share.entity";


export class FindShareResponseDto {

  @ApiProperty({
    type: 'string',
    description: 'Сообщение',
    example: 'OK',
  })
  @IsString()
  @IsNotEmpty()
  readonly message: string;

  @ApiProperty({
    type: [Share],
    description: 'Найденные доходные категории',
    example: [ {
      share_id: 8,
      friendly_email: 'qwerty@gmail.com',
      creator_id: 2,
      created_at: '2023-04-06 23:00:03.660 +0500',
      updated_at: '2023-04-06 23:00:03.660 +0500',
      deleted_at: null
    } ],
  })
  @IsArray()
  readonly shares: Share[];

}