const toStringTime = (month: number, date: number, day: number) => {
  let dayStr: string = '';
  switch (day) {
    case 0:
      dayStr = '일';
      break;
    case 1:
      dayStr = '월';
      break;
    case 2:
      dayStr = '화';
      break;
    case 3:
      dayStr = '수';
      break;
    case 4:
      dayStr = '목';
      break;
    case 5:
      dayStr = '금';
      break;
    case 6:
      dayStr = '토';
      break;
  }
  return `${month}월 ${date}일(${dayStr})`;
};

const getHour = (milli: number): number => {
  return Math.floor((milli / (1000 * 60 * 60)) % 24);
};
const getMinute = (milli: number): number => {
  return Math.floor((milli / (1000 * 60)) % 60);
};
const getSecond = (milli: number): number => {
  return Math.floor((milli / 1000) % 60);
};

const setKoreaTime = (date: Date): Date => {
  // 한국 시간으로 변환시키기 위해 9시간(밀리세컨드)를 더함
  return new Date(date.getTime() + 9 * 60 * 60 * 1000);
};

const timestampToDateTime = (timestamp: Date) => {
  const year: number = timestamp.getFullYear();
  const month: number = timestamp.getMonth() + 1;
  const date: number = timestamp.getDate();
  const day: number = timestamp.getDay();

  const millisecond: number = timestamp.getTime();
  const hour: string = getHour(millisecond).toString().padStart(2, '0');
  const minute: string = getMinute(millisecond).toString().padStart(2, '0');
  const second: string = getSecond(millisecond).toString().padStart(2, '0');

  return toStringTime(month, date, day) + ` ${hour}:${minute}:${second}`;
};

const getTotalHour = (from: Date, to: Date) => {
  const totalMillisecond: number = to.getTime() - from.getTime();
  const hour: number = getHour(totalMillisecond);
  const minute: number = getMinute(totalMillisecond);
  const second: number = getSecond(totalMillisecond);

  return `${hour}H`;
};

export default {
  setKoreaTime,
  timestampToDateTime,
  getTotalHour
};
