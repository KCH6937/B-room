import bcrypt from 'bcrypt';
import { omit } from 'lodash';
import statusCode from '@modules/statusCode';
import message from '@modules/message';
import setError from '@modules/setError';
import AppDataSource from '@config/data-source';
import { success } from '@modules/response';
import { User } from 'src/entities/User';
import { CompanyDepartment } from 'src/entities/CompanyDepartment';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginUserDto
} from '@interfaces/user/user.dto';
import { signAccessToken } from '@modules/jwt';

const getUser = async (
  columnType: string,
  value: string | number
): Promise<User | null> => {
  try {
    const user: User | null = await AppDataSource.createQueryBuilder()
      .select('user')
      .from(User, 'user')
      .where(`user.${columnType} = :value`, { value })
      .getOne();

    return user;
  } catch (error: any) {
    throw setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const getCompanyDepartment = async (
  columnType: string,
  value: string | number | object
): Promise<CompanyDepartment | null> => {
  try {
    const companyDepartment: CompanyDepartment | null =
      await AppDataSource.createQueryBuilder()
        .select('companyDepartment')
        .from(CompanyDepartment, 'companyDepartment')
        .where(`companyDepartment.${columnType} = :value`, { value })
        .getOne();

    return companyDepartment;
  } catch (error: any) {
    throw setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const register = async (userDto: CreateUserDto) => {
  const { email, password, department } = userDto;

  try {
    const user: User | null = await getUser('email', email!);
    if (user) {
      return setError(statusCode.BAD_REQUEST, message.DUPLICATE_EMAIL);
    }

    const companyDepartment: CompanyDepartment | null =
      await getCompanyDepartment('name', department);

    if (!companyDepartment) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_DEPARTMENT_INFO);
    }

    userDto.companyDepartment = { id: companyDepartment.id };
    userDto.password = bcrypt.hashSync(password, 10);

    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values(userDto)
      .execute();

    return success(statusCode.OK, message.SUCCESS);
  } catch (error: any) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const login = async (userDto: LoginUserDto) => {
  const { email, password } = userDto;

  try {
    const user: User | null = await getUser('email', email!);

    if (!user) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);
    if (!isValidPassword) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    const accessToken = signAccessToken(user.id, user.authority);

    return success(statusCode.OK, message.SUCCESS, accessToken);
  } catch (error: any) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const updateUser = async (userDto: UpdateUserDto) => {
  const { id, password, department } = userDto;

  try {
    const user: User | null = await getUser('id', id!);

    if (!user) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    if (userDto.password) {
      userDto.password = bcrypt.hashSync(password, 10);
    }

    if (department) {
      const companyDepartment: CompanyDepartment | null =
        await getCompanyDepartment('name', department);
      if (!companyDepartment) {
        return setError(
          statusCode.BAD_REQUEST,
          message.INVALID_DEPARTMENT_INFO
        );
      }
      userDto.companyDepartment = { id: companyDepartment.id };
    }

    const updateUserResult = omit(userDto, ['department']);

    await AppDataSource.createQueryBuilder()
      .update(User)
      .set(updateUserResult)
      .where('user.id = :id', { id })
      .execute();

    return success(statusCode.OK, message.SUCCESS, updateUserResult);
  } catch (error: any) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const deleteUser = async (userId: number) => {
  try {
    const user: User | null = await getUser('id', userId!);

    if (!user) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    await AppDataSource.createQueryBuilder()
      .softDelete()
      .from(User, 'user')
      .where('user.id = :userId', { userId })
      .execute();

    return success(statusCode.OK, message.SUCCESS);
  } catch (error: any) {
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

const getUserAbout = async (userId: number) => {
  try {
    const user: User | null = await AppDataSource.createQueryBuilder(
      User,
      'user'
    )
      .leftJoinAndSelect('user.companyDepartment', 'companyDepartment')
      .where('user.id = :userId', { userId })
      .getOne();
    if (!user) {
      return setError(statusCode.BAD_REQUEST, message.INVALID_USER_INFO);
    }

    return success(statusCode.OK, message.SUCCESS, {
      name: user.name,
      email: user.email,
      department: user.companyDepartment.name
    });
  } catch (error: any) {
    console.log(error);
    return setError(
      statusCode.SERVICE_UNAVAILABLE,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  register,
  login,
  getUserAbout,
  updateUser,
  deleteUser
};
