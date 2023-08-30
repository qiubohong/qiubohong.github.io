---
title: 低代码平台加载远端组件解决方案(1)——defineAsyncComponent
date: 2023-08-29 22:00:01
toc: true
tags:
    - 每日更新
    - 技术分享
    - 低代码
---


> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

# 背景
最近在做低代码平台项目中遇到一个很容易遇到的问题，具体描述如下：

- 问题描述：低代码平台依赖的组件库，如果将一个组件库进行融合打包到平台项目中的就会导致平台在渲染页面的时候需要加载完整的组件库，从而导致页面加载了一些大部分页面不需要的组件文件
- 希望方案：页面使用到哪些组件就去动态加载组件
- 解决方案：
  - Vue的异步加载组件，`Suspense`和`defineAsyncComponent`
  - React的异步加载组件， `Suspense`和`import()`

由于低代码项目本身使用的 Vue3 框架，而且 Vue和  React的异步加载组件方案其实差异不多，所以下面以 Vue为主进行介绍。

<!-- more -->

# 基础知识

## 异步组件
在使用异步组件之前，我们需要先声明一个 Vue的异步组件，主要有以下几种方式：

第一种，采用`<script setup>`语法的，需要在 setup中 使用  await语法即可，例子如下：

```html
<script setup>
const res = await fetch(...)
const posts = await res.json()
</script>
```

第二种，声明`setup`函数增加`async`，会被识别成异步组件，具体如下：

```js
export default {
  async setup() {
    const res = await fetch(...)
    const posts = await res.json()
    return {
      posts
    }
  }
}
```

第三种，就是通过`defineAsyncComponent`函数定义异步获取的组件实例，具体如下：

```js
import { defineAsyncComponent } from 'vue'

const AsyncComp = defineAsyncComponent(() => {
  return new Promise((resolve, reject) => {
    // ...从服务器获取组件
    resolve(/* 获取到的组件 */)
  })
})
// ... 像使用其他一般组件一样使用 `AsyncComp`

```

**注意：同时Vue组件有个配置属性`suspensible`，可以用来设置`false`忽略为异步组件。**

## Suspense

> `<Suspense>` 是一个内置组件，用来在组件树中协调对异步依赖的处理。它让我们可以在组件树上层等待下层的多个嵌套异步依赖项解析完成，并可以在等待时渲染一个加载状态。 —— [Vue官方 Suspense定义](https://cn.vuejs.org/guide/built-ins/suspense.html)

`<Suspense>`解决了我们什么问题：

- 当我们有个全局 loading，就不再需要每个组件的针对自己的加载状态去写逻辑处理
- 能够更好统一处理异步组件，减少逻辑代码
- 结合路由切换 和 `<Transition>`，可以完美实现页面切换效果

目前只有异步组件才会触发`<Suspense>`状态变更。

### 使用Suspense

```html
<script lang="ts" setup>
import Aysnc from "@/components/AsyncComponent.vue";

/**
 * Suspense 组件的 pending 进入挂起状态时触发
 */
 */
const pending = ()=>{
    console.log('pending')
}

/**
 * Suspense 组件的 resolve在 default 插槽完成获取新内容时触
 */
const resolve = ()=>{
    console.log('resolve')
}

/**
 * Suspense 组件的  fallback 插槽的内容显示时触发
 */
 */
const fallback = ()=>{
    console.log('fallback')
}
</script>
<template>
    <h3>测试 Supsense</h3>
    <Suspense @pending="pending" @resolve="resolve" @fallback="fallback">
        <!-- 具有深层异步依赖的组件 -->
        <aysnc />

        <!-- 在 #fallback 插槽中显示 “正在加载中” -->
        <template #fallback>
            <h1>正在加载中...</h1>
        </template>
    </Suspense>
</template>
```

其中，`Suspense`组件有三个事件分别是：

- `pending` 进入挂起状态时触发
- `fallback` 插槽的内容显示时触发
- `resolve` default 插槽完成获取新内容时触


## defineAsyncComponent

> 定义一个异步组件，它在运行时是懒加载的。参数可以是一个异步加载函数，或是对加载行为进行更具体定制的一个选项对象。 —— [Vue异步组件](https://cn.vuejs.org/api/general.html#defineasynccomponent)

通过官方定义，从中可以得到两层意思，分别是：

- 第一是这个函数是专门用来的定义异步组件的，其参数是一个`async`函数，结合ES Module`import()`动态导入，可以快速实现懒加载组件
- 第二是这个函数是可以从远端加载组件描述代码，而这个恰恰就是本文的重点


第一种用法就很简单了，通过 import()引入的组件会在打包的时候单独分割成一个文件，当使用的时候才会去加载。代码如下：

```js
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
  import('@/component/AsyncComponent.vue')
);
```


vite或者 Webpack 会把`AsyncComponent.vue`文件单独拆分打包成一个 js文件。

第二种用法是从远端服务器加载一个组件回来，然后加载成组件进行页面渲染，如下描述。

# 加载服务器上的组件

如果利用第二种方式去加载组件，我们最期待的代码效果如下：

```html
<script setup>
import { defineAsyncComponent } from 'vue';

const AsyncComponent = defineAsyncComponent(() =>
    // 从服务器获取组件
    const async = await fetch('https://example.com/AsyncComponent.js')
    resolve(async)
    return async
);

// 后续可以直接在 template中使用 AsyncComponent
</script>
<template>
 <AsyncComponent />
</template>
```

那么`AsyncComponent.js`这种组件的代码应该如何生成呢？

但是，当数据还没返回来的时候，页面是不知道会渲染什么组件的。所以我们遇到第一个问题：

问题： 如何从远端加载 Vue组件，Vue通过`defineAsyncComponent`函数帮忙解决了加载问题，那么我们还需要知道这个函数支持加载什么格式的组件。

为了解决这个问题，我们先需要复习一下 Vue的组件基础知识

1. 如何去定义一个组件，在 Vue 官方文档中是这么定义一个非单文件(.Vue)的组件， 如下所示：

```js
// 选项式的组件
export default {
  data() {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count++">
      You clicked me {{ count }} times.
    </button>`
}
```

2. Vue组件注册知识，分为全局注册和局部注册，如下所示：

全局注册代码如下：
```js
import { createApp } from 'vue'
import MyComponent from './App.vue'

const app = createApp({})

app.component('MyComponent', MyComponent)
```

局部注册如下：

```js
<script>
import ComponentA from './ComponentA.vue'

export default {
  components: {
    ComponentA
  }
}
</script>

<template>
  <ComponentA />
</template>
```
复习完组件定义和注册，那么我们大概就知道如何解决【如何从远端加载Vue组件并进行注册使用？】，步骤如下：

- 编写远端组件文件，需要符合组件的基本配置规范
- 利用`defineAsyncComponent`函数异步加载组件机制去拉取远端组件
- 解析远端组件文件内容，生成按照组件定义规范返回组件的对象`resolve`返回
- 通过全局或局部注册，将`defineAsyncComponent`函数返回对象进行注册

示例代码如下：

1. 制造符合组件规范的文件`Async.js`
```js
// Async.js
export default {
  "template": `<h1>我是异步组件</h1><div></div><button @click="count++">\
        点击了 {{ count }} 次
      </button>`,
  "script": {
    "data": {
      "count": 0
    }
  }
}
```

2. 解析组件和注册组件

```html
<script lang="ts" setup>
...
</script>
<template>
    <h3>测试 Supsense</h3>
    <Suspense>
        <!-- 具有深层异步依赖的组件 -->
        <AsyncDD />

        <!-- 在 #fallback 插槽中显示 “正在加载中” -->
        <template #fallback>
            <h1>正在加载中...</h1>
        </template>
    </Suspense>
</template>
<script lang="ts">
import { defineAsyncComponent } from 'vue/dist/vue.esm-bundler.js';
/**
 * 加载远端+解析组件
 * @param url 
 */
const loadRemoteComponent = async (url: string) => {
    const response = await fetch(url);
    const scriptText = await response.text()
    let Component: any = '';
    try {
        const scriptStr = scriptText.replace('export default', '')
        Component = new Function('return ' + scriptStr)()
        console.log(Component)
    } catch (e) {
        console.error(e)
    }
    return Component
}

const AsyncDD = defineAsyncComponent(() => {
    return new Promise((resolve) => {
        setTimeout(() => {
            loadRemoteComponent('/async/demo.js').then((Component) => {
                resolve(Component)
            });
        }, 2000);
    });
})
export default {
    components: {
        AsyncDD
    }
}
</script>
```

## 项目实战
上述这种解决方案很明显存在问题，但是基础解决思路是没有问题，主要问题在于

> - 无法使用`vue`单文件
> - 无法通过`import`引用外部资源

如何解决呢，由于项目实战还在研究中，打算放到下一篇项目实战去解决掉，尽情期待。

# 参考资料

- [Vue 异步组件](https://cn.vuejs.org/guide/components/async.html)
- [Vue Suspense 组件](https://cn.vuejs.org/guide/built-ins/suspense.html)
- [《Vue.js设计与实现》](https://weread.qq.com/web/bookDetail/c5c32170813ab7177g0181ae)书中 第 13 章 异步组件与函数式组件