---
title: 前端面试100道手写题（5）—— Router路由
date: 2023-06-20 22:00:00
tags:
    - 学习总结
    - 前端面试
---

# 前言

前端路由，大家都使用过，那么有没有想过它是怎么实现的吗？如：Vue-Router 或者 React-Router。或许有个大概印象，但是真正要自己去实现还是没有什么思路，那么这篇文章将完整的实现思路去实现一次。

手写难度：⭐️⭐️⭐️

涉及知识点：

- history api 和监听事件
- onhashchange 监听事件

<!-- more -->

# 路由管理

路由管理，是指的 web 应用在浏览器下根据不同的url地址展示不同的内容或者页面。

不管是 Vue-Router 或者  React-Router，基本上都是基于浏览器两种路由控制有一定了解，如下：

- hash，代表网页中的一个位置，通常用来做锚点使用，后面被用于单页web 应用的路由控制
- history，代表网页的历史记录，同时提供接口操作浏览器的曾经在标签页或者框架里访问的会话历史记录

下面我们对两个进行简单了解。

## Hash

> Hash，通常是指的浏览器 URL 地址中带#的值，如：`URL = https://baidu.com/#/page1`，那么 `URL.hash='#/page1'`

Hash 常用的 的几个方法：

**`hashchange`**

> 当 URL 的片段标识符更改时，将触发hashchange事件

```js
window.addEventListener('hashchange', function() {
  console.log('The hash has changed!')
}, false);
```

**`调整 hash`**

除了监听改变之外，我们还需要对Hash 自由调整，如：添加或者修改，代码如下：

```js
location.hash = '#/page2'
```

## History

> `History` 接口允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。

`History` 提供的 API 接口：

- `pushState(state, unused, url)`  按指定的名称和 URL（如果提供该参数）将数据 push 进会话历史栈  如：`history.pushState({page: 1}, "title 1", "?page=1")`
- `replaceState(state, unused, url)`  按指定的数据、名称和 URL（如果提供该参数），更新 history 栈上最新的条目 如：`history.replaceState({page: 3}, "title 3", "?page=3");`
- `back()` 转到浏览器会话历史的上一页 等价于 `history.go(-1)`
- `forward()` 转到浏览器会话历史的下一页 等价于 `history.go(1)`

还有一个比较重要的事件就是 `onpopstate`，用来监听浏览器的历史记录发生变化的。

# Router 实现

在了解完路由管理机制，接下来我们对  `Vue-Router`  和  `React-Router` 的功能实现做一个总结，一个基础的 `Router` 应该具备以下功能：

- 路由中心，负责注册、匹配、存储等功能
- `router-view` 和 `router-link`组件实现
- 跳转api

Router基本功能流程要点如下：

{% diagramsnet "/assets/drawio/router-flow.drawio" %}


接下来我们就按照每个功能模块进行简单实现。

## 路由中心
路由中心功能分为两块，一是注册管理，二是监听匹配。

### 注册管理
注册管理，顾名思义就是将所有路由对应页面组件配置统一管理，当路由改变的时候，可以直接从配置找到对应页面组件。

```js
/**
 * 注册路由
 * @param {*} routes 
 * @param {*} mode 
 * @returns 
 */
function createRouter(routes, mode='history'){
    // 保存路由
    const matcherMap = new Map()
    for (let route of routes) {
        matcherMap.set(route.name, route)
    }

    // 添加路由
    function addRoutes(routes){
        for (let route of routes) {
            matcherMap.set(route.name, route)
        }
    }

    // 删除路由
    function removeRoutes(routes){
        for (let route of routes) {
            matcherMap.delete(route.name)
        }
    }

    // 获取路由
    function getRoutes(){
        return matcherMap
    }

    // 获取路由
    function getRoute(name){
        return matcherMap.get(name)
    }

    const router = {
        addRoutes,
        removeRoutes,
        getRoutes,
        getRoute
    }

    return router
}

```

### 路由匹配


## 组件

## api

# 参考资料

- [MDN History资料](https://developer.mozilla.org/zh-CN/docs/Web/API/History)