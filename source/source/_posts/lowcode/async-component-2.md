---
title: 低代码平台加载远端组件解决方案(2)——项目实战
date: 2023-09-04 22:00:01
toc: true
tags:
    - 每日更新
    - 技术分享
    - 低代码
---


> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

# 背景
前阵子搞了一下如何在Vue项目中加载远程的组件，文章为[【低代码平台加载远端组件解决方案(1)——defineAsyncComponent】](https://qborfy.com/lowcode/async-component.html)，遗留一些问题，就是如何在项目中实际应用，因为所有的问题都来源自实际项目，所以本文会继续把这个坑填完。



# 解决思路

涉及到项目实战了，解决方案是需要通过`wepack`或`vite`构建工具将资源进行打包，然后通过解析文件，进行模拟封装成可以加载的 js函数即可，下面我们以 vite为构建工具进行编译组件文件`async/Async.vue`
<!-- more -->

解决步骤
1. 给`Async.vue`单独创建一个编译脚本，如`vite.remote.config.ts`，参考配置如下：

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      'vue': 'vue/dist/vue.esm-bundler.js'
    },
  },
  plugins: [
    vue(),
  ],
  build: {
    lib: {
      entry: './src/components/Async.vue',
      name: 'AsyncComponent',
      fileName: 'AsyncComponent.bundle',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
        dir: 'dist/remote'
      },
    },
  },
})
```

2. 执行构建后会生成两个文件`RemoteComponent.bundle.mjs`和 `RemoteComponent.bundle.umd.js` 到 `dist/remote/` 目录下

```sh
vite -c vite.async.config.ts build
```

3. 调整`loadRemoteComponent`解析远端组件的函数，可以通过加载 `window.Vue` 标签的形式进行引入`RemoteComponent.bundle.umd.js`加载使用

```js
const loadRemoteComponent = async (url: string) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.src = url
        script.onload = () => {
            resolve(window.AsyncComponent)
        }
        script.onerror = () => {
            reject(new Error('Failed to load remote component'))
        }
        document.head.appendChild(script)
    })
}
```

4. 调整源项目入口文件`main.ts`，将Vue暴露到window全局对象中，方便远程组件注册使用

```js
/**
 * main.ts
 */
import * as Vue from 'vue'
import App from './App.vue'
import router from './router'


const app = Vue.createApp(App)
app.use(router)
app.mount('#app')

// 暴露全局对象到window
window.Vue = Vue
```

注意细节问题：

- 当使用




# 缺陷

1. 将`Vue`暴露到全局里，将 Vue 暴露到 window 对象上可能会带来以下几个潜在问题：

- 全局命名空间污染：将 Vue 实例挂载到 window 对象上可能会导致全局命名空间污染，从而增加代码冲突和意外覆盖的风险。如果你的项目中使用了其他库，或者多个 Vue 应用共享同一个页面，这可能会导致问题。
- 安全风险：将 Vue 实例暴露到全局作用域可能会增加安全风险，因为恶意第三方脚本可以访问和修改 Vue 实例。这可能导致应用程序的数据泄露或被篡改。
- 模块化和封装：将 Vue 实例挂载到 window 对象上破坏了模块化和封装原则。这可能会导致代码难以维护和扩展。使用模块化的方法（例如 ES6 模块或 CommonJS）可以更好地组织和管理代码。
- 可测试性：将 Vue 实例暴露到全局作用域可能会影响代码的可测试性。编写针对全局对象的测试可能会更加复杂，因为你需要在测试用例之间清理和重置全局状态。


当然这样子的配置大概是可以实现单个 vue文件进行打包放到远程服务器上，然后我们在另外一个项目去加载实现，从而解决掉低代码需要依赖很多组件从而导致初次加载文件很大的问题。

非常感谢大家耐心查看，如果上述描述的方案有任何问题都可以留言讨论，博主会第一时间随时调整和验证。