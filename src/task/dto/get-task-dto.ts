import { IsEmail, IsOptional } from 'class-validator'

export class getTaskDto {
  @IsOptional()
  @IsEmail({}, { message: 'Некорректный email getTaskDto' })
  email: string
}
