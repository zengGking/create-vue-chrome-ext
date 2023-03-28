<h1 align="center">vue-chrome-extension-template</h1>
<h5 align="center">打造chrome插件的快速开发模板</h5>
<h6 align="right">————向优秀致敬，向榜样学习</h6>
<div align="center"><img src="https://img.shields.io/badge/license-Mulan_PSL_v2-blueviolet"/><img src="https://img.shields.io/badge/chrome_extension-v1.0.0-blueviolet"/><img src="https://img.shields.io/badge/Vue3-webpack-blueviolet"/></div>




#### 介绍

​	基于vue3的chrome插件的快速开发模板，基于webpack打包工具构建项目。项目采用vue框架对popup页面、options选项页面进行开发。

#### 文件资源目录
```
vue-chrome-extension-template
├─ dist            # 打包目录
├─ public                 # 静态资源文件（该文件夹不会被打包）
│  ├─ img				  # 存放插件图标，亦可存放图片资源
│  ├─ js
│  │  ├─background.js	  # chrome插件的background页面,因为不能编译所以放在静态资源文件下开发
│  │  └─content.js		  # chrome插件的content_script,因为不能编译所以放在静态资源文件下开发
│  ├─ popup.html		  # popup的html模板	
│  └─ options.html        # options选项页的html模板	
├─ src
│  ├─ popupView           # popup页面
│  │  ├─ popup.js		  # popup入口文件	
│  │  └─ popup.vue	 	  # popup主组件
│  └─ optionsView         # options选项页面，可以不需要，按照项目需求进行删减。
│     ├─ options.js		  # options选项页入口文件
│     └─ options.vue	  # options主组件 
├─ .browserslistrc 		  # 浏览器兼容配置
├─ manifest.json		  # chrome插件重要配置文件，必须有这个文件
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
```

#### 使用说明

- 支持sass，如想更改预编译语言，可自行安装配置。
- 基于Vue3，可自行引入element、vant等组件库。
- 无vue-router，可自行安装配置。
- 可更换插件图标，在public/img目录下替换掉原来的图标即可。
- **⚠由于background.js和conten.js不能编译，只能在放在public目录下，请在该目录下开发。**
- **⚠在正式发布上线前，建议将webpack.config.js的devtool功能关闭**。
- **⚠如果不需要options选项页，请在webpack.config.js中修改如下配置，提升开发体验。**

```js
//webpack.config.js
module.exports = {
   
    entry: {
        popup: "./src/popupView/popup.js",
       // options: './src/optionsView/options.js', 删除
    },
    //...
    plugins:[
       //...
       //	删除以下内容
       // new HtmlWebpackPlugin({
       //     filename: 'html/options.html',
       //     template: path.resolve(__dirname, 'public/options.html'),
       //     chunks: ['options']
       // }),
    ]
}
```



#### 更新日志

- 2023/03/28更新	v1.0.1
  - 优化配置，提高了开发效率，提升了开发体验

- 2023/03/25更新	v1.0.0

#### 项目交流

​	如果对项目有疑问，欢迎在Issues留下你的问题。

#### 计划下次更新

- i18
- homepage
- inject.js
