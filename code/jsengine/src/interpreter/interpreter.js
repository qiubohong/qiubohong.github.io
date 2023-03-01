const Scope = require("./scope");

/**
 * 执行vistor的解释器类
 */
class Interpreter {

    constructor(visitor) {
        this.visitor = visitor;
        this.scope = this.createScope();
    }
    
    interpreter(node){
        this.visitor.visitNode(node, this.scope);
    }

    static createScope(){
        // 创建一个全局作用域
        return new Scope(Scope.Type.GLOBAL);
    }
}

module.exports = Interpreter;