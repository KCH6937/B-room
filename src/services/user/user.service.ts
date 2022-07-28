import bcrypt from 'bcrypt';
import statusCode from '@modules/statusCode';
import message from '@modules/message';
import setError from '@modules/setError';
import AppDataSource from '@config/data-source';
import { success } from '@modules/response';
import { User } from 'src/entities/User';
import { CompanyDepartment } from 'src/entities/CompanyDepartment';
import { UserDto } from '@interfaces/common/user/userDto';
import { signAccessToken } from '@modules/jwt';

const register = async (userDto: UserDto) => {
  const { email, password, department } = userDto;

  try {
    const user: User | null = await AppDataSource.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();

    if (user) {
      return setError(statusCode.BAD_REQUEST, message.DUPLICATE_EMAIL);
    }

    const companyDepartment: CompanyDepartment | null =
      await AppDataSource.createQueryBuilder()
        .select('companyDepartment.id')
        .from(CompanyDepartment, 'companyDepartment')
        .where('companyDepartment.name = :department', { department })
        .getOne();

    if (!companyDepartment) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_DEPARTMENT_INFO);
    }

    userDto.companyDepartmentId = companyDepartment.id;
    userDto.password = bcrypt.hashSync(password, 10);

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values(userDto)
      .execute();

    return success(statusCode.OK, message.SUCCESS);
  } catch (error) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const login = async (userDto: UserDto) => {
  const { email, password } = userDto;

  try {
    const user: User | null = await AppDataSource.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const accessToken = signAccessToken(user.id, user.authority);

    return success(statusCode.OK, message.SUCCESS, accessToken);
  } catch (error) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const editUser = async (userDto: UserDto) => {
  const { id, email, password, department } = userDto;

  try {
    const user: User | null = await AppDataSource.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { id })
      .getOne();

    if (!user) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set(userDto)
      .where('user.id = :id', { id })
      .execute();

    const accessToken = signAccessToken(user.id, user.authority);

    return success(statusCode.OK, message.SUCCESS, accessToken);
  } catch (error) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteUser = async (userId: number) => {
  try {
    const user: User | null = await AppDataSource.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where('user.id = :id', { userId })
      .getOne();

    if (!user) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .softDelete()
      .from(User, 'user')
      .where('user.id = :id', { userId })
      .execute();

    return success(statusCode.OK, message.SUCCESS);
  } catch (error) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  register,
  login,
  editUser,
  deleteUser
};
