/**
mySetInterval
A custom implementation of the setInterval function that allows for a dynamic delay between executions.
@param {Function} func The function to be executed at each interval.
@param {Number} delay The initial delay before the first execution.
@param {Number} period The period to add to the delay for each subsequent execution.
@returns {Object} An object containing the timer ID, which can be used to clear the interval. 
*/
function mySetInterval(func, delay, period) {
  let count = -1;
  let timerId = {}
  function inner(){
    count++
    clearTimeout(timerId.val)
    timerId.val = setTimeout(() => {
        console.log('inner wala -> ', timerId)
      func()
      inner();
    }, delay+period*count)
    return timerId
  }
  return inner();
}

/**
 * @param { number } id
 */
function myClearInterval(id) {
    console.log('clear wala -> ', id)
  clearTimeout(id.val)
}


let prev = Date.now()
const func = () => {
  const now = Date.now()
  console.log('roughly ', Date.now() - prev)
  prev = now
}

const id = mySetInterval(func, 100, 200)


setTimeout(() => {
    console.log('clear wala -> ', id)
    myClearInterval(id)
}, 2000)
