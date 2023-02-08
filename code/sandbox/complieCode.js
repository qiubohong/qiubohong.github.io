/**
 * 动态编译代码并执行
 * 采用with 是因为 new Function是在全局作用域下执行的
 * 用with可以指定作用域
 * 返回一个可执行函数
 */
function complieCode2Fn(code, isStrict) {
    const scriptText = !isStrict ? `;(function(window, self, globalThis){
        console.log('window', window)
        with(window){
            ${code}
        }
    }).bind(sandbox)(sandbox, sandbox, sandbox);` :`;(function(window, self, globalThis){
            ${code}
    }).bind(sandbox)(sandbox, sandbox, sandbox);`
    return new Function('sandbox', scriptText);
}


function createFakeWindow(global){
    const fakeWindow = {}
    Object.getOwnPropertyNames(global)
    .filter(p=>{
        const descriptor = Object.getOwnPropertyDescriptor(global, p);
        // 将不允许重写的筛选出来
        return !descriptor || !descriptor.configurable;
    })
    .forEach((p) => {
        const descriptor = Object.getOwnPropertyDescriptor(global, p);
        if (descriptor) {
          // 冻结不可修改属性
          Object.defineProperty(fakeWindow, p, Object.freeze(descriptor))
        }
    });

    return fakeWindow;
}

function createIframeWindow(){
    // 创建一个 iframe 对象，取出其中的原生浏览器全局对象作为沙箱的全局对象
    const iframe = document.createElement('iframe', {url: 'about:blank'})
    document.body.appendChild(iframe)
    const sandboxGlobal = iframe.contentWindow // 沙箱运行时的全局对象

    return sandboxGlobal;
}

module.exports.complieCode2Fn = complieCode2Fn;
module.exports.createFakeWindow = createFakeWindow;
module.exports.createIframeWindow = createIframeWindow;