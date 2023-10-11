import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './exception-filter/exception.filter'
import { mainLogger } from './middlewares/main-logger-middleware'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllExceptionsFilter()) // передае инстанс этого класса
  app.use(mainLogger)
  await app.listen(3000)
}
bootstrap()
