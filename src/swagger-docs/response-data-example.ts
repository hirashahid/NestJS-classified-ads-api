import { UserType } from '@app/modules/user/constants/user';
import { Gender } from '@prisma/client';

export const userDataResponse = {
  id: '1234',
  name: 'John doe',
  email: 'JohnDoe@gmail.com',
  type: UserType,
  phone: '00000',
  birthDate: '1999-15-12',
  gender: Gender,
  createdAt: '2023-10-11T08:55:23.094Z',
  updatedAt: '2023-10-11T08:55:23.094Z',
};
