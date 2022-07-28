import { InsertResult } from 'typeorm';
import { success } from '@modules/response';
import { CreateChatRoomDto } from '@interfaces/companyChat/createChatRoom.dto';
import setError from '@modules/setError';
import statusCode from '@modules/statusCode';
import message from '@modules/message';
import AppDataSource from '@config/data-source';
import { CompanyChatRoom } from '@entities/CompanyChatRoom';
import { UserCompanyChat } from '@entities/UserCompanyChat';

const companyChatRoomRepository = AppDataSource.getRepository(CompanyChatRoom);
const userCompanyChatRepository = AppDataSource.getRepository(UserCompanyChat);

const createChatRoom = async (createChatRoomDto: CreateChatRoomDto) => {
  let { title, userId } = createChatRoomDto;
  userId = 1; //TODO: jwt middleware 추가 후 삭제예정
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
  createChatRoom
};
