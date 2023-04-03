export default class MessageEmitter {
    constructor() {
        this.callbacks = {};
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (this.callbacks[message.messageType])
                return this.callbacks[message.messageType](message, sender, sendResponse);
        });

    }
    /**
     * 添加监听消息事件
     * @param {string} messageType 消息类型
     * @param {(message:{messageType:string,data:{[key:string]:any}}, sender:chrome.runtime.MessageSender, sendResponse:(response?: any) => void)=>void} callback  回调函数
     */
    on(messageType, callback) {
        if (!this.callbacks[messageType])
            this.callbacks[messageType] = callback;
        else
            throw new Error(messageType + "消息事件已存在")
    }
    /**
     * 移除监听消息事件
     * @param {string} messageType 消息类型
     */
    off(messageType) {
        if (this.callbacks[messageType])
            delete this.callbacks[messageType];
        else
            throw new Error(messageType + "消息事件不存在")
    }
    /**
     * 提交事件
     * @param {string} messageType 消息类型
     * @param {{[key:string]:any}} data 消息数据
     * @param {(response: any) => void} responseCallback 回调函数
     */
    emit(messageType, data, responseCallback) {
        if (typeof window != 'undefined')
            chrome.runtime.sendMessage(chrome.runtime.id, { messageType, data }, responseCallback);
        else
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { messageType, data }, responseCallback);
            })

    }
}