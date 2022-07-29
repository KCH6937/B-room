import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from './User';

@Entity()
export class TimeLog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fromWork: Date;

  @Column({ type: 'timestamp', default: () => 'NULL', nullable: true })
  toWork: Date;

  @ManyToOne(() => User, user => user.timelogs)
  user: User;
}
