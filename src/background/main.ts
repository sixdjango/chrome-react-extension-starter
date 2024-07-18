console.log("Hello from Background!");
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("message received");
  console.log(request);
  // 异步响应sendMessage的写法：
  // 异步接收要求返回turn，从而使sendMessage可以异步接收回应消息
  return true;
});
