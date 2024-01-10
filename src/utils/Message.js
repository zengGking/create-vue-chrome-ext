/**
 * 对chrome.runtime.onMessage和chrome.runtime.sendMessage封装
 */
export class Message {

    constructor() {
        this._listeners = {}
        this._listenersRes = {}
        chrome.runtime.onMessage.addListener((message) => {
            if (this._listeners[message.cmd]) {
                for (let cb of this._listeners[message.cmd]) {
                    cb(message.data)
                }
            }
        });

    }

    request(cmd, data) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(chrome.runtime.id, {
                cmd,
                data
            }, (res) => resolve(res))
        })

    }
    send(cmd, data) {
        chrome.runtime.sendMessage(chrome.runtime.id, {
            cmd,
            data
        })
    }
    /**
     * 注册监听
     * @param {string} cmd 标识
     * @param {(data)=>void} cb 回调
     */
    listening(cmd, cb) {
        if (!this._listeners[cmd])
            this._listeners[cmd] = [cb]
        else if (this._listeners[cmd].findIndex((callback => callback === cb)) == -1)
            this._listeners[cmd].push(cb)
    }
    /**
     * 移除监听
     * @param {string} cmd 
     * @param {Function} cb 
     */
    unlistening(cmd, cb) {
        if (this._listeners[cmd]) {
            const i = this._listeners[cmd].findIndex((callback => callback === cb));
            i != -1 && this._listeners[cmd].splice(i, 1);
        }
    }
    /**
     * 注册有响应监听,同名cmd只能存在一个
     * @param {string} cmd 
     * @param {(data)=>any} cb 返回响应数据
     */
    listeningResponse(cmd, cb) {
        const responseCallback = (message, sender, sendResponse) => {
            if (message.cmd == cmd) {
                sendResponse(cb(message.data))
                return true
            }
        }
        if (!this._listenersRes[cmd]){
            this._listenersRes[cmd] = responseCallback
            chrome.runtime.onMessage.addListener(responseCallback);
        }
        else {
            throw new Error('已存在'+cmd+'监听器')
        }
    }
    /**
     * 移除有响应监听
     * @param {string} cmd 
     * @returns 
     */
    unlisteningResponse(cmd) {
        if (!this._listenersRes[cmd]) return
        chrome.runtime.onMessage.removeListener(this._listenersRes[cmd])
        delete this._listenersRes[cmd]

    }
}