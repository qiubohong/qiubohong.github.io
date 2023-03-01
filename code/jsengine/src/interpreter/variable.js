/**
 * 解释器中的变量对象
 */

class Variable {
    constructor(kind, value) {
        this.kind = kind; // 变量类型
        this._value = value; // 变量值
    }

    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
}

Variable.Kind = {
    VAR: 'var',
    LET: 'let',
    CONST: 'const',
};

module.exports = Variable;

