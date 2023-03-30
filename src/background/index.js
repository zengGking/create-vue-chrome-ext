import MessageEmitter from "../util/MessageEmitter";
import axios from "axios";
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
const instance = axios.create({
    timeout: 5000,
    adapter: fetchAdapter
});
const messageEmitter = new MessageEmitter();
/**
 * 等同于chrome.runtime.onMessage.addListener(function () {});
 */
messageEmitter.on('ajax',  (message, sender, sendResponse) => {
    instance.request(message.data).then((res) => {
        console.log(res);
        sendResponse(res);
    })
    return true;
})
console.log('hellow background！！！');

