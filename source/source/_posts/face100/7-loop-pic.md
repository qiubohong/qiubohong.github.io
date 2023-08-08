---
title: 前端面试100道手写题（7）—— 循环轮播图
date: 2023-07-31 22:00:00
tags:
    - 学习总结
    - 前端面试
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

# 前言

循环轮播图，基本上大家用的都是现有组件，如果要让你自己设计实现一个，其实最主要的两个点：循环算法和滚动动画

手写难度：⭐️⭐️

涉及知识点：

- 循环播放的思路
- CSS 动画，transtion和 transform
- Web Component 自定义组件

<!-- more -->

# 轮播图

大家最常用的轮播图基本上就是 [swiper.js](https://github.com/nolimits4web/swiper)，不仅适配 PC 端和移动端，同时包含多种实际应用场景。但是目前我们只需要实现其中一种场景即可——循环轮播图，大概示例图如下：

```html
<swiper-container slides-per-view="3" speed="500" loop="true">
  <swiper-slide>Slide 1</swiper-slide>
  <swiper-slide>Slide 2</swiper-slide>
  <swiper-slide>Slide 3</swiper-slide>
  ...
</swiper-container>
```
<script src="/code/swiper/swiper.js"></script>
<swiper-container slides-per-view="3" speed="500" loop="true">
    <swiper-slide>Slide 1</swiper-slide>
    <swiper-slide>Slide 2</swiper-slide>
    <swiper-slide>Slide 3</swiper-slide>
    <swiper-slide>Slide 4</swiper-slide>
    <swiper-slide>Slide 5</swiper-slide>
    <swiper-slide>Slide 6</swiper-slide>
</swiper-container>


大概效果如下：
![](/assets/img/7-loop-pic-0.gif)

## 实现思路
在研究实现思路前，我们先确定一下要实现的目标，如下：

1. 采用`Web Component`去实现两个自定义标签`<swiper-container>` `<swiper-slide>`
2. `<swiper-container>`标签支持属性配置，如：`speed` `loop`

实现思路如下：

- `<swiper-container>`容器为 flex 容器，里面包含一个`wrapper`容器用于装载所有的`<swiper-slide>`
- `<swiper-slide>` 采用横向布局，当切换下一个的时候，使用`transform:translate(x,y)`将`wrapper`向左移动进行展示下一个`slide`
- 当`loop`为 true的时候，支持循环播放
  - 循环播放逻辑为，在最后一个`<swiper-slide>`后面复制第一个`<swiper-slide>`
  - 当最后一个继续点击next的时候，会把复制第一个展示
  - 当第一个（复制）展示后，点击下一步的时候，取消动画效果，将`wrapper`位置移动到第一个
  - 然后利用`setTimeout(0)`延时执行，增加动画动画效果，将`wrapper`位置移动到第二个

为了更好理解循环动画思路，为了更好的展示效果，我将`container`取消了`overflow:hidden`，具体动画如下：

![](/assets/img/7-loop-pic.gif)

整个轮播图的 DOM 结构如下：
{% diagramsnet "/assets/drawio/loop-pic.drawio" %}

## 代码实践

我们将通过`Web Component`规范去定义上述两个组件，分别是`<swiper-container>`和`<swiper-slide>`

### Swiper-Container组件

Swiper-Container 负责实现容器和控制轮播图滚动事件，具体代码如下：



# 参考资料

- [Web Component 自定义组件](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components)