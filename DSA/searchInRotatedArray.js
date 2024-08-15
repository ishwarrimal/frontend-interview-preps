/**
* Function to find the index of an item in a sorted array which is rotated
*/
function serachInRotatedArray(nums,target){
    let left = 0;
    let right = nums.length - 1
    while(left <= right){
        const mid = Math.floor((left + right) /2)
        if(nums[mid] === target) return mid
        if(nums[mid] < nums[right]){
            if(target > nums[mid] && target <= nums[right]){
                left = mid+1
            }else{
                right = mid
            }
        }else{
            if(target > nums[mid] || target <= nums[right]){
                left = mid+1
            }else{
                right = mid
            }
        }
    }
}

console.log(serachInRotatedArray([5,7,8,12,1,3,4], 4))
