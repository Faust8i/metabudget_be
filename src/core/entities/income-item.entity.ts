import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { IncomeCategory } from './income-category.entity';

@Entity('income-items')
export class IncomeItem {

  @PrimaryGeneratedColumn()
  income_item_id: number;

  @Column()
  nm_income_item: string;

  @Column()
  order_pos: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date;

  @Column()
  income_category_id: number;

}
