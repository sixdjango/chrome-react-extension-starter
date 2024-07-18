console.log('Hello from Content!')
/**
 */
const styleEl = document.createElement('link')
styleEl.setAttribute('rel', 'stylesheet')
styleEl.setAttribute('href', chrome.runtime.getURL('dist/contentScripts/style.css'))
document.head.appendChild(styleEl)

import './app'
