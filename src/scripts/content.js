
//支持jQuery
$(document).ready(function(){
 
  console.log("jQuery支持成功");
 });

// 监听background页面发来的消息
chrome.runtime.onMessage.addListener((res) => {
    console.log("接收到background消息：", res);

});

// 在content_scripts中只能使用部分API，所以信息交给background页面处理
chrome.runtime.sendMessage(chrome.runtime.id, {
    message:'由contentjs发个backgroundjs的消息'
  });
