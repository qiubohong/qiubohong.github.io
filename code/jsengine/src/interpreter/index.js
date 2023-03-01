/**
 * 基于acorn的js解释器
 */
const acron = require('acorn');

const Visitor = require('./visitor');
const Interpreter = require('./interpreter');

/**
 * 解释器入口
 * @param {*} code 
 * @param {*} ecmaVersion 
 * @returns 
 */
module.exports = function (code, ecmaVersion = '2020') {
    const rootAst = acron.parse(code, {
        ecmaVersion,
        sourceType: "script",
    });
    const visitor = new Visitor();
    const interpreter = new Interpreter(visitor);
    return interpreter.interpreter(rootAst);
}