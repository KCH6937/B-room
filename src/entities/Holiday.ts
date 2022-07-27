import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { DateEntity } from './DateEntity';

@Entity()
export class Holiday extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'int' })
  holidaySum: number;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  signType: boolean;

  @Column({ type: 'timestamp' })
  signTime?: Date;

  @ManyToOne(() => User, user => user.holidays)
  user: User;
}
