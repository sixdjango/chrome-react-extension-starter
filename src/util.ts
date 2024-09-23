import { sleep } from '@yc-tech/shared'

export function setStorage<V = any>(key: string, value: V) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.set({ [key]: value }, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(true)
      }
    })
  })
}

export function getStorage<V = any>(key: string): Promise<V | undefined> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(result[key])
      }
    })
  })
}

export function removeStorage(key: string) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.remove(key, () => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(true)
      }
    })
  })
}

export async function retry<T>(fn: () => Promise<T>, interval: number = 1000, max: number = 6) {
  return new Promise<T>((resolve, reject) => {
    let count = 0
    const invoke = async () => {
      if (count >= max) {
        reject(new Error('retry too many'))
      }

      try {
        const res = await fn()
        resolve(res)
        console.log('retry success')
      } catch (error) {
        count++
        console.error(error)
        await sleep(interval)
        invoke()
      }
    }
    sleep(1000).then(() => {
      invoke()
    })
  })
}
