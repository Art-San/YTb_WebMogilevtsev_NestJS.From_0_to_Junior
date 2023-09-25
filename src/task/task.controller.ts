import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  // UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
// import { AllExceptionsFilter } from '@sfc/exception-filter/exception.filter'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { ITask } from './task.interface'
import { TaskService } from './task.service'

// All Exception Filter можем вешать как на контроллер так и на метод через декоратор
// @UseFilters(AllExceptionsFilter) // один инстанс на все приложение ЛУЧШИЙ ВАРИАНТ но ЭТО не Глобально подключено (main.ts)
// @UseFilters(new AllExceptionsFilter()) // лучше первый вариант
@Controller('task')
export class TaskController {
  constructor(private testService: TaskService) {}
  @Get()
  getTask(): ITask[] {
    // throw new HttpException('Какая-то ошибка', 400)
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

  @UsePipes(new ValidationPipe())
  @Put(':id')
  updateTask(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.testService.updateTask(id, dto)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    this.testService.remove(id)
  }
}
