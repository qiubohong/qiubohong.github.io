var _ = require('lodash');
function debounce_easy(func, waitTime) {
    // 用于存储定时器
    let result;
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        // 如果定时器存在，就清除定时器
        clearTimeout(timeout);
        // 重新设置定时器
        timeout = setTimeout(function () {
            // 执行函数，将当前作用域绑定的this和参数传递过去
            result = func.apply(context, args);
        }, waitTime);
    }
}

function debounce_leading(func, waitTime, leading = false) {
    // 用于存储定时器
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        // 如果leading为true，就立即执行函数
        if (leading) {
            // 如果定时器不存在，就执行函数，从而避免重复执行
            if (!timeout) {
                func.apply(context, args);
            }
        }
        // 如果定时器存在，就清除定时器
        clearTimeout(timeout);
        // 重新设置定时器
        timeout = setTimeout(function () {
            // 执行函数，将当前作用域绑定的this和参数传递过去
            func.apply(context, args);
        }, waitTime);
    }
}

/**
 * 完整的防抖函数
 * @param {*} func  需要防抖的函数
 * @param {*} waitTime  防抖时间
 * @param {*} maxWait  最大等待时间
 * @param {*} leading  是否在执行前调用 
 * @param {*} trailing  是否在最大等待时间过期后直接调用
*/
function debounce(func, waitTime, options) {
    // 用于存储定时器
    let timeout;
    let lastThis; // 用于存储函数作用域
    let lastArgs; // 用于存储函数参数
    let result; // 函数执行结果
    let lastInvokeTime; // 上一次执行的时间
    let lastCallTime; // 上一次调用的时间

    const {
        leading = false,
        trailing = true,
        maxWait = 0
    } = options;
    const hasMax = 'maxWait' in options;
    maxWait = hasMax ? Math.maxWait(maxWait, waitTime) : maxWait

    const invokeFunc = function () {
        const args = lastArgs
        const thisArg = lastThis
        // 执行函数，将当前作用域绑定的this和参数传递过去
        lastArgs = lastThis = undefined
        result = func.apply(thisArg, args);
        lastInvokeTime = Date.now();
        return result;
    }

    // 计算剩余的等待时间
    const remainingWait = function () {
        
    }

    // 用于启动定时器
    const startTimer = function (pendingFunc, wait) {
        setTimeout(pendingFunc, wait)
    }

    // 用于清除定时器
    const cancelTimer = function (id) {
        clearTimeout(id)
    }

    // 用于执行函数
    const timerExpired = function () {
        const time = Date.now()
        if (time - lastTime < waitTime) {
            startTimer(timerExpired, waitTime - (time - lastTime))
        } else {
            invokeFunc()
        }
    }

    const debounced = function () {
        lastThis = this;
        lastArgs = arguments;
        lastCallTime = Date.now();
        // 如果leading为true，就立即执行函数
        if (leading) {
            // 如果定时器不存在，就执行函数，从而避免重复执行
            if (!timeout) {
                return invokeFunc();
            }

            if (hasMax) {
                // 如果有最大等待时间，就启动一个定时器，到时间后执行函数
                timeout = startTimer(invokeFunc, waitTime);
                return result;
            }
        }
        if (timerId === undefined) {
            // 重新设置定时器
            timeout = startTimer(invokeFunc, waitTime);
        }
        return result;
    }

    /**
     * 取消防抖
     */
    const cancel = function () {
        cancelTimer(timeout);
        lastArgs = lastThis = timeout = undefined
    }

    /**
     * 立即执行
     */
    const flush = function () {
        if (timeout) {
            invokeFunc();
        }
    }

    /**
     * 是否在等待中
     * @returns 
     */
    const pengding = function () {
        return !!timeout;
    }

    debounced.cancel = cancel
    debounced.flush = flush
    debounced.pending = pending
    return debounced;
}


; (function () {
    // let callCount = 0;

    // const debounced = debounce_easy(function (value) {
    //     console.log('debounce_easy:', value)
    //     ++callCount;
    //     return value;
    // }, 32);
    // let lodashcallCount = 0;
    // const lodashDebouce = _.debounce(function (value) {
    //     console.log('lodashDebouce:', value)
    //     ++lodashcallCount;
    //     return value;
    // }, 32)
    // // 这里等同于快速触发4次，只有最后一次生效 输出 debounce_easy: d
    // const results = [debounced('a'), debounced('b'), debounced('c'), debounced('d')];
    // let lodashResults = [lodashDebouce('a'), lodashDebouce('b'), lodashDebouce('c'), lodashDebouce('d')];


    // // callCount: 0
    // console.log('callCount:', callCount)
    // console.log('lodashcallCount:', lodashcallCount)
    // setTimeout(function () {
    //     // callCount: 1
    //     console.log('callCount:', callCount)
    //     console.log('lodashcallCount:', lodashcallCount)
    // }, 160);

    // let callCount2 = lodashcallCount2 = 0;
    // const debounced2 = debounce_leading(function (value) {
    //     console.log('debounce_leading:', value)
    //     ++callCount2;
    //     return value;
    // }, 32, true);
    // const lodashDebouce2 = _.debounce(function (value) {
    //     console.log('lodashDebouce2:', value)
    //     ++lodashcallCount2;
    //     return value;
    // }, 32, { leading: true })
    // // 这里等同于快速触发4次，只有第一次生效和最后一次有效  输出 debounce_leading: a  debounce_leading: d  如果leading为false，就只有最后一次生效
    // const results2 = [debounced2('a'), debounced2('b'), debounced2('c'), debounced2('d')];
    // lodashResults = [lodashDebouce2('a'), lodashDebouce2('b'), lodashDebouce2('c'), lodashDebouce2('d')];
    // console.log('callCount2:', callCount2)
    // console.log('lodashcallCount2:', lodashcallCount2)
    // setTimeout(function () {
    //     // callCount2: 1
    //     console.log('callCount2:', callCount2)
    //     console.log('lodashcallCount2:', lodashcallCount2)
    // }, 160);



    // let lodashcallCount = 0;
    // const lodashDebouce = _.debounce(function (value) {
    //     console.log('lodashDebouce:', value)
    //     lodashcallCount += 1;
    //     return value;
    // }, 1000, {
    //     leading: true,
    //     trailing: true,
    //     maxWait: 1000
    // })

    // lodashDebouce('a')
    // setTimeout(function () {
    //     lodashDebouce('b')
    // }, 500)
    // lodashDebouce('c')
    // setTimeout(function () {
    //     lodashDebouce('d')
    //     console.log('lodashcallCount:', lodashcallCount)
    // }, 1200)


    const lodashThrottle = _.debounce(function (value) {
        console.log('lodashThrottle:', value)
        return value;
    }, 1000, {
        leading: false,
        trailing: false,
    });
    for(let i = 1; i < 10; i++) {
        setTimeout(function () {
            console.log("触发")
            lodashThrottle('b')
        }, 200*i)
    }

})()