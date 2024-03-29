import { Entity, Column, PrimaryGeneratedColumn, OneToMany, DeleteDateColumn } from 'typeorm';
import { SpendingItem } from './spending-item.entity';

@Entity('spending-categories')
export class SpendingCategory {

  @PrimaryGeneratedColumn()
  spending_category_id: number;

  @Column()
  nm_spending_category: string;

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
  
  @OneToMany(type => SpendingItem, spendingItem => spendingItem.spending_category_id)
  spending_items: SpendingItem[];

}