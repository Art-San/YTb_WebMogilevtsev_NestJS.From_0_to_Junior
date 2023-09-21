import { Injectable } from '@nestjs/common'
import { Task } from './task.entity'
import { ITask } from './task.interface'

@Injectable()
export class TaskService {
  private tasks: ITask[] = [
    { id: 1, task: 'task 1' },
    { id: 2, task: 'task 2' },
  ]

  getTask(): ITask[] {
    return this.tasks
  }

  getTaskById(id: string): ITask {
    const task = this.tasks.find((t) => t.id === +id)

    return task
  }

  createTask(task: string): ITask {
    const newTask = new Task(task)
    this.tasks.push(newTask)
    return newTask
  }

  // Что то не работает
  // remove(id: string) {
  //   const arr = this.tasks.filter((t) => t.id !== +id)
  //   return { message: 'удалено task' }
  // }
}
