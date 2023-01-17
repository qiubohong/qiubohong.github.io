/**
 * 基于顺序队列做循环队列
 */
class Queue {
    constructor(n) {
        this.max = n;
        this.queue = new Array(n);
        this.front = 0;
        this.rear = 0;
    }

    enqueue(val) {
        // 调整这里，当移动到最后的时候将rear指针重新指向0，重头开始
        if (this.rear === (this.max - 1)) {
            this.rear = 0;
        }  
        // 如果当前节点不为空，则表示队列已满，否则继续占用空间
        if(this.queue[this.rear]!== undefined){
            return false;
        }
        this.queue[this.rear] = val;
        this.rear+=1;
        return this;
    }

    dequeue(){
        if(this.rear === this.front){
            return null;
        }
        const result = this.queue[this.front];
        this.queue[this.front] = undefined;
        this.front +=1;
        return result;
    }

    clear(){
        this.queue = new Array(this.max);
        this.front=0;
        this.rear=0;
        return this;
    }
}