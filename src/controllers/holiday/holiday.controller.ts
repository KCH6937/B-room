import { Request, Response } from 'express';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import holidayService from '@services/holiday/holiday.service';

const createHoliday = async (req: Request, res: Response) => {
  try {
    const result = await holidayService.createHoliday(req.body);

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
  createHoliday
};
