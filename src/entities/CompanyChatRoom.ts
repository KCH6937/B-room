import { UserCompanyChat } from './UserCompanyChat';
import {
  Column,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { DateEntity } from './DateEntity';

@Entity()
export class CompanyChatRoom extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45 })
  title: string;

  @OneToMany(
    () => UserCompanyChat,
    userCompanyChat => userCompanyChat.companyChatRoom
  )
  userCompanyChats: UserCompanyChat[];

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: string;
}
