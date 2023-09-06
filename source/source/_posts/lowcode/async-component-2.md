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
  publicDir: false, // 忽略public资源包
  build: {
    // 入口文件
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

## 其他问题

- 在Typescript中对window进行赋值时候会出现报错，需要对全局变量声明，代码如下：

```js
declare global {
    var Vue: any
    var AsyncComponent: any
}
```
当然如上所述的vite配置大概是可以实现单个 vue文件进行打包放到远程服务器上，然后我们在另外一个项目去加载实现，从而解决掉低代码需要依赖很多组件从而导致初次加载文件很大的问题。

# 缺陷

不过在实现和应用后，还是发现很多一些缺陷，具体如下：

## Vue暴露全局

问题描述：将`Vue`暴露到全局里，将 Vue 暴露到 window 对象上可能会带来以下几个潜在问题：

- 全局命名空间污染：将 Vue 实例挂载到 window 对象上可能会导致全局命名空间污染，从而增加代码冲突和意外覆盖的风险。如果你的项目中使用了其他库，或者多个 Vue 应用共享同一个页面，这可能会导致问题。
- 安全风险：将 Vue 实例暴露到全局作用域可能会增加安全风险，因为恶意第三方脚本可以访问和修改 Vue 实例。这可能导致应用程序的数据泄露或被篡改。
- 模块化和封装：将 Vue 实例挂载到 window 对象上破坏了模块化和封装原则。这可能会导致代码难以维护和扩展。使用模块化的方法（例如 ES6 模块或 CommonJS）可以更好地组织和管理代码。
- 可测试性：将 Vue 实例暴露到全局作用域可能会影响代码的可测试性。编写针对全局对象的测试可能会更加复杂，因为你需要在测试用例之间清理和重置全局状态。

解决方案暂无，后面如果有解决方案会补充到这里来。

## vite的lib模式多入口打包

问题描述：`vite.remote.config.ts`文件中只能单独打包一个Vue文件，如果是多个Vue文件，这里无法解决，其实要解决的话也很简单，就是使用多入口打包。

关于vite的lib模式多入口打包，官网并没有比较灵好的解决方案，解决方案，如下：

- 通过编写`build.mjs`，去遍历需要打包的文件，然后传入变量到`vite`的`config`配置中

下面的具体代码`build.mjs`

```js
import { defineConfig, build } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

/**
 * 获取需要编译的入口组件列表
 * @returns 
 */
const getBuildItems = () => {
    return [
        {
            entry: path.resolve('./src/components/Async.vue'), // 入口文件地址
            name: 'AsyncComponent', // 组件名称
        },
        {
            entry: path.resolve('./src/components/ListWebSite.vue'),
            name: 'ListWebSite',
        }
    ]
}

const buildItems = getBuildItems()

buildItems.forEach(item => {
    build({
        configFile: false,
        resolve: {
            alias: {
                '@': '/src',
                'vue': 'vue/dist/vue.esm-bundler.js'
            },
        },
        plugins: [
            vue(),
        ],
        publicDir: false, // 忽略public资源包
        build: {
            cssCodeSplit: false, // 禁用 CSS 代码分割
            lib: {
                entry: item.entry,
                formats: ['umd'],
                name: item.name
            },
            rollupOptions: {
                external: ['vue'],
                output: {
                    entryFileNames: () => '[name].[format].js',
                    assetFileNames: `[name].[ext]`,
                    globals: {
                        vue: 'Vue',
                    },
                    dir: `dist/remote/${item.name}`, // 固定到对应文件夹中
                },
            },
        }

    })
})
```


## 组件css样式文件注入到JS

问题描述：在打包后我们发现，打包后会自动生成一个style.css文件，但是我们在加载js文件并没有把css文件也加载，导致组件样式无法正常显示。

> Vite Issue: [Can css be styleInjected in library mode?](https://github.com/vitejs/vite/issues/1579)
> 尤大大在原文是这么描述的：
> [Evan You](https://github.com/yyx990803)The problem is injecting the style assumes a DOM environment which will make the library SSR-incompatible.
> If you only have minimal css, the easiest way is to simply use inline styles.

翻译过来就是：问题是注入样式假定了 DOM 环境，这将使库 SSR 不兼容。如果您只有最少的 CSS，最简单的方法就是简单地使用内联样式。

解决方案：如果我们非要这么实现的话，可以自己写个插件，通过vite构建过程，将css样式代码注入到js文件中，主要还是通过创建`<link>`标签去加载组件的样式文件。

其实已经有现成的插件[`vite-plugin-css-injected-by-js`](https://github.com/marco-prontera/vite-plugin-css-injected-by-js)了，我们这里简单学习如何开发一个vite插件了。

写一个vite插件，具体如下：

```js
/**
 * 生成
 * @param {*} cssCode 
 * @param {*} styleId 
 * @returns 
 */
function injectCssIntoHtml(cssCode, styleId) {
    cssCode = '`'+cssCode+'`'
    const styleHtml = `
    ;(function(){ 
        try {
            var elementStyle = document.createElement(\'style\'); 
            var styleNode = document.createTextNode(${cssCode});
            elementStyle.appendChild(styleNode);
            elementStyle.id = "${styleId | Date.now()}";
            document.head.appendChild(elementStyle);
        }catch(e){
            console.error(\'vite-plugin-css-injected-by-js\', e);
        }
    })();
    `.replace(/\n/g, '') // 简单压缩
    return styleHtml;
}

/**
 * 将组件样式注入js中，generateBundle 是Rollup的hook函数，时间点在bundle资源生成末尾，write写入之前调用
 * 大概实现原理，在构建bundle中，去掉css的资源生成，将其代码通过js代码进行实现
 * @param {*} styleId 样式id
 */
function VitePluginStyleInject(styleId) {
    let styleCode = '';

    return {
        name: 'vite-plugin-style-inject', // 插件名称
        apply: 'build', // 应用模式
        enforce: 'post', // 作用阶段
        generateBundle: function (opts, bundle) {
            // + 遍历bundle
            for (const key in bundle) {
                if (bundle[key]) {
                    const chunk = bundle[key]; // 拿到文件名对应的值
                    // 判断+提取+移除
                    if (chunk.type === 'asset' && chunk.fileName.includes('.css')) {
                        styleCode += chunk.source;
                        console.log('key:', key, styleCode + " ========>")
                        delete bundle[key];
                    }
                }
            }

            // 找到对应js资源，将生成的styleCode写入
            const styleTemplate = injectCssIntoHtml(styleCode, styleId); 
            for (const key in bundle) {
                const chunk = bundle[key]
                if(chunk && chunk.type === 'chunk' && chunk.fileName.match(/.[cm]?js$/) !== null){
                    const initialCode = chunk.code; // 保存原有代码
                    // 拼接原有代码
                    chunk.code = styleTemplate + initialCode 
                    // 一个bundle插入一次即可
                    break; 
                }
            }
        }
    };
}
```

使用插件配置只需要在vite的配置插件加入即可：

```js
{
    ...
    plugins: [vue(), VitePluginStyleInject(),]
    ...
}
```


非常感谢大家耐心阅读，如果上述描述的方案有任何问题都可以留言讨论，博主会第一时间随时调整和验证。 涉及到的测试案例+`build.async.mjs`源码放到github上，感兴趣可以去看看。

[完整版本vite构建配置 build.async.mjs](https://github.com/qiubohong/website/blob/master/build/build.async.mjs)

# 附录

## Rollup Hook函数生命周期

![/assets/img/rollup-hook-life.png](/assets/img/rollup-hook-life.png)

所以项目中使用vite，其实可以参考Rollup这个生命周期，遇到一些问题可以很快速的定位和解决。

# 参考资料

- [Vite官方文档](https://cn.vitejs.dev/guide/)
- [vite-plugin-css-injected-by-js 一个可以把css打包到js文件里的vite插件](https://github.com/marco-prontera/vite-plugin-css-injected-by-js)
- [Multiple entry points/output in library mode? (Vite Lib模式下的多个入口点?)](https://github.com/vitejs/vite/discussions/1736)