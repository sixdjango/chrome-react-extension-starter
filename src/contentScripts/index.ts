console.log('Hello from Content!')
/**
 */
var s = document.createElement('script')
s.src = chrome.runtime.getURL('dist/inject/inject_script.js')
s.onload = function () {
  // @ts-ignore
  // this.remove();
}
const styleEl = document.createElement('link')
styleEl.setAttribute('rel', 'stylesheet')
styleEl.setAttribute('href', chrome.runtime.getURL('dist/inject/style.css'))
document.head.appendChild(styleEl)

document.head.appendChild(s)

window.addEventListener(
  'message',
  (e) => {
    if (!e.data || Object.keys(e.data).length === 0) {
      return
    }
    // 检查收到的message是否是要监听的
    let responseDataList = null
    // 使用try-catch兼容接收到的message格式不是对象的异常情况
    // try{
    if (e.data.response) {
      console.log('content_script接收到的数据：', e.data.response)
      responseDataList = JSON.parse(e.data.response.replace('/*""*/', ''))
      const jsonString = responseDataList['d'].replace(/^\)\]\}'\n/, '')
      const result = jsonString ? JSON.parse(jsonString) : null
      // 发消息给background.js，并接收其回复
      chrome.runtime.sendMessage({ data: result }, {}, function (res) {
        // 收到回复后在页面弹出提醒
        // alert(`${res.type}, ${res.message}`);
      })
    }
  },
  false
)
