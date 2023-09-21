import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { ITask } from './task.interface'
import { TaskService } from './task.service'

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

  @Post()
  createTask(@Body('task') task: string): ITask {
    return this.testService.createTask(task)
  }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string) {
  //   this.testService.remove(id) исправил
  // }
}
