import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { IncomeItem } from './income-item.entity';

@Entity('income-categories')
export class IncomeCategory {

  @PrimaryGeneratedColumn()
  income_category_id: number;

  @Column()
  nm_income_category: string;

  @Column()
  order_pos: number;
  
  @OneToMany(type => IncomeItem, incomeItem => incomeItem.income_category_id)
  income_items: IncomeItem[];

}