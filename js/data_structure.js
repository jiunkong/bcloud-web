class Stack {
    constructor() {
        this._arr = [];
    }
    push(item) {
        this._arr.push(item);
    }
    pop() {
        return this._arr.pop();
    }
    top() {
        return this._arr[this._arr.length - 1];
    }
    empty() {
        return (this._arr.length === 0);
    }
    clear() {
        this._arr = [];
    }
}