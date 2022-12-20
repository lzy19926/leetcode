

var trap = function (height) {
    // 计算最高值并计算height数组之和
    let maxHeight = 0
    let filled = 0
    height.forEach((v) => {
        if (v > maxHeight) {
            maxHeight = v
        }
        filled += v
    })

    // 逐行扫描, 计算出start-end之间的格子
    let total = 0
    for (let h = maxHeight; h > 0; h--) {
        let resList = []
        let start = 0
        let end = 0

        // 找到start点
        for (let i = 0; i < height.length; i++) {
            if (height[i] < h) continue
            if (height[i] >= h) {
                start = i
                break
            }
        }

        // 找到end点
        for (let i = height.length - 1; i > 0; i--) {
            if (height[i] < h) continue
            if (height[i] >= h) {
                end = i
                break
            }
        }

        let lineCount = end - start + 1
        total += lineCount
    }

    // 数组之和(已经占据的格子) 减去start-end之间的格子数量
    console.log(total, filled);
    return total - filled
};

trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])