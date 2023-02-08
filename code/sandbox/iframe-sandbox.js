const { complieCode2Fn, createIframeWindow } = require('./complieCode.js');

/**
 * iframe沙箱类
 */
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


