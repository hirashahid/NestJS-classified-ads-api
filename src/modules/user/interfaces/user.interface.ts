import { UserType, Gender } from '../constants/user';

export interface UserInterface {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  type: UserType;
  phone: string | null;
  birth_date: Date | null;
  address: string | null;
  gender: Gender | null;
  salt: string;
  created_at: Date | null;
  updated_at: Date | null;
  deleted_at: Date | null;
}
