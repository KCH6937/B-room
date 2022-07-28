import { CompanyChatRoom } from './CompanyChatRoom';
import { CompanyChat } from './CompanyChat';
import { User } from './User';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId
} from 'typeorm';

@Entity()
export class UserCompanyChat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userCompanyChats)
  user: User;

  @ManyToOne(
    () => CompanyChatRoom,
    companyChatRoom => companyChatRoom.userCompanyChats
  )
  companyChatRoom: CompanyChatRoom;

  @OneToMany(() => CompanyChat, companyChat => companyChat.userCompanyChat)
  companyChats: CompanyChat[];
}
