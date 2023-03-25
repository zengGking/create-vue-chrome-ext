# vue-chrome-extension-template

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
│  │  ├─ options.js		  # options选项页入口文件
│  │  └─ options.vue	  # options主组件 
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
npm run build
```

#### 使用说明

1.  支持sass，如想更改预编译语言，可自行安装配置。
2.  基于Vue3，可自行引入element、vant等组件库。
3.  无vue-router，可自行安装配置。
4.  可更换插件图标，在public/img目录下替换掉原来的图标即可。
5.  **由于background.js和conten.js不能编译，只能在放在public目录下，请在该目录下开发。**
6.  **在正式发布上线前，建议将webpack.config.js的devtool功能关闭**。

#### 更新日志

- 2023/03/25 	更新version 1.0.0

#### 项目交流

​	如果对项目有疑问，欢迎在Issues留下你的问题。

#### 计划下次更新

- i18
- homepage
- inject.js
