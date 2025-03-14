---
title: 低代码系列——js沙箱设计
date: 2023-02-01 18:00:01
toc: true
tags:
    - 每日更新
    - 技术分享
    - 低代码
---

# 简介

由于自己参与过低代码平台开发，所以希望能把我自己开发低代码中遇到的问题或者一些设计思路进行总结汇总，这是开始写的第一篇，也是比较基础的一篇，关于低代码平台的介绍会放在介绍篇章，这篇就不做过多介绍。

这里为什么会一开始介绍js沙箱设计呢？

因为低代码平台，会运行用户本身自己编写的业务逻辑代码，这里就需要平台去运行用户写的js代码，但是js代码保存到数据库是一个字符串，那么平台应该怎么运行呢？

答案是js沙箱，那么如何设计一个沙箱呢？按照低代码平台的需要特性，主要以下几方面：

- 隔离，隔离是为了保证当前执行代码不影响整个平台的代码
- 插入，沙箱允许插入平台的内置对象
- 容错，沙箱内代码即使有错误，也不影响整个平台执行

<!-- more -->
# 沙箱
在设计沙箱之前，我们先对沙箱有个了解：

> 在计算机安全中，沙箱（Sandbox）是一种用于隔离正在运行程序的安全机制，通常用于执行未经测试或不受信任的程序或代码，它会为待执行的程序创建一个独立的执行环境，内部程序的执行不会影响到外部程序的运行。

通俗的讲，就是由我们主程序自己设定一个区域，用来执行代码，且这段代码如何执行都不会影响到外部的主程序。

举几个我们开发中经常会用的沙箱：

- Vue template里的表达式，如: `<div>{{ 1+1 }}</div>`，执行`1+1`就是Vue设计的一个沙箱机制
- 开发Chrome插件，插件里的代码有很多限制条件，循序Chrome插件规则，那么插件的运行环境和规则也是一个沙箱
- 在线代码编辑器， CodeSanbox在执行脚本也会单独成立一个沙箱去隔离执行代码，防止代码访问或影响主页面
- 微前端`qiangun`或`single-spa `框架里主应用和子应用之间的完全隔离，也是一种沙箱机制，如: 应用之间CSS样式不能互相影响

在了解完沙箱是什么后，那么在JavaScript语言里如何实现沙箱呢？主要有以下几种方式：

- 使用 with 声明
- 使用 new Function 声明
- 基于 Proxy实现
- 基于属性 diff实现
- 基于 iframe实现
- 基于 ES 提案 ShadowRealm API

# 前置知识

## with关键字

> with 扩展一个语句的作用域链。 —— [MDN with](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/with)
> JavaScript 查找某个未使用命名空间的变量时，会通过作用域链来查找，作用域链是跟执行代码的 context 或者包含这个变量的函数有关。'with'语句将某个对象添加到作用域链的顶部，如果在 statement 中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，则将拋出ReferenceError异常。

按照个人比较容易理解的意思，就是给一段代码加上指定对象为该作用的全局变量。示例代码如下：

```js

Math.floor(1.1) // 1

// 使用with
with(Math){
    floor(1.1) // 1
}
```

## new Function
`new Function(argStr, codeStr)`是能将字符串代码转换为可执行的函数。具体示例如下：

```js
const name = 'test';

const test = new Function('arg', 'console.log(arg)');
// 这里等于 test = (arg)=> {console.log(arg)};

test(name); // test

```

## Proxy

> Proxy 对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。[Proxy MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)

Proxy只能代理`object`类型的变量，针对基础类型的代理只能将其封装到对象里再进行代理监听。

Proxy代理方法如下：

- `getPrototypeOf(target)` 代理获取原型的方法
- `setPrototypeOf(target, newProto)` 设置原型，如果不想设置原型，可以`return false`
- `isExtensible(target)`  拦截对对象的 `Object.isExtensible()`，必须返回一个 Boolean 值，判断一个对象是否是可扩展的
- `preventExtensions(target)` 拦截`Object.preventExtensions()`，让一个对象变的不可扩展，也就是永远不能再添加新的属性
- `getOwnPropertyDescriptor(target, prop)` 拦截`Object.getOwnPropertyDescriptor()`，拦截获取对象属性的描述符
- `defineProperty(target, property, descriptor)` 拦截`Object.defineProperty()`
- `has(target, key)`，针对 in 操作符的代理方法
- `get(target, property, receiver)`，用于拦截对象的读取属性操作
- `set()`，设置属性值操作的捕获器。
- `construct()`，用于拦截 new 操作符

与`Object.defineProperty`主要区别(可拦截方法比`Object.defineProperty`多)：

- Proxy代理的是整个对象，Object.defineProperty只代理对象上的某个属性,如果是多层嵌套的数据需要循环递归绑定;
- 对象上定义新属性时，Proxy可以监听到，Object.defineProperty监听不到，需要借助$set方法;
- 数组的某些方法(push、unshift和splice)Object.defineProperty监听不到，Proxy可以监听到;

## Symbol.unscopables

> 指用于指定对象值，其对象自身和继承的从关联对象的 with 环境绑定中排除的属性名称。

可以这么理解，就是为了防止`with`添加作用域的时候，将某个属性从作用域中排除掉，代码如下：
```js
a = {
    p: 1,
    b: 2
}
// 禁止将a.p放到with作用域中
a[Symbol.unscopables] = {p: true}

with(a){
    console.log(p) // 报错 p not defined
    console.log(b) // 正常输出
}
```

因此很多内置对象都设置该值为true，从而降低with的侵入，具体如下：
```js
Array.prototype[Symbol.unscopables];
/*{
  copyWithin: true,
  entries: true,
  fill: true,
  find: true,
  findIndex: true,
  flat: true,
  flatMap: true,
  includes: true,
  keys: true,
  values: true,
}*/
```


# 沙箱实现

沙箱实现步骤一般如下：

- 解析代码，动态执行
- 修改代码的作用域，避免进行向上全局查询
- 创建全局对象的替代对象，避免污染全局对象
- 执行代码

## 基于Proxy实现

前面基础知识将到Proxy是一个可以代理对象的方法，那么其实可以按照将一些全局对象做代理后放入到沙箱里。主要有两个步骤：

- 使用`new Function`将代码字符串转为可执行函数
- 加`with`生成局部作用域
- 使用`createFake`方法生成替代对象`fakeWindow`
- 使用`Proxy`代理拦截`set` `get`操作，更新到`fakeWindow`中
- 当沙箱不用时，将`window`重置回

简易沙箱示例代码如下：

```js
const { complieCode2Fn, createFakeWindow } = require('./complieCode.js');

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

const code = `a = 1;console.log('a:', a);return a;`

console.log(fakeBox.excute(code));  // 输出a:1
console.log('在沙箱外获取沙箱内设置的全局值a:', a); // a is not defined

```

问题1： 如何防止`Array.isArray`重写后不影响顶部window？

```js
```js
const code = `

    Array.isArray = ()=> true;
`
console.log(Array.isArray('a')); // 输出true 正常应该是false
```

-  生成`fakeWindow`对象时候，遍历内置`Array`，通过`Object.freeze`冻结其修改的可能性

问题2： 提前关闭 sandbox 的 with 语境，如 '} alert(this); {'  或者使用 eval 和 new Function 直接逃逸，如何解决？

- 解析code字符串，利用堆栈深度检测算法，将非法字符串 `{}`做简单计算 或者 `eval` 等关键字，然后报错处理

问题3： 如何解决修改原型链方法实现逃逸，既可以获取沙箱外的对象？

```js
const code = `

    ({}).constructor.prototype.toString = () => {

        console.log('Escape')

    }

`
console.log(({}).toString()) // 输出Escape 正常应该输出[object Object]
```
- 这种只能在原型链上下功夫，将所有的原型链做一次封装，从而


## 基于iframe实现

利用`iframe`天然隔离机制，加上`postMessage`通讯机制，可以快速实现一个简易沙箱，具体步骤如下：

- 创建一个iframe，获取其window作为替代对象
- 将function执行放到iframe里，不会影响其沙箱外程序使用

```js
class IframeSandbox {
    constructor() {
        // 创建一个 iframe 对象，取出其中的原生浏览器全局对象作为沙箱的全局对象
        const iframe = document.createElement('iframe', {url: 'about:blank'})
        document.body.appendChild(iframe)
        this.sandboxGlobal = iframe.contentWindow // 沙箱运行时的全局对象
    }

    excute(code){
        const fn = new this.sandboxGlobal.Function('sandbox', `with(sandbox){${code}}`)
        return fn(this.sandboxGlobal);
    }
}

const fakeBox = new IframeSandbox();
const code = `a = 1;console.log(a)`

console.log(fakeBox.excute(code));  // 输出a:1
console.log('在沙箱外获取沙箱内设置的全局值a:', a); // a is not defined
```

问题1： 需要解决其调用`parent`进行逃逸获取？

- 最佳方案是通过`Proxy`对iframe的window对象进行拦截代理即可

## 基于ShadowRealm 提案的实现

> ShadowRealm API 是一个新的 JavaScript 提案，它允许一个 JS 运行时创建多个高度隔离的 JS 运行环境（realm），每个 realm 具有独立的全局对象和内建对象。

通俗的说，这是JavaScript自带的沙箱API，你可以利用它快速实现上面需要通过proxy或iframe才能实现的隔离机制。

ShadowRealm声明：

```js
declare class ShadowRealm {
  constructor();
  evaluate(sourceText: string): PrimitiveValueOrCallable;
  importValue(specifier: string, bindingName: string): Promise<PrimitiveValueOrCallable>;
}
```

- `evaluate(sourceText: string)` 同步执行代码字符串，类似 eval()
- `importValue(specifier: string, bindingName: string)` 异步执行代码字符串

示例：
```js
const sr = new ShadowRealm();
globalThis.test = 'test';
sr.evaluate(`globalThis.test = 'test ShadowRealm'; console.log(globalThis.test)`) // 输出 test ShadowRealm

// 创建一个文件  my-module.js
export function sum(...values) {
  return values.reduce((prev, value) => prev + value);
}

// main.js
const sr = new ShadowRealm();
const wrappedSum = await sr.importValue('./my-module.js', 'sum'); // 加载js模块，然后获取里面函数
console.log(wrappedSum('hi', ' ', 'folks', '!')); // 输出 hi folks !

```

其实再来实现一个沙箱就很简单了，因为ShadownRealm本身就是一个沙箱。

## 其他方案

### Web Workers 

`Web Workers `代码运行在独立的进程中，通信是异步的，无法获取当前程序一些属性或共享状态，且有一点无法不支持 DOM 操作，必须通过 postMessage 通知 UI 主线程来实现
```js
function workerSandbox(appCode) {
 var blob = new Blob([appCode]);
 var appWorker = new Worker(window.URL.createObjectURL(blob));
} 

workerSandbox('const a = 1;console.log(a);') // 输出1

console.log(a) // a not defined
```

### vm 模块
Node.js 上的 vm 模块，与 ShadowRealm API 类似，但具有更多功能：缓存 JavaScript 引擎、拦截 import() 等等。但它唯一的缺点就是不能跨平台，只能在 Node.js 环境下使用。
```js
const vm = require('vm');
const sandbox = {
    a: 1
};
vm.createContext(sandbox)

const whatIsThis = vm.runInContext(`
    a = 2 ;
`, sandbox);

console.log(sandbox) // 输出2
```

# 沙箱错误捕获

在完成沙箱主体后，还需要对沙箱内部错误进行捕获再次处理，从而不影响主体程序的执行。

这一块其实就在执行动态代码那里，做一层`try/catch`基本上可以完成的错误捕获。


# 沙箱逃逸

沙箱逃逸（Sandbox Escape），沙箱于作者而言是一种安全策略，但于使用者而言可能是一种束缚。脑洞大开的开发者们尝试用各种方式摆脱这种束缚，也称之为沙箱逃逸。

沙箱逃逸的几种方式：

- 访问沙箱执行上下文中某个对象内部属性时，如：通过window.parent
- 通过访问原型链实现逃逸

如何解决沙箱逃逸：

> 自定义解释器，分析源程序结构从而手动控制每一条语句的执行逻辑，如：`Babel`等

简单的说，就是用JS去实现JS解释器，将每行代码进行解析，然后增加一些安全机制，从而避免非法代码入侵。

后续会专门写个文章去实现一个简单的JS解释器，这里就不做多阐述。更新后会放在这里链接。

# 参考资料

- [MDN Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy)
- [qiankun中JS沙箱的实现](https://github.com/careyke/frontend_knowledge_structure/blob/master/microFrontend/question02_03_js_sandbox.md)
- [CodeSandbox 如何工作](https://cloud.tencent.com/developer/article/1482264)
- [Javascript 新特性前瞻 —— ShadowRealms](https://juejin.cn/post/7089822133559230501)