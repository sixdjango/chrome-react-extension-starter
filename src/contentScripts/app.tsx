import { createRoot } from 'react-dom/client'
import './style.css'

// 注入页面的 ui
const App = () => {
  return <div></div>
}

const ele = document.createElement('div')

const root = createRoot(ele)

root.render(<App />)

document.body.appendChild(ele)
