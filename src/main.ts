import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AllExceptionsFilter } from './exception-filter/exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalFilters(new AllExceptionsFilter()) // передае инстанс этого класса
  await app.listen(3000)
}
bootstrap()
