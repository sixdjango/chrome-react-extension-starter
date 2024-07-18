import React, { useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './inject.css'

const App = () => {
  useEffect(() => {
    const info = localStorage.getItem('userInfo')
    console.info('userdata:', info)
    chrome.runtime.sendMessage({ data: info }, function (res) {})
    window.postMessage({ response: info, type: 'GetUserInfo' }, '*')
  }, [])
  return <div></div>
}

const ele = document.createElement('div')

const root = createRoot(ele)

root.render(<App />)

document.body.appendChild(ele)
