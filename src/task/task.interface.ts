export enum Status {
  CREATED = 'created',
  PROCESSING = 'processing',
  ABORTED = 'aborted',
  ERROR = 'error',
  DONE = 'done',
}

export interface ITask {
  id: number
  task: string
  status: Status
  email: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}
