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
      .select(['u.id', 'u.name', 'd.id', 'd.name'])
      .leftJoin('u.companyDepartment', 'd')
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
      .select(['u.id', 'u.name', 'd.id', 'd.name'])
      .leftJoin('u.companyDepartment', 'd')
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
const createDepartment = async (requestBody: Object) => {
  const { name }: DepartmentDto = requestBody;

  if (name === '' || name == null || name == undefined) {
    return setError(statusCode.NOT_FOUND, message.NULL_VALUE);
  }

  try {
    const result = await departmentRepository
      .createQueryBuilder()
      .insert()
      .into(CompanyDepartment)
      .values({
        name
      })
      .execute();

    return success(statusCode.OK, message.CREATED, result.generatedMaps);
  } catch (error: any) {
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};
const updateDepartment = async (request: any) => {
  const { id: departmentId }: DepartmentDto = request.params;
  const { name }: DepartmentDto = request.body;

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
};
const deleteDepartment = async (request: any) => {
  const { id: departmentId }: DepartmentDto = request.params;
  console.log('departmentId: ', departmentId);

  try {
    const result = await departmentRepository
      .createQueryBuilder()
      .delete()
      .from(CompanyDepartment)
      .where('id = :id', { id: departmentId })
      .execute();

    console.log('result: ', result);
    return success(statusCode.OK, message.SUCCESS);
  } catch (error: any) {
    if (error.errno === 1451) {
      return setError(statusCode.DB_ERROR, message.BAD_REQUEST);
    }
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  getAllDepartment,
  getDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment
};
