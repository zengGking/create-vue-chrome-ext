// 监听上下文菜单点击事件
chrome.contextMenus.onClicked.addListener((info) => {
    console.log("上下文菜单点击事件:", info);
});

// 监听content_scripts页面发来的消息
chrome.runtime.onMessage.addListener((res) => {
    console.log("接收到content_scripts消息：", res);

});
// 监听系统消息通知的按钮点击事件
chrome.notifications.onButtonClicked.addListener((notificationId) => {
    console.log("系统消息通知的按钮点击事件:", notificationId);
});
let message='hellow background！！！';
console.log(message);

