import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { DateEntity } from './DateEntity';

@Entity()
export class CompanyNotice extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => User, user => user.companyNotices)
  user: User;
}
