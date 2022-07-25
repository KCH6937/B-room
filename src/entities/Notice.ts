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
export class Notice extends DateEntity {
  @PrimaryGeneratedColumn()
  noticeId: number;

  @Column({ length: 45 })
  title: string;

  @Column({ type: 'tinytext' })
  content: string;

  @ManyToOne(() => User, user => user.notices)
  @JoinColumn({ name: 'userId' })
  user: User;
}
