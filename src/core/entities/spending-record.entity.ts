import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('spending-records')
export class SpendingRecord {

  @PrimaryGeneratedColumn()
  spending_record_id: number;

  @Column({ type: 'timestamp with time zone' })
  spending_dt: Date;

  @Column()
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  summa: number;

  @Column({ type: 'timestamp with time zone' })
  created_at: Date;

  @Column({ type: 'timestamp with time zone' })
  updated_at: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  deleted_at: Date;

  @Column()
  spending_item_id: number;

}