

// create a function that returns a promise
function promiseFunction(a) {
    // return a new promise
    return new Promise((resolve, reject) => {
        // if the value of a is 1
        if (a === 1) {
            // resolve the promise
            resolve(a)
            // if the value of a is anything else
        } else {
            // reject the promise
            reject('test')
        }
    })
}
/**
 * 
 * @param {*} excutor 
 */
; (function (global) {
    const PENDING = "pending"; // 等待
    const FULFILLED = "fulfilled"; // 成功
    const REJECTED = "rejected"; // 失败
    /**
     * 手动实现一个promise
     * @param {*} excutor 
     */
    function MyPromise(excutor) {
        this.status = PENDING; // 默认状态为等待
        this.value = undefined; // 成功的值

        this.reason = undefined; // 失败的原因
        this.onFulfilledCallbacks = []; // 存储成功的回调
        this.onRejectdCallbacks = []; // 存储失败的回调


        // 自定义resolve函数
        const resolve = (value) => {
            console.log('resolve', this.status)
            // 当调用resolve函数时，状态变为fulfilled
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.value = value;
                // 执行成功的回调
                this.onFulfilledCallbacks.forEach(fn => fn(value));
            }
        }

        // 自定义reject函数
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 执行失败的回调
                this.onRejectdCallbacks.forEach(fn => fn(reason));
            }
        }
        // 执行函数，传入resolve和reject
        try {
            excutor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    MyPromise.prototype.then = function (onResolved, onRejected) {
        onResolved = typeof onResolved === 'function' ? onResolved : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
        // 判断状态
        console.log('then', this.status)
        // 返回一个新的promise 用于链式调用或者调用下个finnaly
        return new MyPromise((resolve, reject) => {
            // 封装一个操作函数用于执行成功或者失败的回调
            // 为什么要封装一个操作函数呢？
            // 因为我们要判断回调的返回值是不是一个promise
            // 如果是一个promise，那么就要等待这个promise执行完毕后，再执行下一个then
            // 如果不是一个promise，那么就直接执行下一个then
            // 为了实现这个功能，我们就需要在then中返回一个promise
            // 但是我们又不知道回调的返回值是什么，所以我们就需要在回调中执行resolve
            const handle = (callback, value) => {
                try {
                    // 执行回调如果返回一个promise，那么就等待这个promise执行完毕后，再执行下一个then
                    const result = callback(value);
                    if (result instanceof MyPromise) {
                        result.then(resolve, reject);
                    } else {
                        // 否则直接返回成功的值
                        resolve(result);
                    }
                } catch (e) {
                    reject(e);
                }
            }
            // 判断状态
            if (this.status === FULFILLED) {
                handle(onResolved, this.value);
            } else if (this.status === REJECTED) {
                handle(onRejected, this.reason);
            } else if (this.status === PENDING) {
                // 如果状态不是成功或者失败，那么就把回调存储起来
                this.onFulfilledCallbacks.push((value) => {
                    handle(onResolved, value);
                });
                this.onRejectdCallbacks.push(() => {
                    handle(onRejected, value);
                });
            }
        });
    }

    MyPromise.prototype.catch = function (onRejected) {
        return this.then(null, onRejected);
    }

    MyPromise.prototype.finally = function (callback) {
        // 如何实现finally呢？
        // 首先我们需要知道finally的特点
        // 1. finally不管promise是成功还是失败都会执行
        // 2. finally中的回调函数不接受任何参数
        // 3. finally中的回调函数执行完毕后，会返回一个新的promise
        // 4. finally中的回调函数执行完毕后，会把上一个promise的状态和值传递给下一个promise
        // 为了实现这个功能，我们就需要在then中返回一个promise
        // 但是我们又不知道回调的返回值是什么，所以我们就需要在回调中执行resolve
        return this.then((value) => {
            return new MyPromise((resolve) => {
                resolve(callback());
            }).then(() => value);
        }, (reason) => {
            return MyPromise.resolve(callback()).then(() => { throw reason });
        });
    }


    return global.MyPromise = MyPromise;
})(global);

// 测试案例

new MyPromise((res) => {
    setTimeout(() => {
        console.log('开始执行res')
        
    }, 2000)
}).then(v => {
    console.log(v) // 输出2
}).finally(() => {
    console.log('finally') // 输出finally
})

// 总结一下promise的实现原理
// 1. promise是一个类，类中有三个状态，分别是等待，成功，失败
// 2. promise有一个then方法，then方法中有两个参数，分别是成功的回调和失败的回调
// 3. promise有一个catch方法，catch方法中有一个参数，是失败的回调
// 4. promise有一个resolve方法，resolve方法中有一个参数，是成功的值
// 5. promise有一个reject方法，reject方法中有一个参数，是失败的原因
// 6. promise有一个excutor方法，excutor方法中有两个参数，分别是resolve和reject
// 7. promise有一个all方法，all方法中有一个参数，是一个数组，数组中的每一项都是一个promise
// 8. promise有一个race方法，race方法中有一个参数，是一个数组，数组中的每一项都是一个promise
// 9. promise有一个finally方法，finally方法中有一个参数，是一个函数
// 10. promise有一个deferred方法，deferred方法中没有参数