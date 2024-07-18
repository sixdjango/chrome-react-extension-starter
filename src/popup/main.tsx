import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import { Button } from '@douyinfe/semi-ui'
import { getStorage } from '../util'
import { CacheEnum } from '../constants/CacheEnum'
import { sendMessage } from 'webext-bridge/popup'
import { BridgeMessageEnum } from '../constants/MessageEnum'

const Popup = () => {
  const [token, setToken] = useState<string>()

  useEffect(() => {
    getStorage(CacheEnum.TOKEN).then((res) => {
      setToken(res)
    })
  })
  const onSignIn = () => {
    sendMessage(BridgeMessageEnum.AUTH, { dd: 1234 })
  }

  return (
    <div className="p-4 min-w-[24rem]">
      dsadas
      <Button type="primary" theme="solid" onClick={onSignIn}>
        Sign In
      </Button>
    </div>
  )
}

const root = createRoot(document.getElementById('root')!)

root.render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
)
