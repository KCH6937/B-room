import ICompanyNotice from '@interfaces/companyNotice/ICompanyNotice';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import companyNoticeService from '@services/companyNotice/companyNotice.service';
import { Request, Response } from 'express';

const createNotice = async (req: Request, res: Response) => {
  // WARN : 나중에 userId를 토큰으로 받아서 처리 변경
  const noticeDto: ICompanyNotice = {
    user: req.body.userId,
    ...req.body
  };

  try {
    const result = await companyNoticeService.createNotice(noticeDto);
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

const updateNotice = async (req: Request, res: Response) => {
  const noticeDto: ICompanyNotice = {
    id: req.params.id,
    ...req.body
  };

  try {
    const result = await companyNoticeService.updateNotice(noticeDto);
    if (result instanceof Error) {
      throw result;
    }

    return res.status(statusCode.OK).end();
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .json(fail(error.statusCode, error.message));
  }
};

export default {
  createNotice,
  updateNotice
};
