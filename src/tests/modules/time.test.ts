import { toTimestamp, getDayDifference } from '../../modules/time';

describe('toTimestamp', () => {
  test('timestamp형식 string으로 변환되야함', () => {
    expect(toTimestamp('20220728', '20220729')).toEqual({
      convertedEndDate: '2022-07-29T00:00:00+09:00',
      convertedStartDate: '2022-07-28T00:00:00+09:00'
    });
  });
});

describe('getDayDifference', () => {
  test('1을 반환해야함', () => {
    expect(getDayDifference('20220728', '20220729')).toEqual(1);
  });
});
