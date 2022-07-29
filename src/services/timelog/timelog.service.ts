import AppDataSource from '@config/data-source';
import { TimeLog } from '@entities/TimeLog';
import { User } from '@entities/User';
import message from '@modules/message';
import { success } from '@modules/response';
import setError from '@modules/setError';
import statusCode from '@modules/statusCode';
import customTime from '@modules/timestamp';

interface ITimeLog {
  user: User;
}

const timelogRepository = AppDataSource.getRepository(TimeLog);

const fromWork = async (data: ITimeLog) => {
  try {
    const timelog = await timelogRepository
      .createQueryBuilder()
      .insert()
      .into(TimeLog)
      .values(data)
      .execute();

    const resData = {
      id: timelog.generatedMaps[0].id,
      fromWork: timelog.generatedMaps[0].fromWork
    };
    return success(statusCode.CREATED, message.SUCCESS, resData);
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const toWork = async (id: number) => {
  try {
    const now = customTime.setKoreaTime(new Date());

    const timelog = await timelogRepository
      .createQueryBuilder()
      .update(TimeLog)
      .set({ toWork: now })
      .where('id = :id', { id })
      .execute();

    if (timelog?.affected === 0) {
      return setError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const getDailyTime = async (id: number) => {
  try {
    const timelog = await timelogRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();

    if (timelog === null) {
      return setError(statusCode.NOT_FOUND, message.NOT_FOUND);
    }

    const fromTime = customTime.timestampToDateTime(timelog.fromWork);
    const toTime = customTime.timestampToDateTime(timelog.toWork);
    const totalTime = customTime.getTotalHour(timelog.fromWork, timelog.toWork);
    const data = {
      id: timelog.id,
      fromWork: fromTime,
      toWork: toTime,
      timeWork: totalTime
    };

    return success(statusCode.OK, message.SUCCESS, data);
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  fromWork,
  toWork,
  getDailyTime
};
