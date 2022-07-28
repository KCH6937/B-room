import { Request, Response } from 'express';
import statusCode from '@modules/statusCode';
import { success, fail } from '@modules/response';
import message from '@modules/message';

import companyChatroomService from '@services/companyChatRoom/companyChatRoom.service';

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
