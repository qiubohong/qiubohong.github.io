---
title: 低代码系列——介绍
date: 2023-01-22 21:51:01
toc: true
tags:
    - 技术分享
    - 低代码
top: 10
---

# 系列文章

- [《低代码系列——js沙箱设计》](/lowcode/sandbox.html)
- [《低代码系列——组件描述DSL》(编写中)](/lowcode/component.html)

# 低代码

## 是什么

低代码，可以理解成开发人员为了快速完成页面开发而搭建一个快速构建页面平台，里面一般包括几个功能点：

- 无需写代码即可完成页面UI布局
- 支持页面进行二次代码开发
- 支持页面或系统级别的导出或部署发布

简单的说，就是快速、稳定的输出开发所需要的页面，减少重复性劳动，提高开发效率。

<!-- more -->

## 实现方式

目前市面的低代码的实现方式主要有几种：

国内开源目前还在维护更新的：

- [百度 amis](https://github.com/baidu/amis)  前端低代码框架，通过 JSON 配置就能生成各种页面。
- [阿里 lowcode engine](https://github.com/alibaba/lowcode-engine) 低代码引擎
- [阿里 formilyjs](https://formilyjs.org/) 表单编辑器
- [华炎魔方](https://github.com/steedos/steedos-platform/) 数据驱动低代码平台
- [OpenDataV ](https://github.com/AnsGoo/openDataV)  纯前端的拖拽式、可视化、低代码数据可视化
- [mall-cook](https://github.com/wangyuan389/mall-cook) 商城低代码平台，可视化搭建H5、小程序多端商城
- [nocobase](https://github.com/nocobase/nocobase) 一个可伸缩性优先的开源无代码/低代码平台，用于构建内部工具

基于后端api的低代码平台

- [strapi](https://github.com/strapi/strapi) 领先的开源无头CMS，它是100%的JavaScript，完全可定制，开发者优先

虽然有些项目不维护了，但是值得借鉴：
- [imove 逻辑编排器](https://github.com/i5ting/imove) 

值得阅读一些文章

- [AI驱动的无代码平台--如何使用chat GPT抽象域语言](https://medium.com/@andreasmuelder/ai-powered-low-code-platform-by-example-how-to-use-chatgpt-to-abstract-from-domain-languages-625c3abf0e49)

以上数据来源：
[github/awesome-lowcode 国内低代码平台从业者交流](https://github.com/taowen/awesome-lowcode)


## 资料收集


### 组件相关

- [如何设计可视化搭建平台的组件商店？](https://juejin.cn/post/6986824393653485605)
- [浅谈低代码平台远程组件加载方案](https://juejin.cn/post/7127440050937151525)
- Web components标准

### 拖拽相关
- [可视化拖拽组件库一些技术要点原理分析](https://juejin.cn/post/6908502083075325959)
- [可视化拖拽组件库一些技术要点原理分析（二）](https://juejin.cn/post/6918881497264947207)
- [可视化拖拽组件库一些技术要点原理分析（三）](https://juejin.cn/post/6929302655118344200)
- [可视化拖拽组件库一些技术要点原理分析（四）](https://juejin.cn/post/7129311619963682830)

# 架构设计

## 架构图

{% diagramsnet "/assets/drawio/lowcode.drawio" %}

## 模块设计
{% pullquote mindmap mindmap-md %}
- 低代码平台
  - 核心模块
    - 编辑器
    - 编译引擎
  - 平台能力
    - 管理能力
      - 系统
      - 页面
    - 版本控制
      - 页面版本控制
      - 页面发布流程
    - 权限登录
      - 登录
      - 权限
{% endpullquote %}

## 编辑器设计

{% pullquote mindmap mindmap-md %}
- 编辑器
  - 组件描述
    - DSL
  - 画布布局
  - 拖拽
  - 组件快速引入
    - 组件引入插件
{% endpullquote %}

## 编译引擎
