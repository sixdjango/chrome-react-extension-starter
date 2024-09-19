import { onMessage } from 'webext-bridge/content-script'
import { BridgeMessageEnum } from '../../constants/MessageEnum'
import { TaskTypeEnum } from '../../constants/TaskTypeEnum'
import { StartTaskInfo } from '../../types'
import { pingTask } from './ping-task'

onMessage<StartTaskInfo>(BridgeMessageEnum.START_TASK, (data) => {
  const { type, data: taskData } = data.data
  console.log('start task:', type, taskData)
  switch (type) {
    case TaskTypeEnum.PING:
      // 获取登录信息
      pingTask(data.data)
      break
  }
})
