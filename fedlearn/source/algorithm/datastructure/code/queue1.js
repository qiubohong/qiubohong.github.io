class Queue {
    constructor(n) {
        this.max = n;
        this.queue = new Array(n);
        this.front = 0;
        this.rear = 0;
    }

    enqueue(val) {
        if (this.rear === (this.max - 1)) {
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