import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { CustomException } from '@app/exceptions/custom.exception';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: CustomException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
