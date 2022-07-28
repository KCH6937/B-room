import { UserCompanyChat } from './UserCompanyChat';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  DeleteDateColumn
} from 'typeorm';
import { CompanyDepartment } from './CompanyDepartment';
import { Holiday } from './Holiday';
import { CompanyNotice } from './CompanyNotice';
import { TimeLog } from './TimeLog';
import { DateEntity } from './DateEntity';

@Entity()
export class User extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 45, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  authority: boolean;

  @OneToMany(() => TimeLog, timelog => timelog.user)
  timelogs: TimeLog[];

  @OneToMany(() => CompanyNotice, companyNotice => companyNotice.user)
  companyNotices: CompanyNotice[];

  @OneToMany(() => Holiday, hoilyday => hoilyday.user)
  holidays: Holiday[];

  @ManyToOne(
    () => CompanyDepartment,
    companyDepartment => companyDepartment.users
  )
  companyDepartmentId: CompanyDepartment['id'];

  @OneToMany(() => UserCompanyChat, userCompanyChat => userCompanyChat.user)
  userCompanyChats: UserCompanyChat[];

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt?: Date;
}
