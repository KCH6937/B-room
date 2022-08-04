import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './User';
import { DateEntity } from './DateEntity';

@Entity()
export class CompanyDepartment extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @OneToMany(() => User, user => user.companyDepartment)
  users: User[];
}
