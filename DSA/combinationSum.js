/**
 * Finds all unique combinations of candidates that sum up to the target value.
 * @param {number[]} candidates An array of candidate numbers
 * @param {number} target The target sum
 * @returns {number[][]} An array of arrays, where each subarray is a unique combination of candidates that sums up to the target value
 */
function combinationSum(candidates, target) {
    const result = []
    function permute(arr=[], sum=0, idx=0){
        if(sum > target) return;
        if(sum === target) result.push(arr)
        for(let i = idx;i<candidates.length;i++){
            permute([...arr, candidates[i]], sum+candidates[i], i)
        }
    }
    permute()
    return result
}

combinationSum([1,2,3,6,7], 8)
