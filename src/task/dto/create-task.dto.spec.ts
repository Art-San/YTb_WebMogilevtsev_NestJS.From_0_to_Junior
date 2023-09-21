import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { Status } from '../task.interface'
import { CreateTaskDto } from './create-task.dto'
describe('create-task.dto.ts', () => {
  let dto
  beforeAll(() => {
    dto = {
      task: '',
      tags: [],
      status: '',
    }
  })
  it('task пустая', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto)
    const errors = await validate(ofImportDto)
    expect(errors.map((err) => err.property).includes('task')).toBeTruthy()
  })
  it('task не пустая', async () => {
    dto.task = 'какая то task'
    const ofImportDto = plainToInstance(CreateTaskDto, dto)
    const errors = await validate(ofImportDto)
    expect(errors.map((err) => err.property).includes('task')).toBeFalsy()
  })
  it('tags пустой', async () => {
    const ofImportDto = plainToInstance(CreateTaskDto, dto)
    const errors = await validate(ofImportDto)
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy()
    expect(dto.tags.length).toBe(0)
  })
  it('Выдаст ошибку если не все элементы tags является строкой', async () => {
    dto.tags = ['какая то task', 1]
    const ofImportDto = plainToInstance(CreateTaskDto, dto)
    const errors = await validate(ofImportDto)
    expect(errors.map((err) => err.property).includes('tags')).toBeTruthy()
    expect(dto.tags.length).not.toBe(0)
    expect(dto.tags.every((el) => typeof el === 'string')).not.toBeTruthy()
  })
  it('Каждый элемент tags является строкой и массив не пустой', async () => {
    dto.tags = ['какая то task', '1']
    const ofImportDto = plainToInstance(CreateTaskDto, dto)
    const errors = await validate(ofImportDto)
    expect(errors.map((err) => err.property).includes('tags')).toBeFalsy()
    expect(dto.tags.length).not.toBe(0)
    expect(dto.tags.every((el) => typeof el === 'string')).toBeTruthy()
  })
  it('Тип статуса не является значением enum Status', async () => {
    dto.status = 'status'
    const ofImportDto = plainToInstance(CreateTaskDto, dto)
    const errors = await validate(ofImportDto)
    expect(errors.map((err) => err.property).includes('status')).toBeTruthy()
  })
  it('Тип статуса является значением enum Status', async () => {
    dto.status = Status.ERROR
    const ofImportDto = plainToInstance(CreateTaskDto, dto)
    const errors = await validate(ofImportDto)
    expect(errors.map((err) => err.property).includes('status')).toBeFalsy()
    expect(dto.status).toBe('error')
  })
})
