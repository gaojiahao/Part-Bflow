<p align="center">
    <a href="https://www.roletask.com">
        <img width="200" src="static/favicon.ico">
    </a>
</p>

# PART-BFLOW

> page components loader

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 文件结构
```
|-- build 项目构建配置
|-- config 开发相关配置
|-- dist 编译输出生产环境代码
|-- doc 项目相关文档
|-- src 项目代码
     |-- components 组件
	 |-- directive 自定义指令
	 |-- filter 自定义过滤器
     |-- mock mock模拟数据
	 |-- resources 资源文件
	 |-- router 路由配置
	 |-- services 服务
	 |-- style 样式
	 |-- utils 辅助类
	 |-- view 页面文件
	 |-- App.vue 程序主入口vue文件
	 |-- main.js 程序主入口js
|-- static 静态文件
|-- test 测试相关
|-- index.html 程序挂载页面

```

## 编码规范
# vue组件
1、组件文件名称全部为小写字母,如果为了突出文件名,而导致文件名过长,用`-`隔开定义
	如: 进度环  progress-ring
2、组件名称词之间首字母大写
	如: 进度环  ProgressRing