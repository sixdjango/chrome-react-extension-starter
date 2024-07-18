import React from 'react'
import { createRoot } from 'react-dom/client'
import './options.css'
import { Button } from '@douyinfe/semi-ui'

const Options = () => {
  return (
    <div className="w-screen h-screen flex justify-center p-12">
      <div className="w-full max-w-4xl flex flex-col gap-y-8">
        <h1 className="text-4xl font-semibold border-b border-black pb-2">Google Maps dsad</h1>
        <Button>Sign In</Button>
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
