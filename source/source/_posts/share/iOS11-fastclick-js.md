---
title: iOS11.3 fastclick.js相关bug
date: 2018-08-04 21:21:01
tags:
    - 技术分享
---

最近遇到奇异的bug,在ios 11.3移动端页面 input输入框第一次触摸可以弹起键盘，后续再触摸需要很难弹起键盘，或者需要在输入框停一会才能弹起键盘。
##  bug复现条件：
一、ios 11.3中app的webview为 UI WebView
二、在项目中使用了FastClick.js，页面包括输入框.

## 发现源头问题：
在碰到问题脑子第一想法这不就是click延迟300ms的现象吗？所以就想到是不是FastClick.js导致，注释掉后发现bug现象消失了，代码如下：

```javascript
define(['zepto'], function ($) {
 'use strict';
 // FastClick.attach(document.body);
 ...
});
```

但是这是为什么呢？我们一起看看为什么要加上FastClick，这个库解决了什么问题？

<!-- more -->

* click 300ms延迟：浏览器click会比touch延迟300ms触发
* click穿透现象：当两个div同处一个position，上层div绑定touch，下层div绑定click,当上层div触发touch消失后，可能会触发下层div的click事件
既然Fastclick是为了解决这两类问题，其实现原理如下图所示：
![fastclick原理](https://upload-images.jianshu.io/upload_images/11733108-a045cb92752f7ae8.jpeg?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

fastclick利用捕获顶层dom元素(如：body，html等)的click事件，拦截所有的click请求进行判断：是否有touch触发、是否需要阻碍click事件(stopImmediatePropagation)等。

## 分析问题解决方案：
步骤一：input无法聚焦弹出键盘，fastclick中有一块判断当前元素targetElement是否需要needsFocus，看看其方法的实现：
```javascript
FastClick.prototype.needsFocus = function(target) { //判断当前元素是否需要focus
        switch (target.nodeName.toLowerCase()) {
            case 'textarea':
                return true;
            case 'select':
                return !deviceIsAndroid;
            case 'input':
                switch (target.type) {
                    case 'button':
                    case 'checkbox':
                    case 'file':
                    case 'image':
                    case 'radio':
                    case 'submit':
                        return false;
                }
                // No point in attempting to focus disabled inputs
                return !target.disabled && !target.readOnly;
            default:
                return (/\bneedsfocus\b/).test(target.className);
        }
};
```
步骤二：看到needsFocus下执行了什么？在touchEnd方法中，代码块如下：
```javascript
if (this.needsFocus(targetElement)) {if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
 this.targetElement = null;
 return false;
 }
 this.focus(targetElement); //调用focus进行聚焦
 this.sendClick(targetElement, event);
  
 if (!deviceIsIOS || targetTagName !== 'select') {
 this.targetElement = null;
 event.preventDefault();
 }
 return false;
 }
```
步骤三：focus方法分析（包含解决方案），如下：
```javascript
FastClick.prototype.focus = function(targetElement) {
        var length;
        //兼容处理:在iOS7中，有一些元素（如date、datetime、month等）在setSelectionRange会出现TypeError
        //这是因为这些元素并没有selectionStart和selectionEnd的整型数字属性，所以一旦引用就会报错，因此排除这些属性才使用setSelectionRange方法
        if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
            length = targetElement.value.length;
            targetElement.setSelectionRange(length, length);
            /*修复bug ios 11.3不弹出键盘，这里加上聚焦代码，让其强制聚焦弹出键盘*/
            targetElement.focus();
        } else {
            targetElement.focus();
        }
    };
```
## 原理分析
OK，上真机iphoneX验证bug已经消失了，但是我们并不知道为什么在ios 11.3会出现该问题，秉着探索真理的一颗心（ZZZZ），到github去查看FastClick的issues列表，果然发现早有人提出bug了，如下图：
![fastclick issues](https://upload-images.jianshu.io/upload_images/11733108-dc00511b626e3496.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

下方有评论如下：
A：说framework7框架那边已经有解决方案啦，[点击这里](https://github.com/framework7io/framework7/issues/2314#issuecomment-377778034)。
![frameword7问题解决](https://upload-images.jianshu.io/upload_images/11733108-2e17af0f0c9a7474.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

另外一位仁兄的解决方案和我类似，修改focus方法。
![focus解决方案](https://upload-images.jianshu.io/upload_images/11733108-829a9db17ea2e4b0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

因此跳到framework的issue中的解决方案，解决方案：[点击这里](https://stackoverflow.com/questions/49500339/cant-prevent-touchmove-from-scrolling-window-on-ios)，描述如下：
![解决方案描述](https://upload-images.jianshu.io/upload_images/11733108-443f9d4c26e32cd4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

跳过去stackoverflow后，其实根本源头已经查到了，ios 11.3更新 Safari 11.1，支持新web API :允许对事件支持 `{passive: false}`被动模式，减少滚动屏幕的性能损耗和奔溃。

## passive mode解析
那么新的问题来了，{passive: false}是什么玩意？来，我们先看看它的使用方式：
```javascript
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
}, { passive: false });
```
按照以往我们对添加事件监听的方法三个参数的认知，如下：
```javascript
document.addEventListener(type , callback, capture); //type是事件类型，callback是执行函数， capture是否进行捕获/冒泡，默认为false
```

Passive event listeners是2016年Google I/O 上同 PWA 概念一起被提出，但是同PWA不同，Passive event listeners 的作用很简单，如果用简单一句话来解释就是：提升页面滑动的流畅度。
```javascript
target.addEventListener(type, listener[, options]);
 
/**
options 可选
一个指定有关 listener 属性的可选参数对象。
可用的选项如下：
capture:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
once:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
passive: Boolean，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。
*/
 
//示例代码
target.addEventListener('touchstart', function(e){
   e.preventDefault() // 无效，报错
}, {passive: true});
```
为什么增加支持这个属性会导致添加fastclick后input输入框很难弹出键盘？

在ios更新日志了，写到了“Updated root document touch event listeners to use passive mode improving scrolling performance and reducing crashes.”

翻译过来就是：针对document的touch事件监听添加passive配置，即是：{passive: true}，会永远不调用event.preventDefault()，以此来提高滚动性能。

源头推测：

fastclick是采用拦截click和监听touch事件去实现的，里面包括对tagetElement的focus方法重写，因此在11.3之前可能event.preventDefault生效了，同时用setSelectionRange是可以聚焦input的。

 

另外一个bug也是由这个导致的是：

在iOS11.3的UI webview使用fastclick.js，页面有个按钮点击事件，当app或锁屏超过几分钟时间，回到页面会导致click事件失效。

解决方案为：
```javascript
var passiveListener = (function checkPassiveListener() {
            //判断浏览器是否支持 {passive: true}
            var supportsPassive = false;
            try {
                var opts = Object.defineProperty({}, 'passive', {
                    get: function() {
                        supportsPassive = true;
                    }
                });
                window.addEventListener('testPassiveListener', null, opts);
            } catch (e) {
                supportsPassive = false;
            }
            return supportsPassive;
}());
var activeListener = passiveListener ? {passive:false} : false;
layer.addEventListener('click', this.onClick, true);
layer.addEventListener('touchstart', this.onTouchStart, passiveListener);
layer.addEventListener('touchmove', this.onTouchMove, passiveListener);
layer.addEventListener('touchend', this.onTouchEnd, passiveListener);
layer.addEventListener('touchcancel', this.onTouchCancel, passiveListener);
```

## 参考资料
* [《EventTarget.addEventListener()增加passive属性说明——web MDN API网站》](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
* [《fastclick github issues#548》](https://github.com/ftlabs/fastclick/issues/548)
* [《stackoverflow ——touchmove e.preventDefault失效问题》](https://stackoverflow.com/questions/49500339/cant-prevent-touchmove-from-scrolling-window-on-ios)
* [《Safari 11.1更新日志》](https://developer.apple.com/library/content/releasenotes/General/WhatsNewInSafari/Articles/Safari_11_1.html)

