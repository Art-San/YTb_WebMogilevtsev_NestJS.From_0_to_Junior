import { HttpException, HttpStatus } from '@nestjs/common'

interface IError {
  message?: never // never защита от переопределения
  error?: never
  createdAt?: never
  [k: string]: string
}
export class NotFoundTaskException extends HttpException {
  constructor(error: IError = null) {
    super(
      {
        message: 'Такая task не была найдена',
        error: 'not_found_task',
        createdAt: new Date(),
        ...error,
      },
      HttpStatus.NOT_FOUND
    )
  }
}
