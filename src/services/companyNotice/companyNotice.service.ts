import AppDataSource from '@config/data-source';
import { CompanyNotice } from '@entities/CompanyNotice';
import ICompanyNotice from '@interfaces/companyNotice/ICompanyNotice';
import message from '@modules/message';
import { success } from '@modules/response';
import setError from '@modules/setError';
import statusCode from '@modules/statusCode';
import { DeleteResult, InsertResult, Repository, UpdateResult } from 'typeorm';

const noticeRepository: Repository<CompanyNotice> =
  AppDataSource.getRepository(CompanyNotice);

const createNotice = async (noticeDto: ICompanyNotice) => {
  try {
    const notice: InsertResult = await noticeRepository
      .createQueryBuilder()
      .insert()
      .into(CompanyNotice)
      .values(noticeDto)
      .execute();

    return success(statusCode.CREATED, message.SUCCESS, {
      id: notice.generatedMaps[0].id
    });
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const updateNotice = async (noticeDto: ICompanyNotice) => {
  try {
    const notice: UpdateResult = await noticeRepository
      .createQueryBuilder()
      .update(CompanyNotice)
      .set(noticeDto)
      .where('id = :id', { id: noticeDto.id })
      .execute();

    if (notice?.affected === 0) {
      return setError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }

    return success(statusCode.OK, message.SUCCESS);
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteNotice = async (id: number) => {
  try {
    const notice: DeleteResult = await noticeRepository
      .createQueryBuilder()
      .delete()
      .from(CompanyNotice)
      .where('id = :id', { id })
      .execute();

    if (notice?.affected === 0) {
      return setError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }

    return success(statusCode.OK, message.SUCCESS);
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const getNotices = async () => {
  try {
    const notices: CompanyNotice[] | [] = await noticeRepository
      .createQueryBuilder('companynotice')
      .select([
        'companynotice.id',
        'companynotice.title',
        'companynotice.createdAt'
      ])
      .getMany();

    return success(statusCode.OK, message.SUCCESS, notices);
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const getNotice = async (id: number) => {
  try {
    const notice: CompanyNotice | null = await noticeRepository
      .createQueryBuilder('companynotice')
      .select([
        'companynotice.id',
        'companynotice.title',
        'companynotice.content',
        'companynotice.createdAt'
      ])
      .where('id = :id', { id })
      .getOne();

    return success(statusCode.OK, message.SUCCESS, notice);
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  createNotice,
  updateNotice,
  deleteNotice,
  getNotices,
  getNotice
};
