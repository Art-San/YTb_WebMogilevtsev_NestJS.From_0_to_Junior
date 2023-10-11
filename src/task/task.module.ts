import { LoggerMiddleware } from './middleware/logger.middleware'
import { TaskService } from './task.service'
import { TaskController } from './task.controller'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'

@Module({
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(TaskController) // это на весь контролер, а можно указывать путь и конкретный метод
    // forRoutes({ path: 'ab*cd', method: RequestMethod.ALL });
  }
}

// Исключать пути
// consumer
//   .apply(LoggerMiddleware)
//   .exclude(
//     { path: 'cats', method: RequestMethod.GET },
//     { path: 'cats', method: RequestMethod.POST },
//     'cats/(.*)',
//   )
//   .forRoutes(CatsController);
