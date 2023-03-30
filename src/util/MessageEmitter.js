export default class MessageEmitter {
    constructor() {
        this.callbacks = {};
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (this.callbacks[message.messageType])
                this.callbacks[message.messageType](message, sender, sendResponse);
            return true;
        });

    }
    /**
     * 添加监听消息事件
     * @param {string} messageType 消息类型
     * @param {(message, sender?, sendResponse?)=>{}} callback  回调函数
     */
    on(messageType, callback) {
        this.callbacks[messageType] = callback;
    }
    /**
     * 移除监听消息事件
     * @param {string} messageType 消息类型
     */
    off(messageType) {
        delete this.callbacks[messageType];
    }
    /**
     * 提交事件
     * @param {string} messageType 消息类型
     * @param {Object} data 消息数据
     * @param {(responseData)=>{}} callback 回调函数
     */
    emit(messageType, data, callback) {
        console.log(typeof window);
        if (typeof window != 'undefined')
            chrome.runtime.sendMessage(chrome.runtime.id, { messageType, data }, callback);
    }
}