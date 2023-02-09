import { IsNumber, IsString, IsOptional } from "class-validator";


export class CreateIncomeCategoryDto {
  
  @IsString()
  nm_income_category: string;

  @IsNumber()
  @IsOptional()
  order_pos?: number

}