const vm = require('vm');
const sandbox = {
    a: 1
};
vm.createContext(sandbox)

const whatIsThis = vm.runInContext(`
    a = 2 ;
`, sandbox);

console.log(sandbox) // 输出2