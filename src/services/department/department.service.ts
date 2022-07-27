import statusCode from '@modules/statusCode';
import { success } from '@modules/response';
import message from '@modules/message';
import setError from '@modules/setError';
import dataSource from '@config/data-source';
import { CompanyDepartment } from '@entities/CompanyDepartment';

const departmentRepositroy = dataSource.getRepository(CompanyDepartment);

const createDepartment = async (departmentDto: any) => {
  const { name }: { name: string } = departmentDto;

  if (name === '' || name == null || name == undefined) {
    return setError(statusCode.NOT_FOUND, message.NULL_VALUE);
  }

  try {
    const result = await departmentRepositroy
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
const updateDepartment = async (departmentDto: any) => {
  const { id: departmentId } = departmentDto.params;
  const { name } = departmentDto.body;

  try {
    await departmentRepositroy
      .createQueryBuilder()
      .update(CompanyDepartment)
      .set({ name })
      .where('id = :id', { id: departmentId })
      .execute();

    return success(statusCode.OK, message.SUCCESS);
  } catch (error) {
    return setError(
      statusCode.INTERAL_SERVER_ERROR,
      message.INTERNAL_SERVER_ERROR
    );
  }
};

export default {
  createDepartment,
  updateDepartment
};
