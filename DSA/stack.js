class Stack {
    constructor() {
        this.items = [];
    }

    // Push element to the stack
    push(element) {
        this.items.push(element);
    }

    // Pop element from the stack
    pop() {
        if (this.isEmpty()) {
            return "Underflow";
        }
        return this.items.pop();
    }

    // Peek at the top element of the stack
    peek() {
        if (this.isEmpty()) {
            return "No elements in the stack";
        }
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        return this.items.length === 0;
    }

    // Get the size of the stack
    size() {
        return this.items.length;
    }

    // Print the stack
    print() {
        let str = "";
        for (let i = 0; i < this.items.length; i++) {
            str += this.items[i] + " ";
        }
        return str;
    }
}

// Example Usage
let stack = new Stack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.print()); // Output: 10 20 30

console.log(stack.pop()); // Output: 30

console.log(stack.peek()); // Output: 20

console.log(stack.size()); // Output: 2

console.log(stack.isEmpty()); // Output: false

console.log(stack.print()); // Output: 10 20
