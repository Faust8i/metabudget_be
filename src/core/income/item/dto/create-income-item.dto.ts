import { IsNumber, IsString, IsOptional } from "class-validator";


export class CreateIncomeItemDto {

  @IsString()
  nm_income_item: string;

  @IsNumber()
  @IsOptional()
  order_pos?: number

  @IsNumber()
  income_category_id: number;

}
