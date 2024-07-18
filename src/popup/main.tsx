import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './popup.css'
import { Button } from '@douyinfe/semi-ui'
import { getStorage } from '../util'
import { CacheEnum } from '../constants/CacheEnum'

const Popup = () => {
  const [token, setToken] = useState<string>()

  useEffect(() => {
    getStorage(CacheEnum.TOKEN).then((res) => {
      setToken(res)
    })
  })

  return (
    <div className="p-4 min-w-[24rem]">
      dsadas
      <Button type="primary" theme="solid">
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
