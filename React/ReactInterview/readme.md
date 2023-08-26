# React

React is a JavaScript library for building user interfaces. It was developed by Facebook and released as an open-source project. React is primarily used for building single-page applications (SPAs) and mobile applications, although it can also be used for creating specific components within larger web applications.

## Why React?

React has following advantage over traditional way of building web apps.

1. **Component based architecture**
   - Modular code.
   - Reusability.
   - Self contained elements that encapsulates their own logic and UI.
   - Easeir to test and maintain.
2. **JSX**
   - Closely resembels HTML.
   - Better way to handle UI Logic.
3. **Virtual DOM**
   - Efficiently update the DOM.
   - Minimise expensive dom manipulation by first updating the virtual DOM.
4. **Unidirection data flow**
   - Data flows from parent to the children.
5. **State Management**
   - State management for larger applicaiton is very difficult in traditional applications.
   - Easier to manage the state of the applcation with React.
6. **Developer Ecosystem**
   - Numerous tutorials available.
   - Numerous libraries available.
7. **React Native**
   - Use react skills to build mobile app using React Native.

## JSX vs JS

Not a valid comparison as JSX is only limited to React ecosystem while JS is a programming language supported by all the browser and JS Runtime like Nodejs.
JSX is a syntax extension that simplifies the creation of user interfaces in React by allowing developers to write HTML-like code within their JavaScript files.
**JSX (JavaScript XML):**

1.  **Syntax:** JSX is a syntax extension for JavaScript that allows you to write HTML-like code within your JavaScript files. It's used to describe the structure and layout of user interfaces in React components.
2.  **Readability:** JSX can make code more readable and intuitive, as it closely resembles the structure of the UI. This can be particularly helpful when building complex user interfaces.
3.  **Component Rendering:** JSX is used to define the UI components and their hierarchy in React. When you write JSX, it gets transpiled into JavaScript code that creates and updates the corresponding DOM elements.
4.  **Integration with React:** JSX is the recommended way to define UI elements in React. It allows you to combine JavaScript logic and UI presentation in a single file.

```javascript
const element = <h1>Hello, JSX!</h1>;
```

**JavaScript (JS):**

1.  **Syntax:** JavaScript is a programming language that provides the core functionality for web development. It's used to handle logic, data manipulation, and interactions in a web application.
2.  **Programming Logic:** JavaScript is used to implement the logic and behavior of your web application. This includes handling user input, making API requests, managing data, and more.
3.  **Manipulating the DOM:** JavaScript is used to directly manipulate the Document Object Model (DOM) of a web page. It can be used to add, modify, or remove elements from the page in response to user actions or other events.
4.  **Integration with JSX:** While JSX is used to define the structure of UI components, JavaScript is used to provide the functionality and behavior of those components. JSX and JavaScript are often used together within React components.

```javascript
const name = "JS";
const greeting = "Hello, " + name + "!";
```
