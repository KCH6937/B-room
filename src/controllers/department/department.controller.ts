import { Request, Response } from 'express';
import { fail } from '@modules/response';
import statusCode from '@modules/statusCode';
import departmentService from '@services/department/department.service';

const getAllDepartment = async (req: Request, res: Response) => {
  try {
    const result = await departmentService.getAllDepartment();

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};
const getDepartment = async (req: Request, res: Response) => {
  try {
    const result = await departmentService.getDepartment(req);

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};
const createDepartment = async (req: Request, res: Response) => {
  try {
    const result = await departmentService.createDepartment(req.body);

    if (result instanceof Error) {
      throw result;
    }

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

    if (result instanceof Error) {
      throw result;
    }

    return res.status(statusCode.OK).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

export default {
  getAllDepartment,
  getDepartment,
  createDepartment,
  updateDepartment
};
