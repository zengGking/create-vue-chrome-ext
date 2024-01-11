import axios from "axios";
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
const instance = axios.create({
    timeout: 5000,
    adapter: fetchAdapter
});

export class HttpServer {

    start() {
        chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
            if (message.cmd === 'http') {
                instance.request(message.data).then((res) => {
                    sendResponse(res.data);
                })
                return true;
            }
        });
    }
}