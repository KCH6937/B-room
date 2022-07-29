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
  console.log('type: ', type);

  try {
    const result = await holidaysRepository
      .createQueryBuilder('h')
      .orderBy('h.id', 'DESC')
      .select(['h.id', 'h.startDate', 'h.endDate', 'h.holidaySum'])
      .where('h.signType = :type', { type })
      .andWhere('h.user = :user', { user: 1 })
      .getMany();

    return success(statusCode.OK, message.SUCCESS, result);
  } catch (error: any) {
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};
const createHoliday = async (requestBody: any) => {
  const { startDate, endDate }: HolidayDto = requestBody;

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
        holidaySum: dayDifference
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
  const { convertedStartDate, convertedEndDate } = toTimestamp(
    startDate,
    endDate
  );
  const dayDifference = getDayDifference(startDate, endDate);

  //구성원 : 휴가 수정 신청
  // try {
  //   await holidaysRepository
  //     .createQueryBuilder()
  //     .update(Holiday)
  //     .set({
  //       startDate: convertedStartDate,
  //       endDate: convertedEndDate,
  //       holidaySum: dayDifference,
  //     })
  //     .where('id = :id', { id: holidayId })
  //     .execute();

  //   return success(statusCode.OK, message.SUCCESS);
  // } catch (error: any) {
  //   return setError(
  //     statusCode.INTERAL_SERVER_ERROR,
  //     message.INTERNAL_SERVER_ERROR
  //   );
  // }
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
};
const deleteHoliday = async (request: any) => {
  //로그인된 유저id로 auth 검사
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
