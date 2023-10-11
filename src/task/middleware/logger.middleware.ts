import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

// Классовый Middleware а функциональный в src/middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name) // LoggerMiddleware в консоли будет указано откуда идет логирование
  use(req: Request, res: Response, next: () => void) {
    const { body } = req
    this.logger.verbose(`Body is ${JSON.stringify(body, null, 2)}`)
    next()
  }
}
// его надо еще подключить task.module.ts
