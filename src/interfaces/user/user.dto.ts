export interface UserDto {
  id: number;
  name: string;
  email: string;
  password: string;
  authority: number;
  companyDepartment?: object;
  department: string;
}

export type CreateUserDto = Pick<
  UserDto,
  'email' | 'password' | 'name' | 'department' | 'companyDepartment'
>;

export type LoginUserDto = Pick<UserDto, 'email' | 'password'>;

export type UpdateUserDto = Pick<
  UserDto,
  'id' | 'name' | 'password' | 'department' | 'companyDepartment'
>;
