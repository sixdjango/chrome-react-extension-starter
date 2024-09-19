import { Deferred } from '@yc-tech/shared'
import { Content2InjectMessage } from '../types'

/**
 */
const styleEl = document.createElement('link')
styleEl.setAttribute('rel', 'stylesheet')
styleEl.setAttribute('href', chrome.runtime.getURL('dist/contentScripts/style.css'))
document.head.appendChild(styleEl)

// 初始化注入脚本
function loadInjectScript() {
  const deferred = new Deferred()
  const script = document.createElement('script')
  script.src = chrome.runtime.getURL('dist/inject/inject_script.js')
  script.onload = function () {
    deferred.resolve()
  }
  document.head.appendChild(script)
  return deferred.promise
}
const initPromise = loadInjectScript()

export { initPromise }

// 接收来自注入脚本的消息
window.addEventListener('message', (event) => {
  const data: Content2InjectMessage = event.data
  switch (data.type) {
    case 'response':
      console.log('response:', data)
      break
    case 'pong':
      console.log('pong:', data)
      break
  }
})
