import { NotFoundTaskException } from './exceptions/not-found-exception.exception'
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { Task } from './task.entity'
import { ITask } from './task.interface'
import { UpdateTaskDto } from './dto/update-task.dto'

@Injectable()
export class TaskService {
  private tasks: ITask[] = []

  getTask(): ITask[] {
    throw new Error('error')
    if (this.tasks.length === 0) {
      // throw new NotFoundException({
      //   message: 'Заданий нет в массиве',
      //   error: 'Новая ошибка',
      //   statusCode: 404,
      // })
      // throw new NotFoundException('Заданий нет')
      // throw new HttpException('Заданий нет', HttpStatus.NOT_FOUND) // Http Exception - HTTP-исключение принимает строку или объект с ответами
    }
    return this.tasks
  }

  getTaskById(id: string): ITask {
    const task = this.tasks.find((t) => t.id === +id)
    if (!task) {
      throw new NotFoundTaskException()
      // throw new NotFoundTaskException({ info: 'Доп информация' })
    }

    return task
  }

  createTask({ task, tags, status }: CreateTaskDto) {
    const newTask = new Task(task, tags, status)
    this.tasks.push(newTask)
    return newTask
  }

  updateTask(id: string, dto: UpdateTaskDto) {
    const taskIndex = this.tasks.findIndex((t) => t.id === +id)
    if (taskIndex === -1) {
      throw new NotFoundTaskException({ info: 'Нет такого задания' })
    }

    // const updatedTask = {
    //   ...this.tasks[taskIndex],
    //   task: dto.task,
    //   tags: dto.tags,
    //   status: dto.status,
    // };

    const updatedTask = { ...this.tasks[taskIndex], ...dto }
    this.tasks[taskIndex] = updatedTask

    return updatedTask
  }

  remove(id: string) {
    if (this.tasks.length === 0) {
      throw new NotFoundException('Заданий нет в массиве')
    }
    const task = this.tasks.find((item) => item.id === +id)

    if (!task) {
      throw new NotFoundException('Задание не найдено')
    }

    const arr = this.tasks.filter((t) => t.id !== +id)
    this.tasks = arr
    throw new HttpException('Удалено', HttpStatus.CREATED)
  }
}
