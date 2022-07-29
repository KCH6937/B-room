import { Request, Response } from 'express';
import { fail } from '@modules/response';
import companyChatService from '@services/companyChatRoom/companyChatRoom.service';
import {
  CreateChatRoomInputDto,
  CreateChatRoomDto
} from '@interfaces/companyChat/createChatRoom.dto';
import statusCode from '@modules/statusCode';

const createChatRoom = async (req: Request, res: Response) => {
  const createChatRoomInputDto: CreateChatRoomInputDto = req.body;
  const { id: userId } = req.userInfo;

  const createChatRoomDto: CreateChatRoomDto = {
    title: createChatRoomInputDto.title,
    userId
  };
  try {
    const result = await companyChatService.createChatRoom(createChatRoomDto);

    if (result instanceof Error) {
      throw result;
    }
    return res.status(statusCode.CREATED).json(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .json(fail(error.statusCode, error.message));
  }
};

export default {
  createChatRoom
};
