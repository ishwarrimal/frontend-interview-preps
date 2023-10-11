/**
 * Binary Search is applied to a sorted array or list. It's a divide-and-conquer algorithm that efficiently
 * finds the position of a target element in the array.
 * Binary Search is a highly efficient algorithm for searching in sorted data,
 * with a time complexity of O(log n), where n is the size of the array.
 *
 * @param {number[]} arr - The sorted array to search in.
 * @param {number} target - The target element to search for.
 * @returns {number} - The index of the target element if found, or -1 if not found.
 */
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
      const mid = Math.floor((left + right) / 2);

      if (arr[mid] === target) {
          // If the middle element is equal to the target, we found it.
          return mid;
      } else if (arr[mid] < target) {
          // If the middle element is less than the target, the target must be in the right half.
          left = mid + 1;
      } else {
          // If the middle element is greater than the target, the target must be in the left half.
          right = mid - 1;
      }
  }

  // If we reach this point, the target is not in the array.
  return -1;
}

// Usage
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const target = 5;

const result = binarySearch(sortedArray, target);

if (result !== -1) {
  console.log(`Target ${target} found at index ${result}.`);
} else {
  console.log(`Target ${target} not found in the array.`);
}

/**
* Find Peak Element:
* A peak element is an element that is strictly greater than its neighbors.
* Given a 0-indexed integer array nums, find a peak element, and return its index.
* If the array contains multiple peaks, return the index to any of the peaks.
*
* You may imagine that nums[-1] = nums[n] = -∞.
* In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.
*
* @param {number[]} nums - The input array.
* @returns {number} - The index of the peak element.
*/
var findPeakElement = function(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
      let mid = Math.floor((left + right) / 2);

      if (nums[mid] > nums[mid + 1]) {
          // We are in the decreasing part of the array.
          right = mid;
      } else {
          // We are in the increasing part of the array.
          left = mid + 1;
      }
  }
  return left;
};

console.log(findPeakElement([1, 2, 3, 1]));

/**
* Search a 2D Matrix:
* Given an m x n integer matrix matrix with the following two properties:
* - Each row is sorted in non-decreasing order.
* - The first integer of each row is greater than the last integer of the previous row.
* Given an integer target, return true if target is in matrix or false otherwise.
*
* @param {number[][]} matrix - The 2D matrix to search in.
* @param {number} target - The target element to search for.
* @returns {boolean} - True if the target is found, false otherwise.
*/
var searchMatrix = function(matrix, target) {
  let m = matrix.length;
  let n = matrix[0].length;
  let low = 0;
  let high = m - 1;
  let targetRowIndex = -1;

  while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (matrix[mid][n - 1] == target)
          return true;

      if (target > matrix[mid][n - 1])
          low = mid + 1;
      else {
          targetRowIndex = mid;
          high = mid - 1;
      }
  }

  if (targetRowIndex == -1)
      return false;

  low = 0;
  high = n - 1;

  while (low <= high) {
      let mid = Math.floor((low + high) / 2);

      if (matrix[targetRowIndex][mid] == target)
          return true;

      if (target > matrix[targetRowIndex][mid])
          low = mid + 1;
      else
          high = mid - 1;
  }

  return false;
};

let matrix = [[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]];
let k = 7;
console.log(searchMatrix(matrix, k));
