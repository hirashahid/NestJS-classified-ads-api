import { UserType, Gender, RoleType } from '../constants/user';

export interface UserInterface {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
  role: RoleType;
  phone: string;
  birth_date: Date | null;
  address: string | null;
  gender: Gender | null;
  salt: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
}
