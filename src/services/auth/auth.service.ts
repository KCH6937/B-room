import statusCode from '@modules/statusCode';
import { success } from '@modules/response';
import message from '@modules/message';
import setError from '@modules/setError';
import dataSource from '@config/data-source';
import { User } from '@entities/User';

const userRepository = dataSource.getRepository(User);

const getAuthority = async (userInfo: any) => {
  const { id, authority }: { id: number; authority: number } = userInfo;

  try {
    const result = await userRepository
      .createQueryBuilder('u')
      .select(['h.authority'])
      .where('h.id = :id', { id })
      .getOne();

    console.log(result);
  } catch (error: any) {
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getAuthority
};
