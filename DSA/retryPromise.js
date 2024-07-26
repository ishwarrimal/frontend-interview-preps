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
