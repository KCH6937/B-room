import { User } from './User';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { DateEntity } from './DateEntity';

@Entity()
export class Holiday extends DateEntity {
  @PrimaryGeneratedColumn()
  hoilydayId: number;

  @Column({ length: 45 })
  title: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  signType: boolean;

  @Column({ type: 'timestamp' })
  signTime?: Date;

  @ManyToOne(() => User, user => user.holidays)
  @JoinColumn({ name: 'userId' })
  user: User;
}
