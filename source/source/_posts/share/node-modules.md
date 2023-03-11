---
title: Node冷门知识点——require('node:path')
date: 2023-03-09 19:21:01
tags:
    - 技术分享
---

# 背景

今天在看Vite的源码时候，发现有个用法很神奇，代码如下：

```js
import path, { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { readFileSync } from 'node:fs'

const { version } = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url)).toString(),
)
...
```

源码地址在:[vite/src/node/cli.ts](https://github.com/vitejs/vite/blob/main/packages/vite/src/node/cli.ts)

因此想要研究一下为什么要用`node:path`，而不是直接应用 `import path from 'path'`呢？下面就来好好分析一下。

<!-- more -->

# require机制

首先，我们需要先搞清楚`require`加载流程:

- 加载核心模块，如：fs、path等，其实在node运行的时候，已经放到内存中了
- 加上对应文件后缀，优先级为：test.js > test.json > test.node
- 搜索路径，如果有指定路径则按照路径去找，如：require(‘./test’) 则在当前目录寻找
- 如果没有指定路径，则从当前目录下往上去找 node_modules文件夹，然后从文件夹里去遍历寻找对应模块名，如果找不到则到上一层node_modules去找，直到最顶层目录
- 首次会加载比较慢，后面node.js 会将缓存相关信息到内存避免二次查询

所以当我们加载内置模块的时候，如：`require('fs')`时候，其实是直接用node内存的变量


# Node:ModuleName

接下来我们再到官网中去找一下这个定义，[node:module API](https://nodejs.org/api/module.html#modules-nodemodule-api)的使用说明：

> 可以使用`node：前缀`来标识核心模块，在这种情况下，它会绕过所需的缓存。例如，`require('node:fs')`将始终返回内置的fs模块，即使存在该名称所需的`.cache`条目也是如此。

# 比较

从上面大概清楚两种用法的实际意义，那么两者分别使用场景呢？或者说`Node:ModuleName`有什么意义呢？

- 直接使用`require('fs')`，需要等node.js将所有核心模块加载完成后才可以使用，这个可以通过[` module.builtinModules`](https://nodejs.org/api/module.html#modulebuiltinmodules)去判断是否加载完成
- 使用`require('node:fs')`，则不需要等待，可以直接调用内置模块，但是却无法使用缓存

因此，如果是对启动速度有要求的功能，建议直接`require('node:fs')`模式，其他正常调用即可。