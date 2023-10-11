import { Logger } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

export function mainLogger(req: Request, res: Response, next: NextFunction) {
  Logger.debug('Main logger', 'main')
  next() // next Обязательно, а то приложение остановится
}
