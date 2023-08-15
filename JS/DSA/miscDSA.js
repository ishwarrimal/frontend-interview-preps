//Rotate array in k places
// first rotate the entire Array,
// second, rotate from 0 to k-1
// third, rotate from k to len-1
let arr = [1, 2, 3, 4, 5, 6];
function reverseK(arr, k) {
  function helper(start, end) {
    while (start < end) {
      [arr[start], arr[end]] = [arr[end], arr[start]];
      start++;
      end--;
    }
  }

  helper(0, arr.length - 1);
  helper(0, k - 1);
  helper(k, arr.length - 1);
}

//Second largest in an array
function secondLargest(arr) {
  let largest = -Infinity;
  let second = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > largest) {
      second = largest;
      largest = arr[i];
    } else if (arr[i] != largest && arr[i] > second) {
      second = arr[i];
    }
  }
  return second;
}

//Maxsubarray
//i/p [5,-4,-2,6,-1];
//o/p = 6-1=5
function maxSubArray(arr) {
  let max = 0;
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    if (max > sum) {
      max = sum;
    }
    if (sum < 0) {
      sum = 0;
    }
  }
  return max;
}

//Max Profit
// ip [7,1,5,3,6,4]
// op: 5 because 6-1 = 5
function maxProfit(arr) {
  let max = 0;
  let i = 0;
  let j = i + 1;
  while (j < arr.length) {
    if (arr[j] > arr[i]) {
      const p = arr[i] - arr[i];
      max = Math.max(p, max);
    } else {
      i = j;
    }
    j++;
  }
  return max;
}

//Max Sum of K places
function maxSumOfKPlaces(arr, k) {
  let max = 0;
  let sum = 0;
  let i = 0;
  let j = 0;
  while (j < arr.length) {
    sum += arr[j];
    if (j >= k - 1) {
      max = Math.max(sum, max);
      sum -= arr[i];
      i++;
    }
    j++;
  }
  return max;
}
findMaxSumOfKPlaces([100, 200, 300, 400, 200], 2);

//Max tapped water
function maxTrappedWater(arr) {
  //Tow pointer, left and right
  let l = 0;
  let r = arr.length - 1;
  let max = 0;
  while (l < r) {
    //Find the minimum height between two elements
    const min = Math.min(arr[l], arr[r]);
    //Use the min height and multiply with the distance (r-l)
    const area = min * (r - l);
    max = Math.max(area, max);
    //move the pointer for whichever height is smaller
    arr[l] < arr[r] ? l++ : r--;
  }
  return max;
}
console.log(findMaxTappedWater([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]));

//Sort zeros and ones
// IP: [0,1,0,0,1,1]
// OP: [0,0,0,1,1,1]
function sortZerosAndOnes(arr) {
  //Tow pointers, left and right
  let l = 0;
  let r = arr.length - 1;
  while (l < r) {
    //assumpiton: l should always have 0, r shold always have 1, if not swap
    if (arr[l] == 0) l++;
    else if (arr[r] == 1) r--;
    else [arr[l], arr[r]] = [arr[r], arr[l]];
  }
  return arr;
}

//Merge two arrays
function mergeTowArrays(arr1, arr2) {
  let reslt = [];
  //compare the 0th index of both arr and remove the smallest and push on reuslt
  //Do this till one of the array is empty
  while (arr1.length && arr2.length) {
    const val = arr1[0] < arr2[0] ? arr1.shift() : arr2.shift();
    result.push(val);
  }
  while (arr1.length) {
    result.push(arr1.shift());
  }
  while (arr2.length) {
    result.push(arr2.shift());
  }
  return result;
}

//Find Max in rotated array
//IP : [3,4,5,1,2]
//OP: 5
function findMaxInArray(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return nums[left];
}
console.log(findMaxInArray([3, 4, 5, 1, 2]));

//Find Min in rotated array
//IP : [3,4,5,1,2]
//OP: 1
function findMinInArray(nums) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return nums[left];
}
console.log(findMinInArray([3, 4, 5, 1, 2]));

var lengthOfLongestSubstring = function (s) {
  let set = new Set();
  let left = 0;
  let maxSize = 0;

  if (s.length === 0) return 0;
  if (s.length === 1) return 1;

  for (let i = 0; i < s.length; i++) {
    while (set.has(s[i])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[i]);
    maxSize = Math.max(maxSize, i - left + 1);
  }

  return maxSize;
};
