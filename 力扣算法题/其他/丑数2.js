

// 丑数2
// https://leetcode.cn/problems/ugly-number-ii/

var nthUglyNumber = function (n) {
    // 小根堆BFS遍历  记录丑数数量
    if (n == 1) return 1

    const queue = [1]
    const numSet = new Set()
    let i = 0
    numSet.add(1)

    while (numSet.size <= n) {
        const x = queue.shift()
        queue.push(2 * x, 3 * x, 5 * x)
        queue.sort((a, b) => a - b)
        numSet.add(2 * x)
        numSet.add(3 * x)
        numSet.add(5 * x)
    }
    debugger
    return Array.from(numSet).sort((a, b) => a - b)[n - 1]

};

console.log(nthUglyNumber(4));