import { Request, Response } from 'express';
import statusCode from '@modules/statusCode';
import { success, fail } from '@modules/response';
import message from '@modules/message';
import { CompanyChatRoom } from '@entities/CompanyChatRoom';
import AppDataSource from '@config/data-source';
import setError from '@modules/setError';

// 채팅룸 조회 - 서비스
// /api/chats/
/**
 * TODO:
 *
 *  * 컨트롤러와 연결하기 서비스쪽의 함수 이름 getChatroomsInfo
 *  * typeORM 기능 (쿼리빌더?) 사용하여 DB에 저장된 채팅룸 목록 가져오기
 *  * 결과에 따라서 응답 controller 쪽으로 리턴
 */

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
