import React from 'react'
import { createRoot } from 'react-dom/client'
import '@yc-tech/react-component/dist/style.css'
import './popup.css'
import { AtButton, YcIcon } from '@yc-tech/react-component'
import { sendMessage } from 'webext-bridge/popup'
import { BridgeMessageEnum } from '../constants/MessageEnum'
import { StartTaskInfo } from '../types'
import { TaskTypeEnum } from '../constants/TaskTypeEnum'
import { tabs } from 'webextension-polyfill'

const Options = () => {
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
  return (
    <div className="min-h-[100px] min-w-[20rem] bg-neutral-200 flex flex-col">
      <div className="py-4 bg-white rounded-b-xl flex justify-center w-full flex-1">
        <AtButton size="sm" onClick={pingClick}>
          ping
        </AtButton>
      </div>
      <div className="py-2 px-4 flex justify-between items-center">
        <YcIcon
          icon="mingcute:settings-3-line"
          className="text-neutral-500 cursor-pointer"
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
    <Options />
  </React.StrictMode>
)
