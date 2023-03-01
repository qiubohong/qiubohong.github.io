/**
 * 基于acron的语法解析器
 */

const acron = require('acorn');

const parse = (code)=>{
    return acron.parse(code);
}

module.exports = parse
