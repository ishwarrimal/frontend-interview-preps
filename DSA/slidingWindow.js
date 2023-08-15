//Whenver we've to find contigious subarry, use this method
//1. Max sum subarray of size k
//2. Smallest subarry from a given set
//3. Fruits in a basket
//4. Longest substring

//1. Max sum subarray of size k

function getMaxSum(arr, k) {
  let sum = 0;
  let start = 0;
  let maxSum = 0;
  for (let i = 0; i < arr.length - k + 1; i++) {
    sum += arr[i];
    if (i >= k) {
      maxSum = Math.max(sum, maxSum);
      sum -= arr[start];
      start++;
    }
  }
  return maxSum;
}

getMaxSum([2, 1, 5, 1, 3, 2], 7);

// 2. Find the smallest subarray from a given set
// Input: [2, 1, 5, 2, 3, 2], S=7
// Output: 2
// Explanation: The smallest subarray with a sum great than or equal to '7' is [5, 2].

function smallestSubarray(arr, k) {
  let sum = 0;
  let minLength = Infinity;
  let start = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
    while (sum >= k) {
      minLength = Math.min(minLength, i - start + 1);
      sum -= arr[start];
      start++;
    }
  }
  if (minLength === Infinity) return 0;
  return minLength;
}

console.log(smallestSubarray([3, 4, 1, 1, 6], 8));

//3. Fruits in a basket
// Given an array of characters where each character represents a fruit tree,
// you are given two baskets and your goal is to put maximum number of fruits in each basket.
// The only restriction is that each basket can have only one type of fruit.
// Input: Fruit=['A', 'B', 'C', 'A', 'C']
// Output: 3
// Explanation: We can put 2 'C' in one basket and one 'A' in the other from the subarray ['C', 'A', 'C']

function fruitsInBasket(arr) {
  let maxFruits = 0;
  let start = 0;
  let fruitArr = {};
  for (let i = 0; i < arr.length; i++) {
    const curFruit = arr[i];
    if (!(curFruit in fruitArr)) {
      fruitArr[curFruit] = 0;
    }
    fruitArr[curFruit] += 1;
    while (Object.keys(fruitArr).length > 2) {
      console.log(fruitArr);
      const leftFruit = arr[start];
      fruitArr[leftFruit]--;
      if (fruitArr[leftFruit] == 0) {
        delete fruitArr[leftFruit];
      }
      console.log(fruitArr);
      start++;
    }

    maxFruits = Math.max(maxFruits, i - start + 1);
  }
  return maxFruits;
}

console.log(fruitsInBasket(["A", "B", "C", "B", "B", "C"]));

//Longest substring
// Input: String="aabccbb"
// Output: 3
// Explanation: The longest substring without any repeating characters is "abc".

function longestSubstring(str) {
  let maxLen = 0;
  let start = 0;
  let charIndexMap = {};
  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char in charIndexMap) {
      start = Math.max(start, charIndexMap[char] + 1);
    }
    charIndexMap[char] = i;
    maxLen = Math.max(maxLen, i - start + 1);
  }
  return maxLen;
}

console.log(longestSubstring("aabaab!bb"));
