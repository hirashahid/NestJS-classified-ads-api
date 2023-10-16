import { userDataResponse } from '@app/swagger-docs/response-data-example';

export const userProfileResponse = {
  description: 'Get user profile',
  schema: {
    example: userDataResponse,
  },
};

export const updateProfileResponse = {
  description: 'User has been updated succesfully',
  schema: {
    properties: {
      message: {
        description: 'User has been updated succesfully',
      },
      data: {
        type: 'object',
        example: userDataResponse,
      },
    },
  },
};
