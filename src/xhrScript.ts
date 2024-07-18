/**
 * 重写ajax方法，以便在请求结束后通知content_script
 * inject_script无法直接与background通信，所以先传到content_script，再通过他传到background
 */
export function injectXHR(
  xhr: typeof XMLHttpRequest,
  options: { onResponse?: (url?: string, response?: any) => void; interceptPaths?: string[] }
): void {
  const inGoogleMaps = window.location.href.includes('https://www.google.com/maps')

  // 只有在google maps页面才进行xhr的重写
  if (!inGoogleMaps) {
    return
  }

  const { onResponse, interceptPaths = [] } = options
  type ExtendedXMLHttpRequest = XMLHttpRequest & {
    _method?: string
    _url?: string
  }

  const XHR = xhr.prototype as ExtendedXMLHttpRequest
  const open = XHR.open
  const send = XHR.send

  // 对open进行patch 获取url和method
  XHR.open = function (this: ExtendedXMLHttpRequest, method: string, url: string | URL): void {
    this._method = method
    this._url = url.toString()
    return open.apply(this, arguments as any)
  }

  // 对send进行patch 获取responseData
  XHR.send = function (
    this: ExtendedXMLHttpRequest,
    postData?: Document | XMLHttpRequestBodyInit | null
  ): void {
    this.addEventListener('load', function (this: ExtendedXMLHttpRequest) {
      const myUrl = this._url ? this._url.toLowerCase() : this._url
      if (myUrl && interceptPaths.some((path) => myUrl.includes(path))) {
        console.info('myUrl', myUrl)
        console.info(this.response)
        if (this.responseType !== 'blob' && this.response) {
          // responseText is string or null
          try {
            const arr = this.response
            onResponse?.(this._url, arr)
          } catch (err) {
            console.log(err)
            console.log('Error in responseType try catch')
          }
        }
      }
    })
    return send.apply(this, arguments as any)
  }
}
