import { Message } from "../utils/Message";
import { HttpServer } from "./HttpServer";

const httpServer = new HttpServer();//开启http服务，content_script才能进行http请求
//message测试
const message = new Message();
message.listening('hellow', (data) => {
    console.log('contentjs传来的数据1：', data);
})
message.listening('hellow', (data)=>{
    console.log('contentjs传来的数据2：', data);
})
message.listeningResponse('sum', (data) => {
    //需要返回响应数据
    console.log('sum1');
    return data.data.reduce((pre, cur) => pre + cur, 0)
})
//i18测试
console.log('hellow background！！！', chrome.i18n.getMessage('extDescription'));


