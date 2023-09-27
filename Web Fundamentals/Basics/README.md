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
Event loop in particulra is a fundamental concept that is responsible for the execution of asynchronous code by continuously checking the callback qu...(Ruko Jara, Sabar Karo) but before going deeper into that, let's first understand what is a JavaScript runtime.

## JavaScript Runtime

Runtime is nothing but an environment in which the program runs. And any environment having the capability to run a JavaScript code is a JS runtime. To understand what a JavaScript Runtime is, please read [this short article](https://ishwar-rimal.medium.com/a-javascript-runtime-what-is-it-1b3aa5514aa4)
In the context of this article, we will be discussin only about how the working of JS Runtime.
A JS runtime has following component to it:

1. Call Stack.
2. Memory Heap.
3. Web APIs.
4. Callback/Task Queue.
5. Event Loop.
6. Microtask and Promise Queue.
