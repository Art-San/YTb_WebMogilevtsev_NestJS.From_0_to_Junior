import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
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
  createTask(@Body() dto: CreateTaskDto) {
    return this.testService.createTask(dto)
  }

  // @Delete(':id')
  // deleteTask(@Param('id') id: string) {
  //   this.testService.remove(id) исправил
  // }
}
