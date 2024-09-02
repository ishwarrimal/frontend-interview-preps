/**
 * Finds the index of the balance point in an array, where the sum of elements on the left is equal to the sum of elements on the right.
 * Returns the index of the balance point if found, or -1 if no balance point exists.
 * @param {number[]} arr The input array
 * @returns {number} The index of the balance point, or -1 if not found
 */
function findBalancePoint(arr){
    const total = arr.reduce((a,b) => a+b) //find the total sum
    let leftSum = arr[0]; //maintain a leftSum with initial value as arr[0]
    //the idea is to start checking from 1st index compare leftSum with rightSum
    for(let i=1;i<arr.length;i++){
        let a = arr[i]
        if(leftSum === total - leftSum - a){
            return i
        }
        leftSum += a
    }
    return -1
}

console.log(findBalancePoint([1,2,3,4,6]))
