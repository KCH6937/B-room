import statusCode from '@modules/statusCode';
import { success } from '@modules/response';
import message from '@modules/message';
import setError from '@modules/setError';
import dataSource from '@config/data-source';
import { Holiday } from '@entities/Holiday';
import { HolidayDto } from '@interfaces/holiday/holiday.dto';
import { toTimestamp, getDayDifference } from '@modules/time';

const holidaysRepository = dataSource.getRepository(Holiday);

const getAllHoliday = async (request: any) => {
  const { type } = request.query;
  const { id, authority } = request.userInfo;
  if (authority === 0) {
    //구성원 권한 조회
    try {
      const result = await holidaysRepository
        .createQueryBuilder('h')
        .orderBy('h.id', 'DESC')
        .select([
          'h.id',
          'h.startDate',
          'h.endDate',
          'h.holidaySum',
          'u.id',
          'u.name',
          'u.email'
        ])
        .leftJoin('h.user', 'u')
        .where('h.signType = :type', { type })
        .andWhere('h.user = :user', { user: id })
        .getMany();

      return success(statusCode.OK, message.SUCCESS, result);
    } catch (error: any) {
      return setError(
        statusCode.INTERAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR
      );
    }
  } else if (authority === 1) {
    //관리자 권한 조회
    try {
      const result = await holidaysRepository
        .createQueryBuilder('h')
        .orderBy('h.id', 'DESC')
        .select([
          'h.id',
          'h.startDate',
          'h.endDate',
          'h.holidaySum',
          'u.id',
          'u.name',
          'u.email'
        ])
        .leftJoin('h.user', 'u')
        .where('h.signType = :type', { type })
        .getMany();

      return success(statusCode.OK, message.SUCCESS, result);
    } catch (error: any) {
      return setError(
        statusCode.INTERAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR
      );
    }
  } else {
    return setError(statusCode.BAD_REQUEST, message.BAD_REQUEST);
  }
};
const createHoliday = async (request: any) => {
  const { startDate, endDate }: HolidayDto = request.body;
  const { id } = request.userInfo;

  const { convertedStartDate, convertedEndDate } = toTimestamp(
    startDate,
    endDate
  );
  const dayDifference = getDayDifference(startDate, endDate);

  try {
    const result = await holidaysRepository
      .createQueryBuilder()
      .insert()
      .into(Holiday)
      .values({
        startDate: convertedStartDate,
        endDate: convertedEndDate,
        holidaySum: dayDifference,
        user: { id }
      })
      .execute();

    return success(statusCode.CREATED, message.SUCCESS, result.generatedMaps);
  } catch (error: any) {
    console.error(error);
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const updateHoliday = async (request: any) => {
  const { id: holidayId } = request.params;
  const { startDate, endDate, signType }: HolidayDto = request.body;
  const { authority } = request.userInfo;
  const { convertedStartDate, convertedEndDate } = toTimestamp(
    startDate,
    endDate
  );
  const dayDifference = getDayDifference(startDate, endDate);

  if (authority === 0) {
    //구성원 : 휴가 수정 신청
    try {
      await holidaysRepository
        .createQueryBuilder()
        .update(Holiday)
        .set({
          startDate: convertedStartDate,
          endDate: convertedEndDate,
          holidaySum: dayDifference
        })
        .where('id = :id', { id: holidayId })
        .execute();

      return success(statusCode.OK, message.SUCCESS);
    } catch (error: any) {
      return setError(
        statusCode.INTERAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR
      );
    }
  } else if (authority === 1) {
    //관리자 : 휴가 승인 / 거부
    try {
      await holidaysRepository
        .createQueryBuilder()
        .update(Holiday)
        .set({
          startDate: convertedStartDate,
          endDate: convertedEndDate,
          holidaySum: dayDifference,
          signType
        })
        .where('id = :id', { id: holidayId })
        .execute();

      return success(statusCode.OK, message.SUCCESS);
    } catch (error: any) {
      return setError(
        statusCode.INTERAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR
      );
    }
  } else {
    return setError(statusCode.BAD_REQUEST, message.BAD_REQUEST);
  }
};
const deleteHoliday = async (request: any) => {
  const { id: holidayId } = request.params;

  try {
    await holidaysRepository
      .createQueryBuilder()
      .delete()
      .from(Holiday)
      .where('id = :id', { id: holidayId })
      .execute();

    return success(statusCode.OK, message.SUCCESS);
  } catch (error: any) {
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getAllHoliday,
  createHoliday,
  updateHoliday,
  deleteHoliday
};
