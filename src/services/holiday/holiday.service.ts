import statusCode from '@modules/statusCode';
import { success } from '@modules/response';
import message from '@modules/message';
import setError from '@modules/setError';
import dataSource from '@config/data-source';
import { Holiday } from '@entities/Holiday';
import { HolidayDto } from '@interfaces/holiday/holiday.dto';
import { toTimestamp, getDayDifference } from '@modules/time';

const holidaysRepository = dataSource.getRepository(Holiday);

const createHoliday = async (requestBody: any) => {
  const { startDate, endDate }: HolidayDto = requestBody;
  //토큰 받아서 추가로 user_id 넣어주기

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

export default {
  createHoliday
};
