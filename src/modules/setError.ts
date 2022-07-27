import { ResError } from '@interfaces/common/resError.dto';

const setError = (statusCode: number, message: string) => {
  const error: ResError = new Error(message);
  error.statusCode = statusCode;

  return error;
};

export default setError;
