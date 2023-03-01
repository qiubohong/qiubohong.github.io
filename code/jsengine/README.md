# 执行JS引擎操作

```shell
#安装依赖
pnpm install

# 执行测试效果

node main.js
```

`main.js`是测试入口，具体可以看代码：

```js

const { run } = require('./src');

const code = `let a = 1; if(a === 1){a = 2;}`

console.log(run(code))

```