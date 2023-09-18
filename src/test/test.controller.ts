import {
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Redirect,
} from '@nestjs/common'

interface Task {
  id: number
  task: string
}

@Controller('task')
export class TestController {
  private tasks: Task[] = [
    { id: 1, task: 'task 1' },
    { id: 2, task: 'task 2' },
  ]
  @Get()
  //   @HttpCode(205)
  //   @Header('Test', 'testovich')
  //   @Redirect('https://ya.ru')
  getTask(): Task[] {
    return this.tasks
  }

  @Get(':id')
  getTaskById(@Param('id', { transform: (id) => +id }) id: number): Task {
    const task = this.tasks.find((t) => t.id === id)

    return task
  }

  //   @Post()
  //   @Put()
  //   @Delete()
  //   @Patch()
}
