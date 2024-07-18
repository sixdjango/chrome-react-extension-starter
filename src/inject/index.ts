// 动态 inject 做一些自动化任务
import { onMessage } from 'webext-bridge/content-script'
import '../xhrScript'
import { BridgeMessageEnum } from '../constants/MessageEnum'
import { StartTaskInfo } from '../types'
import { TaskTypeEnum } from '../constants/TaskTypeEnum'
import { authTask } from './authTask'

onMessage<StartTaskInfo>(BridgeMessageEnum.START_TASK, (data) => {
  const { type, data: taskData } = data.data
  switch (type) {
    case TaskTypeEnum.AUTH:
      // 获取登录信息
      authTask(taskData)
  }
})
