/**
* A custom implementation of a local storage system that mimics the 
* behavior of the Web Storage API's localStorage object. 
* This class provides a simple way to store and retrieve 
* key-value pairs with an optional expiration time.
**/
class MyLocalStorage {
    constructor(){
        this.storage = new Map()
    }
    setItem(key, val, expiration){
        this.storage.set(key, val)
        setTimeout(() => {
            this.storage.delete(key)
        }, expiration)
    }
    getItem(key){
        return this.storage.get(key) || undefined
    }
}

const myLocalStorage = new MyLocalStorage();

myLocalStorage.setItem('name', 'Ish', 2000)
myLocalStorage.setItem('age', '31', 1000)

console.log(myLocalStorage.getItem('age'))
setTimeout(() => {
    console.log(myLocalStorage.getItem('age'))
     console.log(myLocalStorage.getItem('name'))
}, 1500)
