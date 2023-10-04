# CSS - Basics

This document covers fundamental `CSS` concepts and provides simple solutions to common styling tasks.

## Table of Content
- [CSS - Basics](#css---basics)
  - [Table of Content](#table-of-content)
  - [How to Center a Div](#how-to-center-a-div)
    - [1. Center a div horizontally](#1-center-a-div-horizontally)
    - [2. Center a div vertically](#2-center-a-div-vertically)
    - [3. Center a div both horizontally and vertically](#3-center-a-div-both-horizontally-and-vertically)


## How to Center a Div
To center a `div` we will have some arrangements. Like we must have an **item**(a child `div`) that should be center in some **container**(a parent `div`).  
```html
<div class="container">
    <div class="item"></div>
</div>
```
We need to make sure the `div` (child/item) is positioned correctly within its surrounding container (parent/container).There are three ways to achieve this alignment. Below are the simplified methods for each:

### 1. Center a div horizontally
This means making the `div` appear in the middle of the container from left to right. You can center a `div` horizontally using one of the following methods:
1. Using `Flexbox`
   ```css
   .container{
    display: flex;
    justify-content: center;
   }
   ```

2. Using `margin-left` and `margin-right`
    ```css
    .item{
        margin: 0 auto;
    }
    ```

3. Using text alignment and inline blocks
   ```css
   .container{
    text-align: center;
   }
   .item{
    display: inline-block;
   }
   ```

4. Using `position: absolute;` and `left: 50%;` with a negative margin:
   ```css
   .container{
    position: relative;
   }
   .item{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
   }
   ```

### 2. Center a div vertically
This means making the `div` appear in the middle of the container from top to bottom. To center a `div` vertically, you can choose from the following:

1. Using `flexbox`
    ```css
    .container{
        display: flex;
        align-items: center;
    }
    ```

2. Using `position: absolute;` and `top: 50%;` with a negative margin:
   ```css
   .container{
    position: relative;
   }
   .item{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
   }
   ```

3. Using `Flexbox` with `margin-top: auto;` and `margin-bottom: auto;`:
   ```css
    .container{
        display: flex;
        flex-direction: column;
    }
    .item{
        margin: auto 0;
    }
    ```

### 3. Center a div both horizontally and vertically
This means placing the `div` at the exact center of the container in both horizontal and vertical directions. To center a `div` in both directions, you can choose from the following:

1. Using `flexbox`
    ```css
    .container{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    ```

2. Using `position: absolute`; and `top: 50%;` with `left: 50%;` and negative margins:
    ```css
    .container{
        position: relative;
    }
    .item{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    ```

3. Using `Grid`
    ```css
    .container{
        display: grid;
        place-items: center;
    }