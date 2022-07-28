import { UserCompanyChat } from './UserCompanyChat';
import {
  Column,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { DateEntity } from './DateEntity';

@Entity()
export class CompanyChat extends DateEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(
    () => UserCompanyChat,
    userCompanyChat => userCompanyChat.companyChats
  )
  userCompanyChat: UserCompanyChat;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: string;
}
