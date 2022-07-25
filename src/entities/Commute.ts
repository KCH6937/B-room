import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { DateEntity } from './DateEntity';
import { User } from './User';

@Entity()
export class Commute extends DateEntity {
  @PrimaryGeneratedColumn()
  commuteId: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  fromWork: Date;

  @Column({ type: 'datetime' })
  toWork: Date;

  @ManyToOne(() => User, user => user.commutes)
  @JoinColumn({ name: 'userId' })
  user: User;
}
