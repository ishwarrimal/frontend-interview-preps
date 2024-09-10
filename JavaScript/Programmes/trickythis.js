function callback() {
  console.log(2, this);
}

const object = {
  length: 5,
  method() {
    console.log(8, this);
    arguments[0]();
  },
};

object.method(callback);

// Output
8 {length: 5, method: ƒ}
2 Arguments [ƒ, callee: ƒ, Symbol(Symbol.iterator): ƒ]


// What's happening here?

// The first console.log(this) inside method() will log the object itself because this refers to the object on which the method is called. 
// So, it will output the object and its properties.

// The second console.log(this) inside callback() is a regular function, and this within a regular function refers to the context in which the function is called. 
// In this case, the context is the arguments object since callback is invoked through arguments[0](), `this` for callback becomes arguments instead of the object.

// When arguments[0]() is called, it executes the callback function. Since callback is invoked without any explicit context, this within callback will refer to the arguments object. Therefore, it will log the arguments object to the console.
