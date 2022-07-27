import { Request, Response } from 'express';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import departmentService from '@services/department/department.service';

const createDepartment = async (req: Request, res: Response) => {
  console.log('req.body:', req.body);
  try {
    const result = await departmentService.createDepartment(req.body);

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};
const updateDepartment = async (req: Request, res: Response) => {
  try {
    const result = await departmentService.updateDepartment(req);

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

export default {
  createDepartment,
  updateDepartment
};
