import { Injectable } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './task.entity'
import { ITask } from './task.interface'

@Injectable()
export class TaskService {
  private tasks: ITask[] = []

  getTask(): ITask[] {
    return this.tasks
  }

  getTaskById(id: string): ITask {
    const task = this.tasks.find((t) => t.id === +id)

    return task
  }

  createTask({ task, status, tags }: CreateTaskDto) {
    const newTask = new Task(task, tags, status)
    this.tasks.push(newTask)
    return newTask
  }

  // Что то не работает
  // remove(id: string) {
  //   const arr = this.tasks.filter((t) => t.id !== +id)
  //   return { message: 'удалено task' }
  // }
}
