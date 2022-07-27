import { User } from '@entities/User';

interface ICompanyNotice {
  id: number;
  title: string;
  content: string;
  user: User;
}

export default ICompanyNotice;
