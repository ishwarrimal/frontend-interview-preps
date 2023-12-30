// Code to implement a linked list in JavaScript
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

// Linked List Implementation
class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

// Adds node to the end of the linked list
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

// Adds node to the beginning of the linked list
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    this.size++;
  }
//  Removes node from the linked list
  remove(data) {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      this.size--;
      return;
    }

    let current = this.head;
    let prev = null;

    while (current && current.data !== data) {
      prev = current;
      current = current.next;
    }

    if (current) {
      prev.next = current.next;
      this.size--;
    }
  }

// Checks if the linked list contains a node with the given data
  contains(data) {
    let current = this.head;
    while (current) {
      if (current.data === data) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

//  Returns the size of the linked list
  getSize() {
    return this.size;
  }

//  Returns the linked list as an array
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
}

// Function to read user input
function getUserInput() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const linkedList = new LinkedList();

  function promptAction() {
    console.log('Linked List Operations:');
    console.log('1. Append');
    console.log('2. Prepend');
    console.log('3. Remove');
    console.log('4. Check for Containment');
    console.log('5. Get Size');
    console.log('6. Display Linked List');
    console.log('7. Exit');

    readline.question('Select an operation (1-7): ', (choice) => {
      switch (choice) {
        case '1':
          readline.question('Enter data to append: ', (data) => {
            linkedList.append(data);
            promptAction();
          });
          break;
        case '2':
          readline.question('Enter data to prepend: ', (data) => {
            linkedList.prepend(data);
            promptAction();
          });
          break;
        case '3':
          readline.question('Enter data to remove: ', (data) => {
            linkedList.remove(data);
            promptAction();
          });
          break;
        case '4':
          readline.question('Enter data to check for containment: ', (data) => {
            const contains = linkedList.contains(data);
            console.log(`Contains ${data}: ${contains}`);
            promptAction();
          });
          break;
        case '5':
          const size = linkedList.getSize();
          console.log(`Size of the Linked List: ${size}`);
          promptAction();
          break;
        case '6':
          const array = linkedList.toArray();
          console.log(`Linked List: ${array.join(' -> ')}`);
          promptAction();
          break;
        case '7':
          readline.close();
          break;
        default:
          console.log('Invalid choice. Please select an operation (1-7).');
          promptAction();
          break;
      }
    });
  }

  promptAction();
}
// Call the function to read user input
getUserInput();
