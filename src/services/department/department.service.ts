import statusCode from '@modules/statusCode';
import { success } from '@modules/response';
import message from '@modules/message';
import setError from '@modules/setError';
import dataSource from '@config/data-source';
import { CompanyDepartment } from '@entities/CompanyDepartment';
import { User } from '@entities/User';
import { DepartmentDto } from '@interfaces/department/department.dto';

const departmentRepository = dataSource.getRepository(CompanyDepartment);
const userRepository = dataSource.getRepository(User);

const getAllDepartment = async () => {
  try {
    const result = await userRepository
      .createQueryBuilder('u')
      .orderBy('d.id', 'ASC')
      .select(['u.id', 'u.name', 'd.name'])
      .leftJoin('u.companyDepartment', 'd')
      .orderBy('d.id', 'ASC')
      .getMany();

    return success(statusCode.OK, message.SUCCESS, result);
  } catch (error: any) {
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};
const getDepartment = async (request: any) => {
  const { id: departmentId }: DepartmentDto = request.params;

  try {
    const result = await userRepository
      .createQueryBuilder('u')
      .orderBy('u.id', 'ASC')
      .select(['u.id', 'u.name', 'd.name'])
      .leftJoin('u.companyDepartment', 'd')
      .orderBy('d.id', 'ASC')
      .where('d.id = :id', { id: departmentId })
      .getMany();

    return success(statusCode.OK, message.SUCCESS, result);
  } catch (error: any) {
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};
const createDepartment = async (request: any) => {
  const { name }: { name: string } = request.body;
  const { authority } = request.userInfo;

  if (name === '' || name == null || name == undefined) {
    return setError(statusCode.NOT_FOUND, message.NULL_VALUE);
  } else if (authority === 0) {
    return setError(statusCode.UNAUTHORIZED, message.UNAUTHORIZED);
  } else {
    try {
      const result = await departmentRepository
        .createQueryBuilder()
        .insert()
        .into(CompanyDepartment)
        .values({
          name
        })
        .execute();

      return success(statusCode.CREATED, message.SUCCESS, result.generatedMaps);
    } catch (error: any) {
      return setError(
        statusCode.INTERAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR
      );
    }
  }
};
const updateDepartment = async (request: any) => {
  const { id: departmentId }: DepartmentDto = request.params;
  const { name }: DepartmentDto = request.body;
  const { authority } = request.userInfo;

  if (authority === 0) {
    return setError(statusCode.UNAUTHORIZED, message.UNAUTHORIZED);
  } else {
    try {
      await departmentRepository
        .createQueryBuilder()
        .update(CompanyDepartment)
        .set({ name })
        .where('id = :id', { id: departmentId })
        .execute();

      return success(statusCode.OK, message.SUCCESS);
    } catch (error: any) {
      return setError(
        statusCode.INTERAL_SERVER_ERROR,
        message.INTERNAL_SERVER_ERROR
      );
    }
  }
};

export default {
  getAllDepartment,
  getDepartment,
  createDepartment,
  updateDepartment
};
