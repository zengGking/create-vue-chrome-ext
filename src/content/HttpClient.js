

export class HttpClient {
    constructor() {

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