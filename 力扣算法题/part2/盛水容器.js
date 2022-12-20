

var maxArea = function (height) {
    // 双指针法,依次计算, 每次移动数字(高度)较小的指针
    let maxRes = 0
    let i = 0
    let j = height.length - 1

    while (i !== j) {
        // 计算体积
        let h = height[i] <= height[j] ? height[i] : height[j]
        let w = j - i
        let res = h * w

        if (res > maxRes) {
            maxRes = res
        }

        // 小数字的指针往内移动
        if (height[i] > height[j]) {
            j--
        } else if (height[i] < height[j]) {
            i++
        } else {
            i++
        }
    }
    console.log(maxRes);
    return maxRes
};


maxArea([1, 1])