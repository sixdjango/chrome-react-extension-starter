import { AtButton, YcIcon } from '@yc-tech/react-component'
import React from 'react'
import { configResponsive } from 'ahooks'
import { createRoot } from 'react-dom/client'
import '../preflight.css'
import './options.css'
configResponsive({
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536
})

const Options = () => {
  const onOpenOptions = () => {
    chrome.runtime.openOptionsPage()
  }
  return (
    <div className="min-h-[100px] min-w-[20rem] bg-neutral-200 flex flex-col">
      <div className="py-4 bg-white rounded-b-xl flex justify-center w-full flex-1"></div>
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
