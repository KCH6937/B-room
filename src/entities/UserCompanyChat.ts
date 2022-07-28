import { CompanyChatRoom } from './CompanyChatRoom';
import { CompanyChat } from './CompanyChat';
import { User } from './User';
import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserCompanyChat {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.userCompanyChats)
  user: User;

  @ManyToOne(
    () => CompanyChatRoom,
    companyChatRoom => companyChatRoom.userCompanyChat
  )
  companyChatRooms: CompanyChatRoom[];

  @OneToMany(() => CompanyChat, companyChat => companyChat.userCompanyChat)
  companyChats: CompanyChat[];
}
