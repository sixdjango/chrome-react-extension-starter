import { StartTaskInfo } from '../../types'

export function pingTask(message: StartTaskInfo) {
  // 传递给 inject 的数据
  window.postMessage({ type: 'ping', data: message.data }, '*')
}
