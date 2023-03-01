/**
 * 代码遍历器，判断AST语法树节点属于哪个类型，然后调用对应的处理函数
 */

const Scope = require("./scope");

/**
 * 语法树节点类型映射对应处理函数
 * 所有函数参数皆为AST语法树节点 node 和 作用域scope
 */
const VISITOR = {
    /**
     * 根级节点入口
     * @param {*} astPath 
     */
    Program: function (astPath) {
        const { node, scope, context } = astPath;
        node.body.forEach((bodyNode) => context.visitNode(bodyNode, scope));
    },
    /**
     * 变量声明类型
     * @param {*} astPath 
     */
    VariableDeclaration: function (astPath) {
        const { node, scope, context } = astPath;
        const { declarations, kind } = node;
        declarations.forEach((declare) => {
            const { id, init } = declare; // id为变量名，init为变量值
            const { name } = id; // 变量名
            // 获取 变量值
            const value = init ? context.visitNode(init, scope) : undefined;
            // 将变量值赋值到作用域中
            scope.declare(kind, name, value);
        })
    },
    /**
     * 寻找变量的值
     * @param {*} astPath 
     * @returns 
     */
    Identifier(astPath) {
        const { node, scope } = astPath;
        const name = node.name;
        const variable = scope.search(name);
        if (variable) return variable.value;
    },
    /**
     * 获取变量的字面量值
     * @param {*} astPath
     * @returns
     * 
     */
    Literal: function (astPath) {
        const { node } = astPath;
        // 判断是否为正则表达式
        if (node.regex) {
            const { pattern, flags } = node.regex;
            return new RegExp(pattern, flags);
        }
        return node.value;
    },
    /**
     * 表达式
     * @param {*} astPath 
     * @returns 
     */
    ExpressionStatement(astPath) {
        const { node, scope, context } = astPath;
        return context.visitNode(node.expression, scope);
    },
    /**
     * 赋值 = 表达式
     * @param {*} astPath 
     */
    AssignmentExpression(astPath) {
        const { node, scope, context } = astPath;
        // 拥有左右两个节点 left是变量名，right是另外一个表达式
        const { left, right } = node;
        const { name } = left;
        const value = context.visitNode(right, scope);
        const variable = scope.search(name);
        if (variable) variable.value = value;
    },
    /**
     * 运算符表达式
     * @param {*} astPath 
     * @returns 
     */
    BinaryExpression(astPath) {
        const { node, scope, context } = astPath;
        const { left, right, operator } = node;
        const leftValue = context.visitNode(left, scope);
        const rightValue = context.visitNode(right, scope);
        return {
            '+': () => leftValue + rightValue,
            '-': () => leftValue - rightValue,
            '*': () => leftValue * rightValue,
            '/': () => leftValue / rightValue,
            '%': () => leftValue % rightValue,
            '==': () => leftValue == rightValue,
            '===': () => leftValue === rightValue,
            '!=': () => leftValue != rightValue,
            '!==': () => leftValue !== rightValue,
            '>': () => leftValue > rightValue,
            '>=': () => leftValue >= rightValue,
            '<': () => leftValue < rightValue,
            '<=': () => leftValue <= rightValue,
        }[operator]();
    },
    /**
     * 函数声明
     * @param {*} astPath 
     */
    FunctionDeclaration(astPath) {
        const { node, scope, context } = astPath;
        const { id, params, body } = node;
        const { name } = id;
        const fn = function () {
            const fnScope = new Scope(Scope.Type.FUNCTION, scope);
            params.forEach((param, index) => {
                const { name } = param;
                fnScope.declare('var', name, arguments[index]);
            });
            return context.visitNode(body, fnScope);
        }
        scope.declare('var', name, fn);
    },
    /**
     * 块级作用域
     * @param {*} astPath 
     */
    BlockStatement(astPath) {
        const { node, scope, context } = astPath;
        const { body } = node;
        console.log('BlockStatement', body)
        body.forEach((bodyNode) => context.visitNode(bodyNode, scope));
    },
    /**
     * 条件判断语句
     * @param {*} astPath 
     */
    IfStatement(astPath) {
        const { node, scope, context } = astPath;
        const { test, consequent, alternate } = node;
        // test为判断条件，consequent为条件成立时执行的语句，alternate为条件不成立时执行的语句
        const testValue = context.visitNode(test, scope);
        if (testValue) {
            if (consequent) {
                context.visitNode(consequent, scope);
            }
        } else {
            if (alternate) {
                context.visitNode(alternate, scope);
            }
        }
    }
}

class Visitor {
    /**
     * 遍历AST语法树，并执行对应的处理函数
     * @param {*} node 
     * @param {*} scope 
     */
    visitNode(node, scope) {
        const { type } = node;
        console.log('scope', scope, node);
        if (VISITOR[type]) {
            return VISITOR[type]({ node, scope, context: this });
        }
        return undefined;
    }
}

module.exports = Visitor;