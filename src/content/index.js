import { Message } from "../utils/Message";
import { HttpClient } from "./HttpClient";
const httpClient = new HttpClient()
//jQuery测试
$(document).ready(function () {
  console.log("jQuery支持成功");
  //http请求测试
  httpClient.request("https://wenku.baidu.com/gsearch/rec/homerec?pn=1&rn=16", { method: 'get', params: { limit: 10 } })
    .then((res) => {
      console.log('http测试', res);
    })

});
//message测试
const message = new Message()
message.send('hellow', { msg: 'hellow1' })
message.request('sum', { data: [1111, 2222, 3333, 4444, 5555, 6666] }).then((res) => {
  console.log('求和结果：', res);
})

