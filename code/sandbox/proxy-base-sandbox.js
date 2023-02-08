const { complieCode2Fn, createFakeWindow } = require('./complieCode.js');

/**
 * Proxy沙箱类
 */
class ProxySandbox {
    constructor(global) {
        const rawGlobal = global;
        const fakeWindow = createFakeWindow(global);
        this.proxyBox = new Proxy(fakeWindow, {
            // 拦截所有属性，防止到 Proxy 对象以外的作用域链查找。
            has(target, key) {
                return true;
            },
            get(target, key, receiver) {
                console.log('get', key, target[key])
                // 加固，防止逃逸
                if (key === Symbol.unscopables) {
                    return undefined;
                }
                // 通过Reflect获取
                let temp = Reflect.get(target, key, receiver);
                if(!target.hasOwnProperty(key)){
                    temp = rawGlobal[key];
                }
                return temp;
            },
            set(target, key, newValue) {
                if (!target.hasOwnProperty(key) && fakeWindow.hasOwnProperty(key)) {
                    const descriptor = Object.getOwnPropertyDescriptor(sandbox, key);
                    const { writable, configurable, enumerable } = descriptor;
                    if (writable) {
                        // 中独有的属性如果可以写，同样需要复制到fakeWindow中
                        Object.defineProperty(target, p, {
                            configurable,
                            enumerable,
                            writable,
                            newValue,
                        });
                    }
                } else {
                    target[key] = newValue;
                }

                return true;
            }
        });
        return this;
    }

    excute(code){
        const fn = complieCode2Fn(code);
        return fn(this.proxyBox);
    }
}

const fakeBox = new ProxySandbox(global);
const code = `a = 1;console.log(a)`

console.log(fakeBox.excute(code));  // 输出a:1
console.log('在沙箱外获取沙箱内设置的全局值a:', a); // a is not defined

// 需要解决原型链逃逸
const code2 = `
({}).constructor.prototype.toString = () => {
    console.log('Escape!')
}`
// console.log(({}).toString()) 


