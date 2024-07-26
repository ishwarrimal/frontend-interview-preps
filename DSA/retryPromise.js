/**

retry
A function that retries a given function a specified number of times with a delay between retries.
@param {Function} fn The function to be retried.
@param {Number} delay The delay in milliseconds between retries.
@param {Number} times The maximum number of times to retry the function.
@returns {Promise} A promise that resolves with the result of the function if it succeeds, or rejects with the error if all retries fail.
This function is useful for handling scenarios where a function may fail temporarily, such as network requests or database operations. 
It allows you to specify a delay between retries and a maximum number of retries, making it a robust way to handle failures. 
*/
function retry(fn, delay, times){
    let curTimes=0;
    let timerId;
    return new Promise((resolve, reject) => {
        function helper(){
            curTimes++
            timerId = setTimeout(() => {
                fn()
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    console.log('Reject ho raha')
                    if(curTimes >= times){
                        reject(err)
                    }else{
                        clearTimeout(timerId)
                        helper();
                    }
                })
            }, delay)
            
        }
        helper()
    })
}

let count = 0
function myFunc(){
    return new Promise((res, rej) => {
        count++
        setTimeout(() => {
            if(count === 3){
                res('Resolved')
            }
            rej('Rejected')
        },1000)
    })
}

retry(myFunc, 1000, 5).then(res => console.log(res)).catch(err => console.log({err}))
