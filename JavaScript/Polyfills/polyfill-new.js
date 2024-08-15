/**
* polyfill for new in javascript
* @param constructor function
* @param arguments
* @returns object
*/
function myNew(constructorFn, ...args){
  const obj = {}; //create an empty object
  constructorFn.apply(obj,args); //call the passed constructor fn with the new obj and args array
  obj.__proto__ = constructorFn.prototype; //for prototypical inheritance
  return obj
}

// USAGE

function Person(name,age){
  this.name = name;
  this.age = age;
}

var p1 = new Person('Ish','31') 
// p1 -> {name: 'Ish', age: '31'}
// p1.constructor -> Person{}

var p2 = myNew(Person, 'Ish','31')
// p2 -> {name: 'Ish', age: '31'}
// p2.constructor -> Person{}
