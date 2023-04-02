import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('income-items-markers')
export class IncomeItemMarker {

  @PrimaryGeneratedColumn()
  income_marker_id: number;

  @Column()
  income_item_id: number;

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