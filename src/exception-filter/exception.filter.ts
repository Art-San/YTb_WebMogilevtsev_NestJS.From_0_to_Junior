import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger = new Logger(AllExceptionsFilter.name) // это будет инстанс Logger встроенный nestJS далее мы передаем имя нашего обработчика
  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(exception) // далее мы можем вызыватье его передавать ему error и непосредственно саму ошибку
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR // вернет 500

    if (status !== HttpStatus.INTERNAL_SERVER_ERROR) {
      response.status(status).json(exception)
      return
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    })
  }
}
