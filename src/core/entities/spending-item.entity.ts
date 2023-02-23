import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { SpendingCategory } from './spending-category.entity';

@Entity('spending-items')
export class SpendingItem {

  @PrimaryGeneratedColumn()
  spending_item_id: number;

  @Column()
  nm_spending_item: string;

  @Column()
  order_pos: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date;

  @Column()
  spending_category_id: number;

}
