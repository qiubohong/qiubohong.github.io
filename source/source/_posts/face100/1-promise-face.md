---
title: 前端面试100道手写题（1）—— 手写Promise实现
date: 2023-04-16 15:00:00
tags:
    - 学习总结
    - 前端面试
---

# 原因
今年的金三银四面试，遇到了很多新的面试八股文，其实心里对手写题或者算法题有一定抵触，因为实际工作中基本上就不会用到这些东西，但是正因为这些基础八股文，才能真正验证一个人对技术有多热爱的程度。
也有可能近几年没有对这些基础知识进行巩固，所以干脆一狠心，先立个flag, 准备完成100道手写题。

# Promise

<!-- more -->

## 定义

> Promise 对象用于表示一个异步操作的最终完成（或失败）及其结果值。  [MDN Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise)

下面有一张图用来显示Promise的基本流程图（源自MDN）：

![](/assets/img/promises.png)

如何快速理解Promise呢？就是必须给出一个最终结果的状态处理机制函数。

可以想象Promise是一个排队买奶茶的操作，当你进入排队中处于pending，轮到你的时候成功买到奶茶则是fulfilled，如果中途你走开了或者轮到你的时候没买奶茶，则是买奶茶失败rejected，最后则是无论如何你都离开奶茶店，这就是finally。

因此Promise的有三种状态：
- 待定（pending）:  初始状态
- 已兑现（fulfilled）: 操作成功完成
- 已拒绝（rejected）：操作失败

同时Promise在成功执行后完成执行注册在自身的Promise.prototype.then函数，如果失败后会调用Promise.prototype.catch。

**重要知识点：Promise其实是通过微任务队列(Microtasks)[queueMicrotask()](https://developer.mozilla.org/zh-CN/docs/Web/API/queueMicrotask)的去实现的，所以会比setTimeout等定时器任务要优先，这一点在网上很多手写Promise都忘记去实现了。**

## 方法

1. 内置函数，需要实例化对象后才能调用

- 构建函数 `Promise(resolve, reject)` 创建一个Promise对象
- `Promise.prototype.then()` 为 promise 添加被兑现状态的回调函数，其以回调函数的返回值兑现 promise。若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。  
- `Promise.prototype.catch()` 为 promise 添加一个被拒绝状态的回调函数，并返回一个新的 promise，若回调函数被调用，则兑现其返回值，否则兑现原来的 promise 兑现的值。  
- `Promise.prototype.finally()` 为 promise 添加一个回调函数，并返回一个新的 promise，这个promise的值将为原来promise的值。而传入的回调函数将在原 promise 被敲定（无论被兑现还是被拒绝）时被调用，同时需要等待then或catch执行完后才会被执行。

2. 静态函数，可以直接调用的

- `Promise.all(iterable)` 返回一个新的 `Promise` 对象，等到传入所有的 `Promise` 对象都成功，则表示成功，返回值的顺序与传入顺序一致，如果有任意一个 `Promise`则表示失败
- `Promise.allSettled(iterable)` 等到所有 `Promise` 都已敲定（每个 `Promise` 都已兑现或已拒绝），与all不同在于传入每个`Promise`都会被执行一次
- `Promise.any(iterable)` 当其中的任意一个 `Promise` 成功，就返回那个成功的 `Promise` 的值，与all相反
- `Promise.race(iterable)` 无论传入的 `Promise` 是执行成功或失败，都直接返回其结果
- `Promise.resolve(value)` 返回一个状态有value决定的Promise，如果value(带有then(resolve, reject)的对象)，则会执行then方法去判断状态，如果没有则将value直接返回成功调用的值
- `Promise.reject(reason)` 返回一个状态为已拒绝的 Promise 对象，其错误信息为reason

以上就是Promise的全部基础知识点，接下来我们就来实现，同时业界内也有一个[Promise/A+规范](https://promisesaplus.com/)，大家也可以按照其规范去实现自己的Promise。

# 手写代码

在手写代码之前，我们需要明白`Promise`实现的基本原理：

- 发布订阅模式，解决`Promise`的state发生变化后需要触发的事件，如：then 或 catch
- 链式调用，`Promise`所有的方法调后都会返回一个新的`Promise`对象

其中关键代码在`then`函数的实现，主要是返回一个新的`Promise`对象，代码如下：
```js
/**
 * Promise的三种状态
 */
const StatusType = {
    PENDING: 'pending',
    FULFILLED: 'fulfilled',
    REJECTED: 'rejected'
}
/**
 * 手写Promise
 * @author: Qborfy
 */
class MyPromise {

    /**
     * 
     * @param {*} executor 为一个函数，该函数接受两个参数，分别是resolve和reject
     */
    constructor(executor) {
        // 初始化状态为pending
        this.status = StatusType.PENDING;
        // 初始化成功的值
        this.value = undefined;
        // 初始化失败的原因
        this.reason = undefined;
        // 成功的回调函数
        this.onFulfilledCallbacks = [];
        // 失败的回调函数
        this.onRejectedCallbacks = [];

        // 成功的回调函数
        const resolve = (value) => {
            // 状态只能从pending到fulfilled或者rejected
            if (this.status === StatusType.PENDING) {
                this.status = StatusType.FULFILLED;
                this.value = value;
                // 依次执行成功的回调函数 使用queueMicrotask()去执行
                this.onFulfilledCallbacks.forEach(fn => {
                    queueMicrotask(fn(this.value));
                });
            }
        }

        // 失败的回调函数
        const reject = (reason) => {
            // 状态只能从pending到fulfilled或者rejected
            if (this.status === StatusType.PENDING) {
                this.status = StatusType.REJECTED;
                this.reason = reason;
                // 依次执行失败的回调函数 使用queueMicrotask()去执行
                this.onRejectedCallbacks.forEach(fn => {
                    queueMicrotask(fn(this.reason));
                });
            }
        }

        try {
            // 立即执行executor函数
            executor(resolve, reject);
        } catch (e) {
            // 如果执行executor函数出错，直接执行reject
            reject(e);
        }
    }

    /**
     * 将then方法返回的promise的resolve和reject传入
     * @param {*} onFulfilled 
     * @param {*} onRejected 
     */
    then(onFulfilled, onRejected) {
        // onFulfilled和onRejected都是可选参数
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };
        // 判断结果是否为promise，如果是promise，直接返回该promise，如果不是则返回一个新的promise
        function resolvePromise(result, resolve, reject) {
            if (result instanceof MyPromise) {
                result.then(resolve, reject);
            } else {
                resolve(result);
            }
        }
        const newPromise = new MyPromise((resolve, reject) => {
            // 如果状态完成，直接执行onFulfilled
            if (this.status === StatusType.FULFILLED) {
                const result = onFulfilled(this.value);
                resolvePromise(result, resolve, reject);
            }
            // 如果状态失败，直接执行onRejected
            if (this.status === StatusType.REJECTED) {
                const result = onRejected(this.reason);
                resolvePromise(result, resolve, reject);
            }

            // 如果状态为pending，将onFulfilled和onRejected存入对应的回调函数数组中
            if (this.status === StatusType.PENDING) {
                // 同时将resolve和reject传入对应函数中
                this.onFulfilledCallbacks.push((value) => {
                    const result = onFulfilled(value)
                    resolvePromise(result, resolve, reject)
                });
                this.onRejectedCallbacks.push(() => {
                    const result = onRejected(reason)
                    resolvePromise(result, resolve, reject)
                })
            }
        })

        return newPromise;
    }


    /**
     * 执行catch方法，返回一个新的promise
     * @param {*} onRejected 
     */
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    /**
     * 不管是成功还是失败，最终会执行finally方法，返回一个原来promise的结果
     * @param {*} onFinally 
     * @returns 
     */
    finally(onFinally) {
        // 这里要将原来的value或reason返回
        return this.then((value)=>{
            onFinally()
            return value;
        }, (reason)=>{
            onFinally()
            return reason;
        })
    }

    static resolve() {
        ...
    }

    static reject() {
        ...
    }

    static all() {
        ...
    }

    static allSettled() {
        ...
    }

    static any() {
        ...
    }

    static race() {
        ...
    }
}

; (function () {
    const p = new MyPromise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 1000)
    }).then((res) => {
        console.log('then:', res)
        return 2;
    }).finally(() => {
        console.log('finally')
    }).then(res => {
        console.log('then2:', res)
    }).then(res => {
        console.log('then3:', res)
    })
    console.log(p)
    // const p2 = new MyPromise((resolve, reject) => {
    //     JSON.parse('{a}')
    // }).catch((res) => {
    //     console.log('catch:', res)
    // }).finally(() => {
    //     console.log('finally2')
    // })
})()
```

这里就不粘贴完整源码了，完整源码请到github中查看，想看更多八股文手写题可以给个star收藏一下，Github会给你推送更新信息，地址如下：

[https://github.com/qiubohong/hundred-interview-questions/blob/main/1-promise/mypromise.js](https://github.com/qiubohong/hundred-interview-questions/blob/main/1-promise/mypromise.js)

# Promise在开发中遇到的问题

- 并发Promise，用Promise.all，那么如何实现限制并发数呢?
- await去等待Promise的结果，如果是reject结果，如何catch，或者用其他方式避免await的错误？
- Promise的调用时机，即是一个非异步的Promise函数什么时候会被执行，为什么会比setTimeout等定时器优先更高？


# 额外知识点

## 微任务（Microtasks）和任务（tasks）的区别

JavaScript中的`任务`指的是将代码按照下面的标准机制去形成一个个任务，加入到**任务队列**中，去等待被**事件循环**驱动调度。

- 一段代码被直接执行时
- 触发了一个事件，将其回调函数添加到任务队列时
- 执行到一个由 setTimeout() 或 setInterval() 创建的 timeout 或 interval，以致相应的回调函数被添加到任务队列时

而`微任务`则是通过[queueMicrotask()](https://developer.mozilla.org/zh-CN/docs/Web/API/queueMicrotask)加入微任务队列中，在事件循环之前的安全时间执行的（当前事件循环无任何需要执行任务），同时事件循环会持续调用微任务直至队列中没有留存的，即使是在有更多微任务持续被加入的情况下。

