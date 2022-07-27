import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class TimeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  fromWork: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  toWork: Date;

  @ManyToOne(() => User, user => user.timelogs)
  user: User;
}
