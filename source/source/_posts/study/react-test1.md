---
title: React与Jest的单元测试(1)
date: 2019-09-25 22:00:00
tags:
    - 学习总结
---

# 什么是单元测试
如果你听说过“测试驱动开发”（TDD：Test-Driven Development），单元测试就不陌生。

单元测试是用来对一个模块、一个函数或者一个类来进行正确性检验的测试工作。

<!--more-->
## 测试覆盖率
在github的开源项目经常会有单元测试覆盖率，长得比如`vuejs`框架，如下图所示：
![image.png](http://ww1.sinaimg.cn/large/68c990d9gy1g7c48fwqh5j21aa0ec408.jpg)

- 上图中的 build passing 表示 travis build 通过了，用绿色背景显示，表明很安全。
- npm v2.6.10 表示最新版本是 v2.6.10，用蓝色背景显示，表明是稳定的版本。
- downloads 4.7m/month 表示最近一个月 npm 里的下载数量为 4.7万 次。
- coverage 97% 表示测试覆盖率达到了 100%，用蓝绿色背景显示，表明虽通过测试但是还存在未测试到地方。

测试覆盖率就是运行的测试覆盖了多少代码里的逻辑，下一篇我们讲到如何建立github的测试覆盖率。
<!-- https://juejin.im/entry/58c51defa22b9d0058ac1980 -->

明白上面的概念后我们就开始进入学习。
# 学习
## Jest、Enzyme 介绍
Jest 是 Facebook 发布的一个开源的、基于 `Jasmine` 框架的 JavaScript 单元测试工具。提供了包括内置的测试环境 DOM API 支持、断言库、Mock 库等，还包含了 Spapshot Testing、 Instant Feedback 等特性。

Airbnb开源的 React 测试类库 Enzyme 提供了一套简洁强大的 API，并通过 jQuery 风格的方式进行DOM 处理，开发体验十分友好。不仅在开源社区有超高人气，同时也获得了React 官方的推荐。

## 创建项目
通过`create-react-app`去创建项目，步骤如下：

1. `create-react-app test-app`后，等待几分钟安装依赖完成
2. 项目自带`jest`测试框架，但是还需要安装其他测试框架
3. 安装`yarn add enzyme enzyme-adapter-react-16 react-test-renderer`

## 示例项目
在项目中我们将实现一个待办事项，并进行TTD开发。

需求描述：在页面中有个输入框，并允许进行点击新增待办事项和删除事项。

[项目源码可以点击这里进行克隆]()



## jest常用API

- describe(name, fn)：描述块，讲一组功能相关的测试用例组合在一起
- it(name, fn, timeout)：别名test，用来放测试用例
- afterAll(fn, timeout)：所有测试用例跑完以后执行的方法
- beforeAll(fn, timeout)：所有测试用例执行之前执行的方法
- afterEach(fn)：在每个测试用例执行完后执行的方法
- beforeEach(fn)：在每个测试用例执行之前需要执行的方法
