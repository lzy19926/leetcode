
// 给你一个整数数组 nums ，判断是否存在三元组 [nums[i], nums[j], nums[k]] 满足 i != j、i != k 且 j != k ，同时还满足 nums[i] + nums[j] + nums[k] == 0 。请

// 你返回所有和为 0 且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。
// 输入：nums = [-1,0,1,2,-1,-4]
// 输出：[[-1,-1,2],[-1,0,1]]


//! ------------------
// 关键点  三数去重 
// 先进行排序,三数按从大到小的顺序排列, 即可方便去重, 
// 三元数组的顺序由大到小, 用于去重。
// 三层for循环, 依次找到三个数字,进行计算

var threeSum = function (nums) {
    // 原数组由大到小排序
    const newMuns = nums.sort((a, b) => a - b)

    let a
    let b
    let c
    const length = newMuns.length
    let resList = []

    // 三重for循环找到三元数组
    let prevA
    for (let i1 = 0; i1 < length; i1++) {
        if (newMuns[i1] == prevA) continue // 记录上一次的A B C 如果上一次的A等于本次A,跳过此次循环
        a = newMuns[i1]
        prevA = newMuns[i1]

        let prevB
        for (let i2 = i1 + 1; i2 < length; i2++) {
            if (newMuns[i2] == prevB) continue
            b = newMuns[i2]
            prevB = newMuns[i2]

            // 先计算出a+b 过滤不符合的c值
            let mix = a + b
            let prevC
            for (let i3 = i2 + 1; i3 < length; i3++) {
                if (newMuns[i3] == prevC) continue
                if (newMuns[i3] > -mix) break
                c = newMuns[i3]
                prevC = newMuns[i3]

                // 找到abc 计算和
                let res = a + b + c
                count++
                if (res === 0) {
                    resList.push([a, b, c])
                }
            }
            prevC = undefined
        }
        prevB = undefined
    }
    prevA = undefined

    return resList
};

threeSum([0, 0, 0, 0])
threeSum([1, -1, -1, 0])
threeSum([-1, 0, 1, 2, -1, -4])