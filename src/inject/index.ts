// 动态 inject 做一些自动化任务
import { Content2InjectMessage } from '../types'
import '../xhrScript'

window.addEventListener('message', (event) => {
  const data: Content2InjectMessage = event.data
  switch (data.type) {
    case 'ping':
      console.log('ping:', data)
      window.postMessage({ type: 'pong', data: { pong: true } }, '*')
      break
  }
})
