import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
  constructor(message: string, status: number) {
    super(message, status);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class EmailAlreadyExistsException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT);
  }
}
