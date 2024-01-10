

export class HttpClient {
    constructor() {
        // this.callbacks = {};
        // chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        //     if (this.callbacks[message.cmd])
        //         return this.callbacks[message.messageType](message.data, sender, sendResponse);
        // });

    }
    /**
     * 
     * @param {string} url 
     * @param {{method:string,params:any,data:any}} config 
     * @returns 
     */
    request(url, config) {
        return new Promise((resolve, reject) => {
            chrome.runtime.sendMessage(chrome.runtime.id, {
                cmd: 'http',
                data: { url, ...config }
            }, (response) => {
                resolve(response);
            })
        });
    }
}