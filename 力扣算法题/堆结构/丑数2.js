

// 丑数2
// https://leetcode.cn/problems/ugly-number-ii/

var nthUglyNumber = function (n) {
    // 小根堆BFS遍历  记录丑数数量
    if (n == 1) return 1

    const queue = [1]
    const numSet = new Set()
    numSet.add(1)
    // 得到第n个丑数需要执行n此循环
    // 每次都会往队列添加三个数
    for (let i = 0; i < n; i++) {
        const x = queue[i]

        let a = 2 * x
        let b = 3 * x
        let c = 5 * x

        if (!numSet.has(a)) {
            queue.push(a)
            numSet.add(a)
        }
        if (!numSet.has(b)) {
            queue.push(b)
            numSet.add(b)
        }
        if (!numSet.has(c)) {
            queue.push(c)
            numSet.add(c)
        }
        // 需要将列表排序,生成下一个x，(这里封装最小堆更快)
        queue.sort((a, b) => a - b)

    }

    return queue[n - 1]
};

console.log(nthUglyNumber(4));



const os = require('os');
console.log(os.totalmem() / 1024 / 1024 / 1024); // 打印出系统内存总大小（以字节为单位）