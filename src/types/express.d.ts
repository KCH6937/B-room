import { User } from '@entities/User';

declare global {
  namespace Express {
    interface Request {
      userInfo: User;
    }
  }
}
