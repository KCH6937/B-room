import { Request, Response } from 'express';
import statusCode from '@modules/statusCode';
import { success, fail } from '@modules/response';
import message from '@modules/message';

import companyChatroomService from '@services/companyChatroom/companyChatroom.service';

// 채팅룸 조회
// /api/chats/
/**
 * TODO:
 *
 *  * 서비스와 연결 : 서비스쪽의 이름 getChatroomsInfo
 *  * 서비스로 부터 오는 응답값 받아 보내주기
 */

const getChatroomsInfo = async (req: Request, res: Response) => {
  try {
    const result = await companyChatroomService.getChatroomsInfo();
    return res.status(statusCode.OK).json(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .json(fail(error.statusCode, error.message));
  }
};

export default {
  getChatroomsInfo
};
