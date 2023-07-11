---
title: 前端架构成长之路——微前端系列(二)之qiankun框架实战
date: 2023-06-18 18:00:01
toc: true
tags:
    - 技术分享
    - 架构系列
---

# 背景
之前有写过专门一篇关于微前端架构的基础知识——[《前端架构成长之路——微前端架构理论篇》](https://qborfy.com/framework/frontend-microapp-1.html)，但是里面主要讲几个点：

- 微前端是什么，具体能做些什么
- 微前端的一些主流框架
- 微前端拆分项目的一些原则

那么其实对于微前端应用还是有些不太清楚，下面就用微前端架构去对某个古老项目进行框架升级，这其实也是微前端架构主要特性之一，对项目升级的方案之一。

<!-- more -->

在使用 `qiankun`  框架之前，脑子里有几个疑问：

- `qiankun` 是怎么做到将不同框架的项目放在一起，是通过打包，还是其他方式：
  - `qiankun` 是有`1个主基座` + `N 个微应用`
  - `qiankun` 利用路由控制，去加载不同的微应用，微应用与主应用之间消除跨域问题
  - `qiankun` 需要在子应用里加入生命周期钩子函数提供给主应用调用

搞明白后，我们就可以开始进行项目实战，

# 项目实战

由于本次是将老项目升级到新版本框架中，因此将采用 Monorepo 架构对新老项目进行统一管理。项目结构大概 如下所示：

```
qiankun-demo
├── apps # 应用层
|  ├── main #  基座项目
|  |  ├── ...
|  ├── old #  老版项目
|  |  ├── ...
|  └── new #  新版项目
|     ├── ...
├── README.md
├── nx.json #  nx.js 管理Monorepo
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
```

## main-基座项目
 `qiankun` 的基座项目和普通 web 项目初始化没有什么区别，你可以基于 `React`  或  `Vue` 作为基座项目框架都可以，但是需要入口文件需要做一下调整，下面我以 `Vue+Vite` 项目为例:

步骤一： 初始化项目

```shell
npm create vite@latest main-vue -- --template vue
# 添加 qiankun
npm i qiankun -S
```

步骤二：在`main.ts`准备好基座项目以及注册微应用

```ts
import { createApp } from 'vue'
import { registerMicroApps, start , runAfterFirstMounted, setDefaultMountApp} from 'qiankun';
import './style.css'
import App from './App.vue'

/**
 * Step1 初始化应用
 */
createApp(App).mount('#app')

/**
 * Step2 注册子应用
 */
registerMicroApps(
    [
        {
            name: 'old-web', // 注册后子应用的名字 老项目启动端口为8080
            entry: '//localhost:8080', // 这里可以根据环境变量配置
            container: '#subapp-viewport',
            activeRule: '/old',
        },
        {
            name: 'new-web', // 注册后子应用的名字 新项目启动端口为8090
            entry: '//localhost:8090',
            container: '#subapp-viewport',
            activeRule: '/new',
        },
    ],
    {
        // qiankun 生命周期钩子 - 加载前
        beforeLoad: [
            (app) => {
                console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            },
        ],
        beforeMount: [
            (app) => {
                console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            },
        ],
        afterMount: [
            (app) => {
                console.log('[LifeCycle] after mount %c%s', 'color: green;', app.name);
            },
        ],
        beforeUnmount: (app) => {
            console.log('[LifeCycle] before Unmount %c%s', 'color: green;', app.name);
        },
        afterUnmount: [
            (app) => {
                console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            },
        ],
    },);

/**
 * Step3 设置默认进入的子应用
 */
// setDefaultMountApp('/old');

/**
 * Step4 启动应用
 */
start();

runAfterFirstMounted(() => {
  console.log('[MainApp] first app mounted');
});
```

## microapp-微应用
微应用其实改动代码不多，只是需要将qiankun 所需要的接口(`bootstrap`, `mount` `unmount`) 暴露出来即可

步骤一： 新建 `public-path.js` 代码如下：
```js
// 主要用来区分 qiankun 加载资源路径
if (window.__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

步骤二： 在 `app.js` 加入`qiankun`的接口，将 render 函数

```js
var React = require('react')
var ReactDom = require('react-dom')
var ReactRouter2 = require('react-router')
var RouteConfig = require('./config/RouteConfig')
var Utils = require('radmin').Utils

import { createHistory } from 'history'
import './public-path.js'
import ReactRouter, { Router, Route, useRouterHistory } from 'react-router'
var appHistory = useRouterHistory(createHistory)({ queryKey: false });

require('../less/index.less')

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('[react15] react app bootstraped');
}

export async function mount(props = {}) {
  console.log('[react15] props from main framework', props);
  const { container } = props;
  // 这里判断 container 是否qiankun 携带进来的
  ReactDom.render(<ReactRouter2.Router routes={Utils.combineConfig(RouteConfig)} history={appHistory} />, container ? container.querySelector('#react15Root') : document.getElementById('react15Root'))
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#react15Root') : document.getElementById('react15Root'),
  );
}
// 独立的时候可自主运行
if (!window.__POWERED_BY_QIANKUN__) {
  bootstrap().then(mount);
}else{
  window.bootstrap = bootstrap;
  window.mount = mount;
}
```

步骤三： 在`webpack.config.js`调整打包配置，将 `app.js`暴露到`window`中:
```js
var path = require('path')
module.exports = {
    entry: [
        path.resolve(__dirname, './src/js/app')
    ],
    output: {
        path: path.resolve(__dirname, 'hot'),
        filename: 'app.js',
        library: `${packageName}-[name]`,
        libraryTarget: 'umd',
        globalObject: 'window',
        jsonpFunction: `webpackJsonp_${packageName}`,
    }
}
```

到了这里，基本上就可以完成项目改造工作了，但是后续还需要其他一些改动点，如：

1. 基座项目需要切换为真实域名，可以按照构建环境变量去切换
2. 微应用需要注意资源使用相对路径
3. 针对不同打包工具，都需要将`bootstrap` `mount` 函数进行暴露到 `window` 对象中，因为 `qiankun` 会拦截代理 `window`去运行微应用
4. 需要解决不同应用之间的登录态等问题

# qiankun 的缺陷
虽然 qiankun 使用起来很简单，但是在实际应用还是存在一些缺陷，但是在将其引入到项目中的时候，需要考虑这些点：

- 对于 jQuery 老项目支持度不够，即使有解决方案，但是需要对 qiankun 整个框架原理深入了解才能明白如何解决
- 沙箱隔离机制并不完美，如：写 css 代码挂载到 document.body，会导致样式污染
- 通讯机制较简单，基于一个全局的 globalState 对象，去提供给到各个微应用去使用

# 参考资料

- [qiankun官网](https://qiankun.umijs.org/zh)
- 