/**
 * 词法分析器
 */

const acron = require('acorn');

/**
 * 利用acorn库进行词法分析
 * @param {*} code 
 * @param {*} ecmaVersion 
 * @returns 
 */
const getToken = (code, ecmaVersion = '11') => {
    const tokenIterator = acron.tokenizer(code, {
        ecmaVersion,
    });
    return [...tokenIterator];
}

module.exports = getToken;