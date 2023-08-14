import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';

@Catch(HttpException)
export class RedirectOn401Filter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException && exception.getStatus() === 401) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();
      response.redirect('/login');
      return;
    }

    super.catch(exception, host);
  }
}
