import { Request, Response } from 'express';
import { fail } from '@modules/response';
import userService from '@services/user/user.service';
import { CreateUserDto, LoginUserDto } from '@interfaces/user/user.dto';

const register = async (req: Request, res: Response) => {
  const { email, password, name, department }: CreateUserDto = req.body;
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
  const { email, password }: LoginUserDto = req.body;
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

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.userInfo;
  const { name, password, department } = req.body;
  try {
    const result = await userService.updateUser({
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
  const { id: userId } = req.userInfo;
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

const getUserAbout = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const result = await userService.getUserAbout(Number(userId));

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
  getUserAbout,
  updateUser,
  deleteUser
};
