import { userDataResponse } from '@app/swagger-docs/response-data-example';

export const loginResponse = {
  description: 'User has logged in successfully',
  schema: {
    properties: {
      message: {
        description: 'User has been logged in successfully',
      },
      data: {
        type: 'object',
        example: userDataResponse,
      },
    },
  },
};

export const registrationResponse = {
  description: 'User has been registered successfully',
  schema: {
    properties: {
      message: {
        description: 'User has been registered successfully',
      },
      data: {
        type: 'object',
        example: userDataResponse,
      },
    },
  },
};
