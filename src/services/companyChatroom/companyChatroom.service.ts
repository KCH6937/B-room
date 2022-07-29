import statusCode from '@modules/statusCode';
import { success, fail } from '@modules/response';
import message from '@modules/message';
import { CompanyChatRoom } from '@entities/CompanyChatRoom';
import AppDataSource from '@config/data-source';
import setError from '@modules/setError';

const chatroomsRepository = AppDataSource.getRepository(CompanyChatRoom);
console.log('레포지토리', chatroomsRepository);

const getChatroomsInfo = async () => {
  try {
    const chatRooms = await chatroomsRepository
      .createQueryBuilder('companychatroom')
      .select([
        'companychatroom.id',
        'companychatroom.title',
        'companychatroom.createdAt'
      ])
      .orderBy('companychatroom.createdAt', 'DESC')
      .getMany();
    console.log('채팅룸', chatRooms);

    return success(statusCode.OK, message.SUCCESS, chatRooms);
  } catch (error: any) {
    console.log({ message: error.message });
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getChatroomsInfo
};
