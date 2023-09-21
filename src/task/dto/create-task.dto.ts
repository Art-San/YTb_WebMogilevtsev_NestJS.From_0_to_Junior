import { IsEnum, IsOptional, IsString } from 'class-validator'
import { Status } from '../task.interface'

export class CreateTaskDto {
  @IsString({ message: 'Название обязательно' })
  task: string

  @IsOptional()
  @IsString({ each: true, message: 'Теги должны быть строчными' })
  tags?: string[]

  @IsOptional()
  @IsEnum(Status, { message: 'Не верный тип статуса' })
  status?: Status
}
