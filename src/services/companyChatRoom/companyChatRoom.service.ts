import statusCode from '@modules/statusCode';
import { success } from '@modules/response';
import message from '@modules/message';
import { CompanyChatRoom } from '@entities/CompanyChatRoom';
import AppDataSource from '@config/data-source';
import setError from '@modules/setError';
import { InsertResult } from 'typeorm';
import { CreateChatRoomDto } from '@interfaces/companyChat/createChatRoom.dto';
import { UserCompanyChat } from '@entities/UserCompanyChat';

const companyChatRoomRepository = AppDataSource.getRepository(CompanyChatRoom);
const userCompanyChatRepository = AppDataSource.getRepository(UserCompanyChat);

const getChatRoomsInfo = async () => {
  try {
    const chatRooms = await companyChatRoomRepository
      .createQueryBuilder('companychatroom')
      .select([
        'companychatroom.id',
        'companychatroom.title',
        'companychatroom.createdAt'
      ])
      .orderBy('companychatroom.createdAt', 'DESC')
      .getMany();

    return success(statusCode.OK, message.SUCCESS, chatRooms);
  } catch (error: any) {
    console.log({ message: error.message });
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const createChatRoom = async (createChatRoomDto: CreateChatRoomDto) => {
  const { title, userId } = createChatRoomDto;
  try {
    const createCompanyChatRoom: InsertResult = await companyChatRoomRepository
      .createQueryBuilder()
      .insert()
      .into(CompanyChatRoom)
      .values({
        title
      })
      .execute();

    const companyChatRoomId = createCompanyChatRoom.generatedMaps[0].id;

    const userCompanyChat = await userCompanyChatRepository
      .createQueryBuilder()
      .insert()
      .into(UserCompanyChat)
      .values({
        user: { id: userId },
        companyChatRoom: { id: companyChatRoomId }
      })
      .execute();

    return success(statusCode.CREATED, message.SUCCESS);
  } catch (error) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getChatRoomsInfo,
  createChatRoom
};
