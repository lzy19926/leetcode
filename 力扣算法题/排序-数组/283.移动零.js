
// 283. 移动零
var moveZeroes = function (nums) {
  let lastNoZero = 0
  let zeroCount = 0

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      nums[lastNoZero] = nums[i]
      lastNoZero++
    } else {
      zeroCount++
    }
  }

  for (let j = 0; j < zeroCount; j++) {
    nums[nums.length - j - 1] = 0
  }

  return nums
};

moveZeroes([0, 1, 0, 3, 12])