import { User } from './User';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany
} from 'typeorm';
import { DateEntity } from './DateEntity';

@Entity()
export class Team extends DateEntity {
  @PrimaryGeneratedColumn()
  teamId: number;

  @Column({ length: 45 })
  name: string;

  @OneToMany(() => User, user => user.team)
  users: User[];
}
