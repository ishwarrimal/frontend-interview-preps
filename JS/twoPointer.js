// mostly applied for a sorted array or LL
//The idea is to have two pointers, one at first and the other at last and either increment the left or decremene the right
//1. Pair of elements whose sum equals target
//2. 3sum === 0
//3. 3sum closest to the target
//4. Triplets with Smaller Sum

//1. Pair of elements whose sum equals target
function getPair(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum == target) {
      return [left, right];
    } else if (sum > target) right--;
    else left++;
  }
  return false;
}
getPair([1, 3, 4, 6, 7], 10);

//2. 3Sum
function threeSum(arr) {
  const result = [];
  arr = arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length - 2; i++) {
    if (i == 0 || (i > 0 && arr[i] !== arr[i - 1])) {
      const req = 0 - arr[i];
      let left = i + 1;
      let right = arr.length - 1;
      while (left < right) {
        const sum = arr[left] + arr[right];
        if (sum + req === 0) {
          result.push([i, left, right]);
        } else if (sum > req) {
          right--;
        } else {
          left++;
        }
      }
    }
  }
  return result;
}

//3. threeSum closest to the target
// Input: [1, 0, 1, 1], target=3
// Output: 3
// Explanation: The triplet [1, 1, 1] has the closest sum to the target.
function threeSumClosest(nums, target) {
  let maxSum = 0;
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[left] + nums[right] + nums[i];
      if (sum > maxSum && sum <= target) {
        maxSum = sum;
        left++;
        right--;
      } else if (sum > maxSum) {
        right--;
      } else {
        left++;
      }
    }
  }
  return maxSum;
}
console.log(threeSumClosest([1, 0, 1, 1], 50));

//4. Triplets with smaller sum
// Input: [-1, 0, 2, 3], target=3
// Output: 2
// Explanation: There are two triplets whose sum is less than the target: [-1, 0, 3], [-1, 0, 2]
function tripletWithSmallerSum(nums, target) {
  let count = 0;
  nums = nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      if (nums[i] + nums[left] + nums[right] < target) {
        count += right - left;
        left++;
      } else {
        right--;
      }
    }
  }
  return count;
}
console.log([-1, 0, 2, 3], 3);

//5. Dutch National Flag
function dutchNationalFlag(arr) {
  let i = 0;
  let high = arr.length - 1;
  let low = 0;
  while (i < high) {
    if (arr[i] === 0) {
      [arr[low], arr[i]] = [arr[i], arr[low]];
      low++;
    }
    if (arr[i] === 2) {
      [arr[i], arr[high]] = [arr[high], arr[i]];
      high--;
    }
    i++;
  }
  return arr;
}

console.log(dutchNationalFlag([1, 2, 0, 0, 1, 2, 2, 1, 1, 0]));
