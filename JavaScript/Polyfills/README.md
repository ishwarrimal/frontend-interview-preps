# Polyfills

Polyfills in JavaScript are code snippets or scripts that provide modern functionalities to older browsers or environments that lack support for those features.
Some new features doesn't work on older browser, we write polyfill of such functionality to provide support in older browser.

**Why do you need to know to write polyfill?**

It gives you better understanding of the prgramming.

[Table of Contents](#polyfills)

- [Promise](#promise)
- [Promise All](#promise-all)
- Call, Bind, Apply
- ForEach, Map, Reduce

[Go Back ↩](../README.md)

## Promise

Let's see how you write an actual promise in JavaScript

```javascript
let myP = new Promise((res, rej) => {
	setTimeout(() => { res('success') }
})

myP.then(data => console.log(data)).catch(err => console.error(err)).finally(data => console.log('everything is done')
```

Let's write polyfill using JS Classes

```javascript
class MyPromise {
  constructor(executor) {
    this.state = "Pending";
    this.value = null;
    this.reason = null;
    this.thenCB;
    this.catchCB;
    this.finallyCB;
    const res = dataValue => {
      if (this.thenCB) {
        this.state = "Fulfilled";
        this.thenCB(dataValue);
      } else {
        this.value = dataValue;
      }
      if (this.finallyCB) {
        this.finallyCB();
      }
    };
    const rej = errorValue => {
      if (this.catchCB) {
        this.state = "Rejected";
        this.catchCB(errorValue);
      } else {
        this.reason = errorValue;
      }
      if (this.finallyCB) {
        this.finallyCB();
      }
    };
    try {
      executor(res, rej);
    } catch (err) {
      rej(err);
    }
  }
  then(cb) {
    if (this.state === "Pending" && this.value) {
      this.state = "Resolved";
      const data = cb(this.value);
    } else {
      this.thenCB = cb;
    }
    return this;
  }
  catch(cb) {
    if (this.state === "Pending" && this.reason) {
      this.state = "Rejected";
      const data = cb(this.value);
    } else {
      this.catchCB = cb;
    }
    return this;
  }
  finally(cb) {
    if (this.state !== "Pending" && this.value) {
      cb(this.data);
    } else {
      this.finallyCB = cb;
    }
    return this;
  }
}

let executorFunction = (resolve, reject) => {
  resolve("Success");
};

let MPromise = new MyPromise(executorFunction);

MPromise.then(data => {
  console.log(`Data recieved in then is -> ${data}`);
  return "Ish";
})
  .catch(err => console.log(`Error recieved in catch is -> ${err}`))
  .finally(data => console.log(`Data recieved in finally -> ${data}`));
```

This is a simple promise polyfill that takes care of most of the cases except for **chaining then and catch**
Please folllow this video [Writing Polyfill for Promise in JavaScript](https://www.youtube.com/watch?v=lKdFKuttdfM) to get a better understanding.

## Promise All
Let's see how to write Promise.all in Javascript

```javascript
 const promiseOne= Promise.resolve(4);
 const promiseTwo= Promise.resolve(true);
 const myPromiseAll= Promise.all([promiseOne,promiseTwo]);
 myPromiseAll.then((response)=>{
	console.log(response)// [4,true]
	}).catch((error)=>{
	console.log(error)
	})
```
Now let's write polyfill for Promise.all
```javascript
function promiseAll(promises){
  const resolvedPromiseResult=[];
  let resolvedPromiseCount=0;
  return new Promise((resolve,reject)=>{
    promises.forEach((promise,index) => {
      //Promise.resolve to handle non promise case
      Promise.resolve(promise).then((response)=>{
          resolvedPromiseResult[index]=response;
          resolvedPromiseCount+=1;
          if(resolvedPromiseCount===promises.length){
            resolve(resolvedPromiseResult)
          }
        }).catch((err)=>{
          reject(err)
        });
    });
  });
}

// All promises resolved case

const promiseOne= Promise.resolve(4);
const promiseTwo= Promise.resolve(5);
const myPromiseAll= promiseAll([promiseOne,promiseTwo]);

myPromiseAll.then((response)=>{
  console.log(response);
}).catch(err=>{
  console.log(err);
});

// One of the promise got rejected case

const promiseThree= Promise.reject("Some error!");
const myPromiseAllRejected=promiseAll([promiseOne,promiseThree,promiseTwo]);

myPromiseAllRejected.then((response)=>{
  console.log(response)
}).catch(err=>{
  console.log(err) //Some error! 
})

// Non promise case

const promise1 = Promise.resolve(3);
const promise3 = 42
const promise2 = new Promise((resolve, reject) => {
  setTimeout(reject, 100, 'foo');
});
promiseAll([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
```
## ForEach

Let's see how to use forEach in Javascript
```javascript
forEach(callBackFn)

const numList=[1,2,3,4,5];
//Using arrow function as callbackFn in forEach
numList.forEach((num)=>{
  console.log(num)
});

//CallBackFn will receive 3 parameters
/*
1. Element of array
2. Index of the element
3. Array itself
*/
numList.forEach((num,index,numList)=>{
  console.log(num,index,numList)
});

//With function expression as callbackFn in forEach
function numParser(num){
  console.log("Number parser",num)
}
numList.forEach(numParser)

```
Let's write using other syntax

```javascript
forEach(callBackFn,thisArg)

class Incrementor {
  constructor() {
    this.sum = 0;
    this.count = 0;
  }
  add(array) {
    array.forEach(function countEntry(entry) {
      this.sum += entry;
      this.count+=1;
    }, this);
  }
}

cont obj= new Incrementor();
obj.add([1,2,3])
console.log(obj.sum) //6
console.log(obj.count) //3
```
Now let's write polyfill for forEach method

```javascript

Array.prototype.customForEach=function (callbackFn,thisArg){
  /* 
    this keyword is referring to an array on which customForEach method is called
  */
  const arrayLength= this.length;
  for(let i=0;i<arrayLength;i++){
    if (this[i]) {
      callbackFn.call(thisArg, this[i], i, this);
    }
  }
}

const integerList=[1,2,3,4,5];

integerList.customForEach((num)=>{
  console.log(num)// 1 2 3 4 5
});

function numParser(num){
  console.log("Number parser",num)
}

integerList.customForEach(numParser)

class Incrementor {
  constructor() {
    this.sum = 0;
    this.count = 0;
  }
  add(array) {
    array.customForEach(function countEntry(entry) {
      this.sum += entry;
      this.count+=1;
    }, this);// `this` argument is passed
  }
}

cont obj= new Incrementor();
obj.add([1,2,3])
console.log(obj.sum) //6
console.log(obj.count) //3

```
## Map

Let`s see how to use map in Javascript
```javascript
map(callBackFn)

const numList = [1, 2, 3, 4, 5];
//Using arrow function as callbackFn in map
console.log(numList.map((num) => num * 2)); // 2 4 6 8 10

//CallBackFn will receive 3 parameters
/*
1. Element of array
2. Index of the element
3. Array itself
*/
const transformedNumList=numList.map((num,index,numList)=>{
  console.log(num,index,numList)
  return num + 2
})

console.log(transformedNumList)//3 4 5 6 7

let users = [
  {firstName : "John", lastName: "Doe"},
  {firstName : "Michel", lastName: "Longbottom"},
  {firstName : "Jacob", lastName: "Black"}
];

//Using function expression as callbackFn in map
const userFullNames = users.map(function(element){
    return `${element.firstName} ${element.lastName}`;
});
console.log(userFullNames);

```
Let's use map method using other syntax
```javascript
map(callBackfn,thisArg)

const arr = [5,6,7,8,9];

arr.map(function(element, index, array){
	console.log(this) // 40
}, 40);

```
Now we are going to implement polyfill for the Map method

```Javascript
Array.prototype.customMap = function (callbackFn, thisArg) {
  /*
   this keyword is referring to an array on which customMap method is called 
  */
  if (!Array.isArray(this)) {
    throw new TypeError('customMap can only be called on an array');
  }
  const arrayLength = this.length;
  let arr = [];
  for (let i = 0; i < arrayLength; i++) {
    //check for non empty slots in an array
    if (this[i]) {
      arr[i] = callbackFn.call(thisArg, this[i], i, this);
    }
  }
  return arr;
};

const numList = [1, 2, 3, 4, 5];
console.log(numList.customMap((num) => num * 2)); // 2 4 6 8 10

const arr = [5,6,7,8,9];
arr.customMap(function(element, index, array){
	console.log(this) // 40
}, 40);
```
## Reduce

Let's see how to use reduce in Javascript

```javascript
reduce(callbackFn)

const numbersArray = [15, 16, 17, 18, 19];
const sum=numbersArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  )
console.log(sum)//85

```
Let's see how to use reduce with other syntax

```javascript
reduce(callbackFn,initialValue) - Most of the cases this syntax is used

const numbersArray = [15, 16, 17, 18, 19];
const sum=numbersArray.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
   10
  )
console.log(sum)//95

const objects = [{ x: 3 }, { x: 4 }, { x: 5 }];
const objectSum = objects.reduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  0
);
console.log(objectSum);//12

```
Now let's write polyfill for reduce method

```javascript
Array.prototype.customReduce = function (reducerFn, initialValue) {
  /* 
    this keyword is referring to an array on which customReduce method is called
  */
  if (!Array.isArray(this) || this.length === 0) {
    throw new Error("Empty array or not an array!");
  }
  const arrayLength = this.length;
  let startIndex;
  let accumulator;
  if (initialValue) {
    accumulator = initialValue;
    startIndex = 0;
  } else {
    accumulator = this[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < arrayLength; i++) {
    //Empty slot(sparse Array) is skipped by reducer
    //Undefined case is not skipped by reducer
    if (this[i] || typeof this[i] === "undefined") {
      accumulator = reducerFn(accumulator, this[i], i, this);
    }
  }
  return accumulator;
};

const numbersArray = [15, 16, 17, 18, 19];

const sum=numbersArray.customReduce(
    (accumulator, currentValue) => accumulator + currentValue
  )
console.log(sum)//85

const sumWithInitialVal=numbersArray.customReduce(
    (accumulator, currentValue) => accumulator + currentValue,
   10
  )
console.log(sumWithInitialVal)//95

const objects = [{ x: 3 }, { x: 4 }, { x: 5 }];
const objectSum = objects.customReduce(
  (accumulator, currentValue) => accumulator + currentValue.x,
  0
);
console.log(objectSum);//12
```