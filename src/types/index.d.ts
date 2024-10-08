import { TaskTypeEnum } from '../constants/TaskTypeEnum'

export type StartTaskInfo = {
  type: TaskTypeEnum
  data: Record<string, any>
  [key: string]: any
}

export type Content2InjectMessage = {
  type: string
  data: any
}
