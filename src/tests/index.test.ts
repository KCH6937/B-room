import { getDayDifference } from '../modules/time';

describe('getDayDifference 모듈 테스트', () => {
  test('endDate - startDate로 일 차이 계산', () => {
    expect(getDayDifference('20220728', '20220729')).toEqual(1);
  });
});
