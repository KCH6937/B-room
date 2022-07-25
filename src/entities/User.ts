import { Team } from './Team';
import { Holiday } from './Holiday';
import { Notice } from './Notice';
import { Commute } from './Commute';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { DateEntity } from './DateEntity';

@Entity()
export class User extends DateEntity {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ type: 'tinytext' })
  password: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  authority: boolean;

  @OneToMany(() => Commute, commute => commute.user)
  commutes: Commute[];

  @OneToMany(() => Notice, notice => notice.user)
  notices: Notice[];

  @OneToMany(() => Holiday, hoilyday => hoilyday.user)
  holidays: Holiday[];

  @ManyToOne(() => Team, team => team.users)
  @JoinColumn({ name: 'teamId' })
  team: Team;
}
