import { scripting, tabs } from 'webextension-polyfill'
import { BridgeMessageEnum } from '../constants/MessageEnum'
import { onMessage, sendMessage } from 'webext-bridge/background'
import { TaskTypeEnum } from '../constants/TaskTypeEnum'

console.log('Hello from Background!')

onMessage(BridgeMessageEnum.AUTH, async () => {
  startTask(TaskTypeEnum.AUTH, `http://localhost:5173`)
})

async function startTask(type: TaskTypeEnum, url: string, data: Record<string, any> = {}) {
  const tab = await tabs.create({
    url
  })
  // 注入自动脚本
  await scripting.executeScript({
    target: { tabId: tab.id! },
    files: ['./dist/inject/inject_script.js']
  })
  // 开始获取任务
  sendMessage(BridgeMessageEnum.START_TASK, { type, data }, `content-script@${tab.id}`)
}
