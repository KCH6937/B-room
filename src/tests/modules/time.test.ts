import { getDayDifference } from '../../modules/time';

describe('getDayDifference', () => {
  test('1을 반환해야함', () => {
    expect(getDayDifference('20220728', '20220729')).toEqual(1);
  });
});
