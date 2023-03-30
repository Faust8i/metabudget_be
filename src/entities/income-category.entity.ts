import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { IncomeItem } from './income-item.entity';

@Entity('income-categories')
export class IncomeCategory {

  @PrimaryGeneratedColumn()
  income_category_id: number;

  @Column()
  nm_income_category: string;

  @Column()
  order_pos: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date;
  
  @Column()
  creator_id: number;

  @OneToMany(type => IncomeItem, incomeItem => incomeItem.income_category_id)
  income_items: IncomeItem[];

}