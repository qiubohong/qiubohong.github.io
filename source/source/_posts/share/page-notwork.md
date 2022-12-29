---
title: 浏览器页面卡住定位分析
date: 2022-12-26 21:21:01
tags:
    - 技术分享
---

# 背景
有童鞋在xxx系统页面反馈，遇到在弹出框后整个页面卡住无法使用的情况，属于必现问题。因此需要跟踪定位问题。

# 问题定位
一般在浏览器遇到这种问题，基本上都某段逻辑进入死循环导致浏览器内核处理不过来导致的页面卡住动，这个时候需要使用Chrome开发调试工具进行跟踪定位的。

<!--more-->

## chrome source调试工具
按照`F12`或者`Command + Alt + J`可以打开浏览器的调试工具，然后找到`Source` 或 `源代码`Tab页。如下图所示：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/106719ede96442b7a262bba5a68c9775~tplv-k3u1fbpfcp-watermark.image?)

### 步骤一：点击`=`按钮，进入调试模式：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb7c6dc349554dd284aca3684d281323~tplv-k3u1fbpfcp-watermark.image?)

### 步骤二：调试代码，查看卡住代码段：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b758994a5bb04938bc035b397465ab8b~tplv-k3u1fbpfcp-watermark.image?)

### 步骤三： 定位代码段
确定是哪段代码后，就可以开始分析代码段是属于哪里，最终找到classname，定位到是属于水印插件导致。

# 问题分析(水印插件)
## 为什么？
为什么水印插件会导致页面进行死循环呢？这个就要跟踪到水印插件，目前采用的`@pansy/watermark`开源插件，然后找到其github issues，看看有没有相关issues。果不其然，还真的找到了，如下：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95eab9a9613d4e409ad09f906acf9d33~tplv-k3u1fbpfcp-watermark.image?)

[全局水印与其它遮罩层冲突](https://github.com/pansyjs/watermark/issues/129)
那么接下来就开始跟踪他们的代码进行具体分析。

# 水印插件实现原理
在上面调试问题的时候，我们有看到一段代码`MoutationRecord`，其实这已经算是水印插件的重要实现原理之一了。

看了插件源代码，其实就几千行代码，水印插件实现原理有几个点：
1. 利用`Shadow DOM`或者`div`DOM节点去插入水印，利用z-index显示到最前方
2. 同时设置`pointer-events: none;`禁止任何操作，包括：选择、点击等，实现不阻碍其他元素操作
3. 利用canvas生成水印图片(base64)
4. 设置水印节点背景图片为水印图片(base64)
5. 使用MutationObserver监听dom元素变化重复渲染生成水印图片，防止水印被人为删除
其中涉及到几个关键技术点为:
- `pointer-events: none`
- 通过canvas生成图片
- MutationObserver监听
当然，还有`Shadow DOM`和canvas等技术点也可以自己去研究学习，后面再用一些篇章详细讲解。

## pointer-events
从MDN中它是这么定义的：
>** `pointer-events` ** CSS 属性指定在什么情况下 (如果有) 某个特定的图形元素可以成为鼠标事件的 [target (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)。

简单解释一下，就是可以通过该属性设置DOM元素的鼠标事件，很多对应值都是给svg响应鼠标事件范围所设置的。

这里重点解释一下`auto`、`none`两种值：
> `auto`:与 `pointer-events` 属性未指定时的表现效果相同，对于 SVG 内容，该值与 `visiblePainted` 效果相同
> 
> `none`:元素永远不会成为鼠标事件的[target (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/Event/target)。但是，当其后代元素的 `pointer-events` 属性指定其他值时，鼠标事件可以指向后代元素，在这种情况下，鼠标事件将在捕获或冒泡阶段触发父元素的事件侦听器。

简单说，`auto`是默认值，可以触发该元素本身就有的鼠标事件。
`none`则代表取消该元素原有的鼠标事件，可以直接透过该元素直接触发下方元素鼠标事件。
举个例子：
```htlm
<style>
a[href="http://example.com"] {
  pointer-events: none;
}
</style>
<ul>
<li><a href="https://developer.mozilla.org/">MDN</a></li>
<li>
<!-- 点击链接 http://example.com 时，不会跳转 -->
<a href="http://example.com">example.com</a></li>
</ul>
```

## MutationObserver监听

### 定义
MDN定义：
> [`MutationObserver`](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver) 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分。

简单说，就是可以监听某个DOM节点下元素发生变化触发的事件。
支持方法：
- `disconnect()`，注销监听方法
- `observe()`,开始监听
- `takeRecords()`, 取消通知队列

具体使用案例(来自MDN)：
```
// 选择需要观察变动的节点
const targetNode = document.getElementById('some-id');

// 观察器的配置（需要观察什么变动）
const config = { attributes: true, childList: true, subtree: true };

// 当观察到变动时执行的回调函数
const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for(let mutation of mutationsList) {
        if (mutation.type === 'childList') {
            console.log('A child node has been added or removed.');
        }
        else if (mutation.type === 'attributes') {
            console.log('The ' + mutation.attributeName + ' attribute was modified.');
        }
    }
};

// 创建一个观察器实例并传入回调函数
const observer = new MutationObserver(callback);

// 以上述配置开始观察目标节点
observer.observe(targetNode, config);

// 之后，可停止观察
observer.disconnect();
```

### 常用场景
- 防止第三方注入js文件（运营商劫持）
- 防止删除前端生成的水印
- 用来处理页面的敏感数据
- Vue.$nextTick的实现微任务原理

所以从问题定位中，分析水印陷入死循环很可能就是这一部分代码。

## 定位问题
回到最开始，我们是什么时候会遇到页面卡顿，当页面出现弹框的时候，会出现页面卡顿。

同时找到插件的issues(查看issue也是一种快速解决问题的途径)，描述如下:

>vue版本使用全局水印 `:is-body="true"`  并且开启保护模式的情况下,触发带遮罩的事件就会导致页面无响应,且无法恢复;
带遮罩的事件如对话框弹窗/图片点击放大;
测试后发现关闭保护模式 `watermark.options.monitor = false` ,或者不使用全局水印没有出现该问题;
[这里可以看全文](https://github.com/pansyjs/watermark/issues/129)

### 定位到源码

`watermark/packages/core/src/index.ts`，第244行，代码如下：
```javascript

...

if (MutationObserver &amp;&amp; this.options.monitor) {
      this.mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
          if (this._isAgainRender(mutation)) {
            this.destroy();
            this._render();
            return;
          }
        });
      });
      this.mutationObserver.observe(this.container, observeOptions);
      this.shadowRoot && this.mutationObserver.observe(this.shadowRoot, observeOptions);
    }
```

结合上面`MutationObserver`的作用，主要是监听某个DOM容器内节点变化，然后重新渲染水印，从而避免水印被人删除。

那么我们可以很简单的猜测一下，在弹框出来后，会触发`MutationObserver`，然后`_render函数`改变dom，又会触发自己本身的dom节点变化，再触发`MutationObserver`，导致陷入死循环。

目前执行顺序：
1. body容器被监听到DOM节点变化，触发`MutationObserver`事件
2. `MutationObserver`事件返回参数`mutations`是一个数组，可能会重复执行`_render`函数
3. 多次`_render`函数会继续注册`MutationObserver`事件，导致后续body容器变更持续被监听到，进入死循环逻辑中

因此，只需要保证多次`MutationObserver`事件只触发一次`_render`函数，即可避免死循环逻辑。

### 问题解决

直接下载源码，放到本地调试（过程忽略），最终代码暂时如下：
```javascript
... 
if (MutationObserver &amp;&amp; this.options.monitor) {
      this.mutationObserver = new MutationObserver(mutations => {
	  this.mutationObserver = new MutationObserver(mutations => {
        // 避免多次执行render函数，导致多次注册MutationObserver 从而进入死循环逻辑
        let lastMoutation;
        mutations.forEach(mutation => {
          if (this._isAgainRender(mutation)) {
            lastMoutation = mutation;
            return;
          }
        });
        if(lastMoutation){
          this.destroy();
          this._render();
        }
      });
      this.mutationObserver.observe(this.container, observeOptions);
      this.shadowRoot &amp;&amp; this.mutationObserver.observe(this.shadowRoot, observeOptions);
    }
...
```
后面可以研究一下`为什么forEach || map函数无法跳出循环？`

最后可以提交PR到开源github，这里面也有一些东西可以了解一下，[如何在github上为开源项目提交PR？](https://stephenzhou.net/2019/04/23/git-pr-tsg/)。

这里是我提交的PR,[全局水印与其它遮罩层冲突 [issue 129]](https://github.com/pansyjs/watermark/pull/136)

#参考资料
[MutationObserver MDN资料](https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserver)