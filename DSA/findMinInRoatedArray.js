/**
 * Finds the minimum element in a rotated sorted array.
 *
 * @param {number[]} nums - The rotated sorted array.
 * @returns {number} The minimum element in the array.
 *
 * The input array is assumed to be a rotated sorted array, where the array is
 * sorted in ascending order, but then rotated (shifted) some number of positions.
 * For example, `[4, 5, 6, 7, 1, 2]` is a rotated sorted array.
 *
 * This function uses a binary search approach to find the minimum element in
 * O(log n) time complexity.
 */
function findMin(nums){
    let left = 0;
    let right = nums.length-1
    while(left < right){
        const mid = Math.floor((right + left)/ 2)
        if(nums[mid] > nums[right]){
            left = mid+1
        }else{
            right = mid
        }
    }
    return nums[left]
}
