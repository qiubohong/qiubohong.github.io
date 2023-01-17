import LinkNode from './linklist1.js';
/**
 * 假设已有链表结构为LinkNode = ()=>{
 *     val = 
 *     next =
 * }
 */
class Queue {
    constructor() {
        this.front = new LinkNode();
        this.rear = this.front;
    }

    enqueue(val) {
        const prev = this.rear;
        const node = new LinkNode(val);
        prev.next = node;
        this.rear = node;
        return this;
    }

    dequeue(){
        if(this.front.next === null){
            return null;
        }
        const result = this.front.next;
        result.next = null;

        this.front.next = this.front.next.next;
        return result.val;
    }

    clear(){
        this.front = new LinkNode();
        this.rear = this.front;
        return this;
    }
}