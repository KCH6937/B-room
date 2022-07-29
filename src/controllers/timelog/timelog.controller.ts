import message from '@modules/message';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import timelogService from '@services/timelog/timelog.service';
import { Request, Response } from 'express';

const createFromWork = async (req: Request, res: Response) => {
  const data = {
    user: req.userInfo
  };

  try {
    const result = await timelogService.fromWork(data);
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

const updateToWork = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);
  try {
    const result = await timelogService.toWork(id);
    if (result instanceof Error) {
      throw result;
    }

    const timelog = await timelogService.getDailyTime(id);
    if (timelog instanceof Error) {
      throw result;
    }

    return res.status(statusCode.OK).json(timelog);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .json(fail(error.statusCode, error.message));
  }
};

export default {
  createFromWork,
  updateToWork
};
