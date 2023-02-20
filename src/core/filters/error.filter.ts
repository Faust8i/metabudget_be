import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ErrorFilter implements ExceptionFilter {
  catch(error: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = error instanceof HttpException ? error.getStatus() : 500;

    const message = error.message || 'Внутренняя ошибка сервера';
    const messageUserError = error['userError'];
    
    console.error(error);
    console.log(messageUserError);

    response.status(status).json({ message, messageUserError });
  }
}
