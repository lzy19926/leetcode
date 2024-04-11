

// 128 最长连续序列
// 使用hash表记录每个数字的最长连续序列, 达到复用效果
var longestConsecutive = function (nums) {
  // 初始化hash表
  let hashMap = {}
  nums.forEach(v => {
    hashMap[v] = 0
  })

  let numsSet = new Set(nums)

  for (let i = 0; i < nums.length; i++) {
    // 遍历nums,检查能否拼接序列
    if (hashMap[nums[i]] > 0) continue // 过滤掉已计算过的值

    for (let j = nums[i]; j < nums[i] + nums.length; j++) {
      if (numsSet.has(j)) { // 如果有记录的结果直接使用
        if (hashMap[j] > 0) {
          hashMap[nums[i]] += hashMap[j]
          break
        } else {
          hashMap[nums[i]]++ // 无记录直接++
        }
      } else {
        break
      }
    }
  }

  console.log(hashMap);
  // 获取最大值
  let res = 1
  for (let key in hashMap) {
    if (hashMap[key] > res) {
      res = hashMap[key]
    }
  }

  return res
};
// longestConsecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1])


// 128 最长连续序列
// 使用hash表记录每个数字的最长连续序列, 达到复用效果
// 如[100,4,200,1,3,2]  遍历每个数字, 往后枚举X+1
// 100 x x x x x
// 4   x x x x x
// 200 x x x x x
// 1 2 3 4 --->遇到4 拼接4记录的序列
function longestConsecutive2(nums) {
  const cache = new Map()
  const numsSet = new Set(nums)
  for (let i = 0; i < nums.length; i++) {

    let queue = []

    for (let j = nums[i]; j < nums[i] + nums.length; j++) {
      if (cache.has(j)) {
        let part2 = cache.get(j)
        queue = queue.concat(cache.get(j))
        j = part2[part2.length - 1]
      } else {
        if (numsSet.has(j)) {
          queue.push(j)
        }
      }
    }

    cache.set(nums[i], queue)
  }


  let maxLength = 0
  for (let [key, value] of cache) {
    maxLength = Math.max(value.length, maxLength)
  }
  return maxLength
}

console.log(longestConsecutive2([0,3,7,2,5,8,4,6,0,1]));
