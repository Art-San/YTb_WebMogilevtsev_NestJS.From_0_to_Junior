import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { AllExceptionsFilter } from '@sfc/exception-filter/exception.filter'
import { CreateTaskDto } from './dto/create-task.dto'
import { ITask } from './task.interface'
import { TaskService } from './task.service'

// All Exception Filter можем вешать как на контроллер так и на метод через декоратор
@UseFilters(AllExceptionsFilter) // один инстанс на все приложение
// @UseFilters(new AllExceptionsFilter()) // лучше первый вариант
@Controller('task')
export class TaskController {
  constructor(private testService: TaskService) {}
  @Get()
  getTask(): ITask[] {
    return this.testService.getTask()
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): ITask {
    return this.testService.getTaskById(id)
  }
  @UsePipes(new ValidationPipe())
  @Post()
  createTask(@Body() dto: CreateTaskDto) {
    return this.testService.createTask(dto)
  }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string) {
  //   this.testService.remove(id) исправил
  // }
}
// рабатаем с ошибками (Exceptions-Исключения)
