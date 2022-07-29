import { request, Request, Response } from 'express';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import holidayService from '@services/holiday/holiday.service';

const getAllHoliday = async (req: Request, res: Response) => {
  try {
    const result = await holidayService.getAllHoliday(req);

    if (result instanceof Error) {
      throw result;
    }

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};
const createHoliday = async (req: Request, res: Response) => {
  try {
    const result = await holidayService.createHoliday(req);

    if (result instanceof Error) {
      throw result;
    }

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};
const updateHoliday = async (req: Request, res: Response) => {
  try {
    const result = await holidayService.updateHoliday(req);

    if (result instanceof Error) {
      throw result;
    }

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};
const deleteHoliday = async (req: Request, res: Response) => {
  try {
    const result = await holidayService.deleteHoliday(req);

    if (result instanceof Error) {
      throw result;
    }

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

export default {
  getAllHoliday,
  createHoliday,
  updateHoliday,
  deleteHoliday
};
