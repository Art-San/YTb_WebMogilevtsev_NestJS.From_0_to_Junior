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

@Injectable()
export class TaskService {
  private tasks: ITask[] = []

  getTask(): ITask[] {
    if (this.tasks.length === 0) {
      throw new NotFoundException({
        message: 'Заланий нет',
        error: 'Новая ошибка',
        statusCode: 404234,
      })
      // throw new NotFoundException('Заланий нет')
      // throw new HttpException('Заланий нет', HttpStatus.NOT_FOUND) // Http Exception - HTTP-исключение принимает строку или объект с ответами
    }
    return this.tasks
  }

  getTaskById(id: string): ITask {
    const task = this.tasks.find((t) => t.id === +id)
    if (!task) {
      throw new NotFoundTaskException({ info: 'Доп информация' })
    }

    return task
  }

  createTask({ task, tags, status }: CreateTaskDto) {
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

// nest g exception filter
