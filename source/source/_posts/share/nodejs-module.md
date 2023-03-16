---
title: Node冷门知识点—— node.js支持import语法
date: 2023-03-16 19:21:01
tags:
    - 技术分享
---

# js模块化

前端主流模块化规范，目前有以下几种：

- CommonJS， Node.js提出的规范
- ECMAScript Module，ESM，由ECMAScript组织提出的JavaScript标准规范
- 已淘汰的有：CMD、AMD等，再就综合体UMD（支持各种规范的集合体）

因此，主流有两种规范`CommonJS`和`ESM`两种规范，但是由于Node.js不支持`ESM`规范，导致很多时候我们的项目里面并存两种规范的代码，从而出现下面这种情况：

```js
// 在node端执行构建的时候
const _ = require('loadsh')

// 在浏览器端实现的时候
import _ from 'loadsh';
```

这样子开发就很容易出现痛点，往往我们的解决方案就是通过各种构建工具去解决，如：`webpack` `vite`，尤其是我们在写项目中写node.js编译脚本，经常需要切换。

但是从Node.js V14+版本后，它开始支持ESM规范啦，你可以直接在Node.js中使用`import` `export`等语法了，终于等到这一天😭。

<!-- more -->
PS: 其实早在Node.js V8.5版本就已经加入该特性了，只不过一直需要通过全局变量`–experimental-modules`去开启这一特性，由于不稳定性大多数项目都没有开启，不过自从16+后，我们就可以大胆放心在项目中使用了，不过一些古老的项目建议暂时不用开启。


# 怎么使用

我们先从官网上去看相关使用说明：

>  Node.js 有两个模块规范：`CommonJS`模块规范 和 `ECMAScript`模块规范 
> 开发者可以通过 `.mjs` 文件扩展名、`package.json`中设置`type=module`或`node xxx.js --input-type` 标志告诉 Node.js 使用 `ECMAScript`规范去执行代码。 如果没这些设置，Node.js 将使用 `CommonJS` 去执行。[Node.js Modules: ECMAScript modules](https://nodejs.org/docs/latest-v16.x/api/esm.html)

通过上述我们就可以知道几个使用方式：

1. 将文件后缀改为`.mjs`，node.js加载的时候自动会用`ESM`规范
2. 在项目中`package.json`新增配置项`"type":"module"`，那么整个项目中的.js文件都会按照`ESM`规范去执行
3. 增加执行参数`--input-type`也可以实现相同效果


## 各种使用方式

1. 常规方式：

```js

import _ from 'lodash';

import { readFile } from 'fs';

import Demo from './Demo.mjs'; // 绝对路径或相对路径都可以

export readFile;
export default readFile;
```

2. 带参数的使用：


```js
// 由于参数不同， 这个会让`foo.mjs`被加载两次，而不会利用缓存中的`foo.mjs`
import './foo.mjs?query=1'; // loads ./foo.mjs with query of "?query=1"
import './foo.mjs?query=2'; // loads ./foo.mjs with query of "?query=2"
```

3. 支持`data:`格式URL的形式

```js
import 'data:text/javascript,console.log("hello!");'; // text/javascript 会将后面的内容当成js模块
import { test } from 'data:text/javascript,function test(){console.log("test")};export {test};'; // 这里我们是不是扩宽思路，直接加载在线js呢？

import _ from 'data:application/json,"world!"' assert { type: 'json' }; // application/json 则是json

// application/wasm for Wasm
```

4. assert断言(实验特性)
将文件强制加载为某种格式内容，如：`json` `javascript` `webassembly`等

```js
import fooData from './foo.json' assert { type: 'json' };
```

5. 加载commonjs规范模块

当然肯定也支持加载commonjs规范的模块，用法如下：
```js
import { default as cjs } from 'cjs'; // module.exports 导出
import cjsSugar from 'cjs'; // module.exports
import * as m from 'cjs';
```

6. import() 异步导入
这种用法就很正常，不需要实时加载，等到需要用的时候再加载
```js
const { default: barData } =
  await import('./bar.json', { assert: { type: 'json' } });

```

7. 支持从http/https引入(实验特性)

目前属于实验特性，有限制，比如：

- 不支持http2/3协议
- http协议只能用于127.0.0.1等本地ip地址
- Cookie、Authorization等信息不会携带发送
- 只会加载执行远端的js文件，而不会加载远端中依赖其他文件

```js
import worker_threads from 'node:worker_threads';
import { configure, resize } from 'https://example.com/imagelib.mjs';
configure({ worker_threads });
```

## 限制

唯一的限制：当开启ESM规范后，你只允许填写`import`或`export`，不允许使用`require`或`module.exports`，会报一下错误:

```shell
const a  = require('a')
           ^
ReferenceError: require is not defined in ES module scope, you can use import instead
    at file:///Users/borfyqiu/Desktop/study/github/qiubohong.github.io/code/demo-rollup/test.mjs:4:12
    at ModuleJob.run (node:internal/modules/esm/module_job:193:25)
    at async Promise.all (index 0)
    at async ESMLoader.import (node:internal/modules/esm/loader:530:24)
    at async loadESM (node:internal/process/esm_loader:91:5)
    at async handleMainPromise (node:internal/modules/run_main:65:12)
```

# 总结
其实这个也不算是冷门知识，只要稍微对Node.js有做持续关注，基本上都可以了解到该特性。

但是作为不关注的人，很容易就陷入自己的知识误区，会一直认为Node.js不支持ESM规范，甚至会吐槽Node.js为什么不支持呢？

所以这里有一句话需要提醒自己—— 【书山无路勤为径，学海无涯苦作舟】。

> 做一个有温度的技术分享作家 —— qborfy

# 参考资料

- [Node ESM官方说明文档](https://nodejs.org/docs/latest-v16.x/api/esm.html)