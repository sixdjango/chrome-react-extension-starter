import React from 'react'
import { createRoot } from 'react-dom/client'
import '@yc-tech/react-component/dist/style.css'
import '../preflight.css'
import './popup.css'
import { AtButton, YcIcon } from '@yc-tech/react-component'
import { sendMessage } from 'webext-bridge/popup'
import { BridgeMessageEnum } from '../constants/MessageEnum'
import { StartTaskInfo } from '../types'
import { TaskTypeEnum } from '../constants/TaskTypeEnum'
import { cookies, tabs } from 'webextension-polyfill'

const Popup = () => {
  const [c, setC] = React.useState('')

  const onOpenOptions = () => {
    chrome.runtime.openOptionsPage()
  }

  const pingClick = async () => {
    const res = await tabs.query({ active: true, currentWindow: true })
    if (res.length > 0) {
      const activeTab = res[0]
      sendMessage(
        BridgeMessageEnum.START_TASK,
        {
          type: TaskTypeEnum.PING,
          data: { ping: true }
        } as StartTaskInfo,
        `content-script@${activeTab.id}`
      )
      console.log('当前活动的标签页信息:', activeTab)
    } else {
      console.log('没有找到活动的标签页')
    }
  }

  const getCookies = async () => {
    const res = await cookies.getAll({ url: 'https://qbo.intuit.com' })
    const newRes = res.map((item) => {
      return {
        name: item.name,
        value: item.value
      }
    })
    setC(JSON.stringify(newRes))
    console.log('cookies:', newRes)
  }
  return (
    <div className="min-h-[100px] min-w-[20rem] bg-neutral-200 flex flex-col">
      <div className="py-4 bg-white rounded-b-xl flex justify-center w-full flex-1">
        <AtButton size="sm" onClick={pingClick}>
          ping
        </AtButton>
        <AtButton size="sm" onClick={getCookies}>
          getCookies
        </AtButton>
        <div className=" break-all whitespace-pre-wrap">{c}</div>
      </div>
      <div className="py-2 px-4 flex justify-between items-center">
        <YcIcon
          icon="mingcute:settings-3-line"
          className="text-neutral-500 cursor-pointer w-5 h-5"
          onClick={onOpenOptions}
        />
        <span className="text-neutral-500 text-xs">v1.0.0</span>
      </div>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
