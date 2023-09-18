import { TestController } from './test/test.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [],
  controllers: [TestController],
})
export class AppModule {}
