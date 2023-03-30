import { request } from "./request"
//支持jQuery
$(document).ready(function () {

  console.log("jQuery支持成功");
  //ajax请求
  request("https://autumnfish.cn/personalized", { method: 'get', params: { limit: 10 } })
    .then((res) => {
      console.log(res);
    })

});


