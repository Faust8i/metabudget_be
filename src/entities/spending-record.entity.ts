import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity('spending-records')
export class SpendingRecord {

  @PrimaryGeneratedColumn()
  spending_record_id: number;

  @Column({ type: 'timestamp without time zone' })
  spending_dt: Date;

  @Column()
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  summa: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date;

  @Column()
  creator_id: number;

  @Column()
  spending_item_id: number;

}