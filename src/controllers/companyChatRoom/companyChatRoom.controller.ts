import { Request, Response } from 'express';
import statusCode from '@modules/statusCode';
import { fail } from '@modules/response';
import {
  CreateChatRoomInputDto,
  CreateChatRoomDto
} from '@interfaces/companyChat/createChatRoom.dto';
import companyChatRoomService from '@services/companyChatRoom/companyChatRoom.service';

const getChatRoomsInfo = async (req: Request, res: Response) => {
  try {
    const result = await companyChatRoomService.getChatRoomsInfo();
    return res.status(statusCode.OK).json(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .json(fail(error.statusCode, error.message));
  }
};

const createChatRoom = async (req: Request, res: Response) => {
  const createChatRoomInputDto: CreateChatRoomInputDto = req.body;
  const { id: userId } = req.userInfo;

  const createChatRoomDto: CreateChatRoomDto = {
    title: createChatRoomInputDto.title,
    userId
  };
  try {
    const result = await companyChatRoomService.createChatRoom(
      createChatRoomDto
    );

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
  getChatRoomsInfo,
  createChatRoom
};
