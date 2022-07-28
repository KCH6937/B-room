import { Request, Response } from 'express';
import { fail } from '@modules/response';
import userService from '@services/user/user.service';

const register = async (req: Request, res: Response) => {
  const { email, password, name, department } = req.body;
  try {
    const result = await userService.register({
      email,
      password,
      name,
      department
    });

    if (result instanceof Error) {
      throw result;
    }

    res.status(result.status).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const result = await userService.login({
      email,
      password
    });

    if (result instanceof Error) {
      throw result;
    }

    res.status(result.status).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

const editUser = async (req: Request, res: Response) => {
  const { userId: id, name, password, department } = req.body;
  try {
    const result = await userService.editUser({
      id,
      name,
      password,
      department
    });

    if (result instanceof Error) {
      throw result;
    }

    res.status(result.status).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.body;
  try {
    const result = await userService.deleteUser(userId);

    if (result instanceof Error) {
      throw result;
    }

    res.status(result.status).send(result);
  } catch (error: any) {
    return res
      .status(error.statusCode)
      .send(fail(error.statusCode, error.message));
  }
};

export default {
  register,
  login,
  editUser,
  deleteUser
};
