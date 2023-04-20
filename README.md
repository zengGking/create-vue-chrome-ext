<h1 align="center">vue-chrome-extension-template</h1>
<h5 align="center">打造chrome插件的快速开发模板</h5>
<h6 align="right">————向优秀致敬，向榜样学习</h6>
<<<<<<< HEAD
<div align="center"><img src="https://img.shields.io/badge/license-MIT-blueviolet"/>&ensp;<img src="https://img.shields.io/badge/chrome_extension-v0.1.1-blueviolet"/>&ensp;<img src="https://img.shields.io/badge/Vue3-webpack-blueviolet"/></div>
=======
<div align="center"><img src="https://img.shields.io/badge/license-MIT-blueviolet"/>&ensp;<img src="https://img.shields.io/badge/chrome_extension-v0.2.0-blueviolet"/>&ensp;<img src="https://img.shields.io/badge/Vue3-webpack-blueviolet"/></div>
>>>>>>> d8c08dda6c26e4d36f55038221952ce0314cef25




#### 📌介绍

​		基于vue3的chrome插件的快速开发模板，基于webpack打包工具构建项目。项目采用vue框架对popup页面、options选项页面进行开发。

#### 📄文件资源目录
```
vue-chrome-extension-template
├─ dist            # 打包目录
├─ public          # 静态资源文件（该文件夹不会被打包）
│  ├─ img				# 存放插件图标，亦可存放图片资源
│  └─ index.html        # html模板	
├─ src
│  ├─ util              # 工具包	    
│  ├─ background        # chrome插件的background页面	    
│  ├─ content           # chrome插件的content_script
│  ├─ view              
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
# clone the project
git clone https://gitee.com/zengGking/vue-chrome-extension-template

# enter the project directory
cd vue-chrome-extension-template

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
- content_script支持jQuery。
- 基于Vue3，可自行引入elementUI、vant等组件库。
- 无vue-router，可自行安装配置。
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
import MessageEmitter from "../util/MessageEmitter";
const messageEmitter = new MessageEmitter();
/**
 * 监听消息
 */
messageEmitter.on('ajax',  (message, sender, sendResponse) => {
    instance.request(message.data).then((res) => {
        sendResponse(res);
    })
})


// content.js
import MessageEmitter from "../util/MessageEmitter";
const messageEmitter = new MessageEmitter();
//发送消息
messageEmitter.emit('ajax', { url:"https://autumnfish.cn/personalized", method: 'get', params: { limit: 10 }  })

//移除监听
messageEmitter.off('ajax');
```
#### 💡content_script发送Ajax请求
原理：利用chrome.runtime.sendMessage给background发送Message，由background发送Ajax请求返回数据给content_script。
```js
// background.js
import MessageEmitter from "../util/MessageEmitter";
import axios from "axios";
import fetchAdapter from '@vespaiach/axios-fetch-adapter'
const instance = axios.create({
    timeout: 5000,
    adapter: fetchAdapter
});
const messageEmitter = new MessageEmitter();
/**
 * 先监听ajax消息
 */
messageEmitter.on('ajax',  (message, sender, sendResponse) => {
    instance.request(message.data).then((res) => {
        sendResponse(res);
    })
})

//content.js
import { request } from "./request"
/**
 * 发送Ajax请求 Axios风格
 */
request("https://autumnfish.cn/personalized", { method: 'get', params: { limit: 10 } })
    .then((res) => {
      //处理响应数据
      console.log(res);
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
    "./lib/core/settle":"./lib/core/settle",
    "./lib/helpers/buildURL":"./lib/helpers/buildURL",
    "./lib/core/buildFullPath":"./lib/core/buildFullPath",
    "./lib/utils":"./lib/utils",
    "./lib/platform/browser":"./lib/platform/browser"
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
- 2023/04/03更新  v0.1.1
  - 封装了Message消息通信和Storage存储，更方便开发
  - 使content_script可以进行ajax请求
  - 优化目录结构与webpack配置
- 2023/03/29更新	v0.0.2
  - 优化配置，提高了开发效率，提升了开发体验
  - 优化目录结构，使符合开发习惯
  - package与manifest文件统一version信息


#### 项目交流

​	如果对项目有疑问，欢迎在Issues留下你的问题。

#### 计划下次更新

- i18
- inject.js
