import fs from 'fs-extra'
import type { Manifest } from 'webextension-polyfill'
import type PkgType from '../package.json'
import { isDev, port, r } from '../scripts/utils'

export async function getManifest() {
  const pkg = (await fs.readJSON(r('package.json'))) as typeof PkgType

  // update this file to update this manifest.json
  // can also be conditional based on your need
  const manifest: Manifest.WebExtensionManifest = {
    manifest_version: 3,
    name: pkg.displayName || pkg.name,
    version: pkg.version,
    description: pkg.description,
    action: {
      default_icon: './assets/icon.png',
      default_popup: './dist/popup/index.html'
    },
    options_ui: {
      page: './dist/options/index.html',
      open_in_tab: true
    },
    icons: {
      16: './assets/icon.png',
      48: './assets/icon.png',
      128: './assets/icon.png'
    },
    background: {
      type: 'module',
      service_worker: 'dist/background/index.mjs'
    },
    permissions: [
      'storage',
      'tabs',
      'tabGroups',
      'webRequest',
      'webRequestBlocking',
      'webNavigation',
      'activeTab',
      'declarativeNetRequest',
      'scripting',
      'cookies'
    ],
    host_permissions: ['<all_urls>'],
    content_scripts: [
      {
        matches: ['*://localhost:*/*', '*://*.google.com/*', '*://*.xero.com/*'],
        js: ['dist/contentScripts/index.global.js'],
        run_at: 'document_end'
      }
    ],
    web_accessible_resources: [
      {
        resources: ['dist/inject/inject_script.js', 'dist/contentScripts/style.css'],
        matches: ['<all_urls>']
      }
    ]
    // content_security_policy: {
    //   extension_pages: isDev
    //     ? // this is required on dev for Vite script to load
    //       `script-src \'self\' http://localhost:${port}; object-src \'self\'`
    //     : "script-src 'self'; object-src 'self'"
    // }
  }

  return manifest
}
