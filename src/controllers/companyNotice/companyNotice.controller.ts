import ICompanyNotice from '@interfaces/companyNotice/ICompanyNotice';
import message from '@modules/message';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import companyNoticeService from '@services/companyNotice/companyNotice.service';
import { Request, Response } from 'express';

const createNotice = async (req: Request, res: Response) => {
  // WARN : 나중에 userId를 토큰으로 받아서 처리 변경
  const noticeDto: ICompanyNotice = {
    user: req.user.id,
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

const deleteNotice = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  try {
    const result = await companyNoticeService.deleteNotice(id);
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

const getNotices = async (req: Request, res: Response) => {
  try {
    const result = await companyNoticeService.getNotices();

    return res.status(statusCode.OK).json(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .json(fail(error.statusCode, error.message));
  }
};

const getNotice = async (req: Request, res: Response) => {
  const id: number = Number(req.params.id);

  try {
    const result = await companyNoticeService.getNotice(id);
    if (result === null) {
      return res
        .status(statusCode.NOT_FOUND)
        .json(fail(statusCode.NOT_FOUND, message.NOT_FOUND));
    }

    return res.status(statusCode.OK).json(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .json(fail(error.statusCode, error.message));
  }
};

export default {
  createNotice,
  updateNotice,
  deleteNotice,
  getNotices,
  getNotice
};
