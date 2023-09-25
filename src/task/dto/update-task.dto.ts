import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { Status } from '../task.interface'

export class UpdateTaskDto {
  // @MinLength(1, { message: 'хотя бы один символ' })
  @IsString()
  @IsNotEmpty({ message: 'Нельзя отправлять пустую строку' })
  task: string

  // @IsOptional()
  @ArrayNotEmpty({ message: 'Необходимо указать один или несколько тегов' })
  @IsString({ each: true, message: 'Теги должны быть строчными' })
  tags?: string[]

  @IsOptional()
  @IsEnum(Status, { message: 'Не верный тип статуса' })
  status?: Status
}
