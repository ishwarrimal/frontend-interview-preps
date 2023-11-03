# Web Fundamentals

## What are states?

I have explained this in detail here: [What the hell is state in web applicaiton](https://ishwar-rimal.medium.com/what-the-hell-is-state-in-web-applications-f529aa4cf6e1) Please go throught it.

## Working of a browser

Majorly there are 4 events that happen when you type google.com in your browser!

1. DNS Resolution.

2. Fetching the resources.

3. Parsing and executing it.

4. Displaying the content.

Let's learn about each in brief:

## DNS Resolution

DNS Resolution is a process of converting the human redable domain name into numerical IP Address of your remote server.

This can happen in 3 places:

1. Browser's cache - Cached in a recent request.

2. Operating System Cache - Cached during previous lookups.

3. ISP - Internet Service Provider contains DNS resolver which has most common lookups cached.

If no resolution happens in the above 3 stages, the following steps are performed by ISP

- Contact the root DNS servers to resolve the TLD - top-level domains (like .com, .org, .net) and get the authoritative DNS server for the top-level domain (TLD)

- Contact the TLD DNS server to resolve the Autohrative DNS; The TLD DNS server responds with the IP address of the authoritative DNS server for the specific domain (e.g., google.com).

- The authoritative DNS server for the domain provides the IP address associated with the requested domain (e.g., the IP address of Google's servers). This information is sent back to the DNS resolver.

- The DNS resolver caches the IP address for future reference and sends the IP address to your web browser.

## Routing

Once the IP address is dertermined and a connection is made to the server, the server decides what content to respond based on the data present along with the IP address like port number and requested resource url.

- Load Balancer :

The server may implement load balancer to redriect incoming traffic to different server.

- The server uses it's routing logic to reidrect the request within it's sytem.

- The server sends the response back to the client.

- The client now process and dispalys the content.

## Rendering in the browser

When the browser recieves content from the server, following steps take place (Note: we will be discussing only about HTML content right here)

- **Character Encoding** : Converting the incoming binary data into character stream. This is based on the encoding format like UTF-8 (other format ASCII, UTF8, UTF32, ISCII, Unicode)

- **Tokenizing** : Convering character stream to HTML blocks.

- **HTML Parsing** : Converting raw HTML into DOM content based on the rule of HTML specification (commonly HTML5)

- **DOM Construction** : Construct a hiererchal structure called DOM tree with all the attributes added to the DOM node.

- **CSSOM Construction** : Simiar to DOM tree, a CSSOM tree is constructed for the CSS. (We will be covering the part of loading external CSS and external script separately)

- **Render Tree** : Another tree is constructed by combining the DOM and CSSOM. This tree consists of only the elements visible to the Actual User. Elements having styles like `display: none` etc are not part fo this tree, though it's part of the DOM Tree.

- **Layout** : Calcualte the exact position and geometry of the element on the web page based on the provided styles. It determines where the element should be placed on the screen.

- **Painting** : Paing the element on the screen.

- **Compositing**: Compositing, which combines various layers or elements to create the final image, takes into account the stacking order within stacking contexts (z-index)

- **Continuous Rendering**: Browsers continuously render and update content as needed, especially for web pages with animations, scrolling, or dynamic changes. This ensures that the user sees the most up-to-date and responsive content.

If you want to learn more aobut this, I recommend reading this blog by google [inside look of modern browser](https://developer.chrome.com/blog/inside-browser-part1/)

## Event Loop

When talking about Event Loop, usually the interviewer wants to know about the overall working of the JS Runtime and not just the Event Loop part of it.  
Event loop in particular is a fundamental concept that is responsible for the execution of asynchronous code by continuously checking the callback qu...(Ruko Jara, Sabar Karo) but before going deeper into that, let's first understand what is a JavaScript runtime.

## JavaScript Runtime

Runtime is nothing but an environment in which the program runs. And any environment having the capability to run a JavaScript code is a JS runtime. To understand what a JavaScript Runtime is, please read [this short article](https://ishwar-rimal.medium.com/a-javascript-runtime-what-is-it-1b3aa5514aa4)
In the context of this article, we will be discussin only about the working of JS Runtime.
A JS runtime has following component to it:

1. Call Stack.
2. Memory Heap.
3. Web APIs.
4. Callback/Task Queue.
5. Event Loop.
6. Microtask and Promise Queue.

### CallStack

- Responsible for all the sycnhronous work in JavaScript.
- It is a stack data structure which operates in a Last-In-First-Out (LIFO) manner, meaning the most recently added function is the first one to be removed when it returns.
- Example:

```javascript
function functionC(){
	...
}
function functionB(){
	functionC()
	...
}
function functionA(){
	functionB()
	...
}
functionA()
```

When the above code is executed, the following happens:

1.  `functionA` is called, and it is pushed onto the call stack.
    - Call Stack: `[functionA]`
2.  `functionA` calls `functionB`, so `functionB` is added to the call stack.
    - Call Stack: `[functionA, functionB]`
3.  `functionB` calls `functionC`, so `functionC` is added to the call stack.
    - Call Stack: `[functionA, functionB, functionC]`
4.  `functionC` completes its execution and logs. It is removed from the call stack.
    - Call Stack: `[functionA, functionB]`
5.  `functionB` completes its execution and returns. It is removed from the call stack.
    - Call Stack: `[functionA]`
6.  Finally, `functionA` completes its execution and returns. It is removed from the call stack.
    - Call Stack: `[]`

### Memory Heap

- The memory heap is a region of memory where objects, variables, and function closures are allocated and stored.
- JavaScript objects are allocated in the heap, and references to these objects are managed on the stack.

### Browser API

Ever wondered how `document.getElementById` or APIs like this work in the browser?  
This is not part of the JavaScript language itself, but rather it's supported by web browsers as part of the browser's runtime environment.  
This allows JavaScript to interact with the browser and the web page's Document Object Model (DOM).

Features supported by Browser API

- DOM
- Make network requests
- Set timers
- Handle events, etc.

For the same reason, you will not be able to acess DOM api in other JS Runtime like Node.

For Node, there is a separate `C++` API that helps us with things like making network call, settting timers, etc.

### Callback Queue

The responsibility of callback queue is to store the callback for any async tasks.
There are series of operations that happen before any task reaches the callback queue:

1. As we read previously, web API Takes care of executing async operations.
2. Once the async execution is completed, the callback function is passed to the callbakc Queue.
3. The event loop continuously checks the callstack and as soon as it's empty, it moves the task in callback queue to the call stack for execution.

As the name suggests, callback queue is implemented using a Queue data strucutre, which makes sure that the first task to be passed to the queue get's executed (in this case, moved to the call stack) first.

### Event Loop

We briefly touched upon Event Loop previously [here](https://github.com/ishwarrimal/frontend-interview-preps/tree/main/Web%20Fundamentals/Basics#event-loop)
Event loop is nothing but a mechanism implemented by JS Engine whose job is to move task from callback queue to the call stack.
But, the event loop can do so only when the call stack is empty, hence event loops has to keep checking for the call stack to get empty to move the tasks from the callback queue.
NOTE: This varies slightly when it comes to micro task quque (which is different from callback queue), about which we will read in a moment.

### Micro Task Queue

As we read before, the event loop has to wait for the call stack to be empty before moving the tasks from callback quque to the call stack.

While it works perfectly for most cases, for some this is not optimal. In some cases, we can not afford to wait for all the tasks in callstack to complete before execution the async operation. Take an example of API calls, user would want to see the response as soon as the response is ready and not wait for other sync operations to get completed.

Hence, for such cases, a different type of queue calld Micro Task Queue or simply Micro Queue is used, which is differnet from a callback queue. Tasks in microtask quque is proiritzed by the JS Engine.

Instead of waiting for the entire synchronous operations on a call stack to complete, as soon as the current task in execution is completed, the task in microtask quque gets prioritsed and is moved to the callstack.

### Overall Execution steps:

1. Firs, every task (sync or async) is executed line by line, it is initiated in the call stack.
2. Functions (sync or async) are added to the call stack as they're encoutered.
3. Synchronous code executes sequentially.
4. When it encouters async code like Await/Promise or setTimeout, the callback provided is registered and the operation is offloaded to the web api (or c++ api in case of Node)
5. The function that initiated the async operation is removed from the call stack.
6. The calls tack continues with the other sync code if available.
7. When the async operation completed, a callack function assosiated with that operation is placed in the callback queue or the microtask queue (in case of promise)
8. Event loop continously checks for the call stack to be empty or finish execting it's current work before placing the task from the queue to thee call stack.
9. Event loop continously prioritizes the microtask queue.
10. After processing all available microtasks, the event loop checks the callback queue.
11. This process continues as long as there are tasks in either queue.
12. Once both the microtask queue and the callback queue are empty, the JavaScript program has completed its execution.

## Browser vs Other JS Runtime Environment

As we read above, not all the features that we use in our web app are provided by the language natively, rather there are external API's provided by Browser that helps us in executin those code, some of which are:

1. **DOM (Document Object Model) API**
2. **HTML5 Canvas API**
3. **Web Audio API**
4. etc.

But when it comes to Nodejs and other JS runtime, how are things like Async work and other things handled? Since there is no browser involved, who provides the support for additional work?

_Note: Node.js includes the V8 JavaScript engine, which is the same engine used by the Google Chrome web browser to execute the JS code._

Apart form the JS Engine like V8, the Runtime provides other APIs which in case of Nodejs are C++ APIs (Nodejs is written in C++) to help run Async tasks and perform other non native works like:

1. **File System (fs) Module**
2. **HTTP Module**
3. **OS Module**
4. etc.

## Browser Storages
Web storage or browser storage is a mechanism that allws web applications to store data locally in user's browser. 
There are two types of web storages:
1. Session Storage : used for storing data only for a single session.
2. Local Storage : used for storing data for a longer period of time.

### Session Storage
* This is used for storing data that is used only for a single session.
* Typically used to store data like shopping cart data, progress in a game, etc.
* Size is 5MB
### Local Storage
* This is used to storate data for a longer period of time.
* Typically used to store data like user preferences like preferred langauge.
* Size is 5MB

Things like **user credentials** is a subjective matter.  
For a highly sensitive web application, session storage is preferred as the user needs to login on a every new session, whereas for a less sensitive application, local storage is used.

It's important to remember that this storage is provided by the browser and there is no configuration to be done by a user/developer to use this, hence it's super useful for maintaining the state of a web applications.

## IndexedDB
* While webstorage is good for storing small amount of data, when there is a requirement to store a large amount of strucutred data, IndexedDB is preferred.
* IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs.
* As this data storage uses indexes, searching in this storage is faster compared to webstorage.
* IndexedDB is a similar to SQL-based RDBMS.
* Around 80% of your available disk size can be used for storing data.

### Points to remember while deciding the storage type

| Criteria | Web Storage  | Indexed DB
|--|--|--|
| Data Size | Small Data  | Large Data  |
|Data Structure| Key Value | Flexible |
| Retrieval | Simple and Slow | Complex query and fast
| Data Persistance | Lost when cache is cleared | Stored even for offline use
### Sync vs Async Works

Any work that stops the execution of the code and wait's for it to get completed before moving to the next line of code can be called sync work.
Example

```javascript
console.log("123");
alert("Apple");
let sum = 1 + 2;
```

Whereas, in case of async work the execution is initiated and then is set aside for later, meanwhile the remaining code is executed. Once the async work is completed the execution moves back to that work.
Example:

```javascript
await makeAPICall();
makeAPICall().then().catch();
```

Browser makes use of various techniques to efficiently handle both sync and async work as to fully utilizing the single threaded mechanism of JavaScript. Read more in the [JavaScript Runtime](https://github.com/ishwarrimal/frontend-interview-preps/tree/main/Web%20Fundamentals/Basics#javascript-runtime) topic above.
