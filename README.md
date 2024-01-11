<h1 align="center">create-vue-chrome-ext</h1>
<h5 align="center">打造chrome插件的快速开发项目</h5>
<h6 align="right">————向优秀致敬，向榜样学习</h6>
<div align="center"><img src="https://img.shields.io/badge/license-MIT-blueviolet"/>&ensp;<img src="https://img.shields.io/badge/chrome_extension-v0.2.1-blueviolet"/>&ensp;<img src="https://img.shields.io/badge/Vue3-webpack-blueviolet"/></div>


#### 📌介绍

​		基于Vue3快速开发chrome插件，基于webpack打包工具构建项目。项目采用vue框架对popup页面、options选项页面进行开发。

#### 📄文件资源目录
```
create-vue-chrome-ext
├─ dist            # 打包目录
├─ public          # 静态资源文件（该文件夹不会被打包）
│  ├─ img				# 存放插件图标，亦可存放图片资源
│  └─ index.html        # html模板	
├─ src
│  ├─ util              # 工具包	    
│  ├─ background        # chrome插件的background页面	    
│  ├─ content           # chrome插件的content_script
│  ├─ pages              
│  │  ├─ popup            # popup页面
│  │  │  ├─ main.js		    # popup入口文件	
│  │  │  └─ App.vue	 	    # popup主组件
│  │  └─ options          # options选项页面，可以不需要，按照项目需求进行删减。
│  │     ├─ main.js		    # options选项页入口文件
│  │     └─ App.vue	      	# options主组件 
│  └─ manifest.json		  # chrome插件文件清单，必须有这个文件
├─ .browserslistrc 		  # 浏览器兼容配置
├─ .gitignore             # 忽略 git 提交
├─ webpack.config.js      # webpack配置文件
├─ LICENSE                # 开源协议文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
└─ README.md              # README 介绍

```

#### 开始

```
# clone the project from gitee
git clone https://gitee.com/zengGking/create-vue-chrome-ext
# clone the project from github
git clone https://github.com/zengGking/create-vue-chrome-ext

# enter the project directory
cd create-vue-chrome-ext

# install dependency
npm install

# develop
npm run dev

# production
npm run build

# loading the dist folder with chrome 
```

#### 📃使用说明

- 支持sass，如想更改预编译语言，可自行安装配置。
- 支持i18n。
- content_script支持jQuery。
- 基于Vue3，可自行引入elementUI、vant等组件库。
- 可更换插件图标，在public/img目录下替换掉原来的图标即可。
- **⚠在正式发布上线前，建议将webpack.config.js的devtool功能关闭。**
- **⚠如果不需要options选项页，请在webpack.config.js中修改如下配置，提升开发体验。**

```js
//webpack.config.js
module.exports = {
    entry: {
        popup: "./src/view/popup/main.js",
        //options: './src/view//options/main.js', 删除
    },
    //...
    plugins:[
       //...
       //	删除以下内容
      //  new HtmlWebpackPlugin({
      //       title: 'Options_html',
      //       filename: 'html/options.html',
      //       template: path.resolve(__dirname, 'public/index.html'),
      //       chunks: ['options']
      //   }),
    ]
}
```

#### 📧Message消息通信
```js
// background.js
import { Message } from "../utils/Message";
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

// content.js
import { Message } from "../utils/Message";
const message = new Message()
message.send('hellow', { msg: 'hellow1' })
message.request('sum', { data: [1111, 2222, 3333, 4444, 5555, 6666] }).then((res) => {
  console.log('求和结果：', res);
})

```
#### 💡content_script进行http请求
原理：由content_script转发http请求给background，由background发送http请求并返回数据给content_script。
```js
// background.js
import { HttpServer } from "./HttpServer";
const httpServer = new HttpServer();//开启http服务，content_script才能进行http请求
httpServer.start()

//content.js
import { HttpClient } from "./HttpClient";
const httpClient = new HttpClient()
httpClient.request("https://wenku.baidu.com/gsearch/rec/homerec?pn=1&rn=16", { method: 'get', params: { limit: 10 } })
    .then((res) => {
      console.log('http测试', res);
  	})
```
#### ⚠注意！！！
如果打包时出现 Module not found 错误，请进行以下尝试：

```json
// 打开\node_modules\axios\package.json添加以下配置
{
  ...
  "exports": {
    ...
    "./lib/*":"./lib/*"
  },
}
```
```js
//打开\node_modules\@vespaiach\axios-fetch-adapter\index.js修改为以下内容
import axios from 'axios';
import settle from 'axios/lib/core/settle';
import buildURL from 'axios/lib/helpers/buildURL';
import buildFullPath from 'axios/lib/core/buildFullPath';
import utils from 'axios/lib/utils';
import browser from 'axios/lib/platform/browser'
const { isUndefined, isFormData } = utils;
const { isStandardBrowserEnv } = browser
```
#### 📖更新日志
- 2024/01/10更新 v0.2.2
  - 优化了消息通信
  - 优化了http请求

- 2023/04/22更新  v0.2.1
  - 新增i18n
  - 优化项目构建
- 2023/04/03更新  v0.1.1
  - 封装了Message消息通信和Storage存储，更方便开发
  - 使content_script可以进行http请求
  - 优化目录结构与webpack配置
- 2023/03/29更新	v0.0.2
  - 优化配置，提高了开发效率，提升了开发体验
  - 优化目录结构，使符合开发习惯
  - package与manifest文件统一version信息


#### 项目交流

​	如果对项目有疑问，欢迎在Issues留下你的问题。

#### 计划下次更新

- 支持ts
