
// 88.合并两个有序数组
// 思路 双指针


var merge = function (nums1, m, nums2, n) {

  let idx_1 = 0
  let idx_2 = 0
  let result = []


  while (true) {
    let left = nums1[idx_1]
    let right = nums2[idx_2]

    if (idx_1 === m && idx_2 === n) break
    // 左指针小
    if (left <= right) {
      if (idx_1 < m) {
        result.push(left)
        idx_1++
      } else {
        result.push(right)
        idx_2++
      }
      // 右指针小
    } else {
      if (idx_2 < n) {
        result.push(right)
        idx_2++
      } else {
        result.push(left)
        idx_1++
      }
    }
  }

  return result
};


let nums1 = [1, 2, 3, 0, 0, 0], m = 3, nums2 = [2, 5, 6], n = 3;
let res = merge(nums1, m, nums2, n)


console.log(res);
