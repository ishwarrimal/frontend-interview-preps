class Stack {
  constructor() {
    this.items = [];
  }

  // Push method to add an element to the stack
  push(element) {
    this.items.push(element);
  }

  // Pop method to remove and return the top element from the stack
  pop() {
    if (this.isEmpty()) {
      return "Stack is empty";
    }
    return this.items.pop();
  }

  // Peek method to return the top element without removing it
  peek() {
    if (this.isEmpty()) {
      return "Stack is empty";
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

  // Clear the stack
  clear() {
    this.items = [];
  }
}

// Example usage:
const stack = new Stack();

stack.push(1);
stack.push(2);
stack.push(3);

console.log("Stack:", stack.items); // [1, 2, 3]
console.log("Pop:", stack.pop()); // 3
console.log("Peek:", stack.peek()); // 2
console.log("Is Empty:", stack.isEmpty()); // false
console.log("Stack Size:", stack.size()); // 2

stack.clear();
console.log("Stack:", stack.items); // []
