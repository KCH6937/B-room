import statusCode from '@modules/statusCode';
import { success } from '@modules/response';
import message from '@modules/message';
import setError from '@modules/setError';

const getTest = async () => {
  try {
    return success(statusCode.OK, message.SUCCESS);
  } catch (error) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getTest
};
