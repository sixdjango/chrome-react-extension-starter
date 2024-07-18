import React from 'react'
import { createRoot } from 'react-dom/client'
import './inject.css'

const App = () => {
  return <div></div>
}

const ele = document.createElement('div')

const root = createRoot(ele)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

document.body.appendChild(ele)
