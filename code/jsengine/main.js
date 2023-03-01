const code = `function sum(a, b){return a+b;}; const a = sum(1, 2);`

const { getToken, parse, run} = require('./src');
// const tokens = getToken(code, '11');

const ast = parse(code);

console.log(run(`let a = 1; if(a === 1){a = 2;}`))

