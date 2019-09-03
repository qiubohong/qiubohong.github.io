---
title: ios12 array.reverse问题
date: 2018-08-19 21:21:01
tags:
    - 技术分享
---

# 问题描述
iOS12发布之后，在测试中发现一个关于Array.reverse的问题，代码如下：
```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <title>iOS 12 Safari bugs</title>
    <script type="text/javascript">
    window.addEventListener("load", function ()
    {
        let arr = [1, 2, 3, 4, 5];
        alert(arr.join());

        document.querySelector("button").addEventListener("click", function ()
        {
            arr.reverse();
        });
    });
    </script>
</head>
<body>
    <button>Array.reverse()</button>
    <p style="color:red;">test: click button and refresh page, code:</p>
</body>
</html>
```
问题描述：第一次进入刷新alert:`1,2,3,4`，第二次刷新就一直为alert`4,3,2,1`。

# demo演示
[未修复的demo](https://fanmingfei.github.io/array-reverse-ios12/origin.html)
[已修复的demo](https://fanmingfei.github.io/array-reverse-ios12/fixed.html)

<!-- more -->

# 修复方法
原理就是判断是否为iOS12版本，重写`Array.prototype.reverse`方法，代码如下：
```
(function(){
    var ua = navigator.userAgent;
    if (!ua.match(/(iPhone|iPad|iPod)/)) return;
    var matched = ua.match(/OS ([\d_\.]+) like Mac OS X/);
    if (!matched || !matched[1]) return;
    if (matched[1].indexOf('12') !== 0) return;
    //以上判断是否为iOS12版本
    
    //以下为修复代码
    Array.prototype._reverse = Array.prototype.reverse;
    //重写reverse方法
    Array.prototype.reverse = function reverse() {
        //重新设置数组长度 从而避免reverse方法改变数据后被缓存
        if (Array.isArray(this)) this.length = this.length;
        return Array.prototype._reverse.call(this);
    }
    var nonenum = {
        enumerable: false
    };
    //设置Array原型链中的reverse方法不可枚举
    Object.defineProperties(Array.prototype, {
        _reverse: nonenum,
        reverse: nonenum,
    });
})()
```
希望大家不要遇到该类生产问题咯！(否则你都不知道哪里出错了~~)

# 参考资料
-  [stackoverflow——iOS 12 Array.Reverse的Bug](https://stackoverflow.com/questions/52390368/array-state-will-be-cached-in-ios-12-safari-is-bug-or-feature/52392901#52392901)
- [github中阿里同事——如何修复iOS12 Array.reverse的bug方案](https://github.com/fanmingfei/array-reverse-ios12/)
