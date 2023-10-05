import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import {
  HttpStatus,
  UnprocessableEntityException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

import { AppModule } from '@app/app.module';
import { CustomExceptionFilter } from '@app/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const validationErrorsResult =
          (validationErrors &&
            validationErrors.map((errors) => {
              if (errors.children.length > 0) {
                const nestedErrors = errors.children.map((child) => {
                  if (child.children.length > 0)
                    return child.children.map((child) => {
                      return {
                        property: child.property,
                        errors: Object.values(child.constraints),
                      };
                    });
                  return {
                    property: child.property,
                    errors: Object.values(child.constraints),
                  };
                });
                return nestedErrors;
              } else {
                return {
                  property: errors.property,
                  errors: Object.values(errors.constraints),
                };
              }
            })) ||
          [];
        return new UnprocessableEntityException(validationErrorsResult);
      },
    }),
  );

  //global exception filter
  app.useGlobalFilters(new CustomExceptionFilter());

  app.use(cookieParser());

  await app.listen(3000);
}
bootstrap();
