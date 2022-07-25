import { Request, Response } from 'express';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import testService from '@services/test.service';

const getTest = async (req: Request, res: Response) => {
  try {
    const result = await testService.getTest();

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

export default {
  getTest
};
