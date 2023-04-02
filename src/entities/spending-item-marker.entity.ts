import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('spending-items-markers')
export class SpendingItemMarker {

  @PrimaryGeneratedColumn()
  spending_marker_id: number;

  @Column()
  spending_item_id: number;

  @Column()
  marker_value: string;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date;

  @Column()
  creator_id: number;
  
}