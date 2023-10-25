function createStack() {
  const stack = [];

  function push(element) {
    stack.push(element);
  }

  function pop() {
    if (isEmpty()) {
      return "Underflow";
    }
    return stack.pop();
  }

  function peek() {
    if (isEmpty()) {
      return "No elements in the stack";
    }
    return stack[stack.length - 1];
  }

  function isEmpty() {
    return stack.length === 0;
  }

  function size() {
    return stack.length;
  }

  function print() {
    return stack.join(" ");
  }

  return {
    push,
    pop,
    peek,
    isEmpty,
    size,
    print,
  };
}

// Example Usage
const stack = createStack();

stack.push(10);
stack.push(20);
stack.push(30);

console.log(stack.print()); // Output: 10 20 30

console.log(stack.pop()); // Output: 30

console.log(stack.peek()); // Output: 20

console.log(stack.size()); // Output: 2

console.log(stack.isEmpty()); // Output: false

console.log(stack.print()); // Output: 10 20
