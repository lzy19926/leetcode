//  -------  1. 搬移函数  -------
// -不同语言的模块化机制不同, 但模块的共同点是他们为函数提供了一个独立的上下文环境
// -你在函数内部定义的帮助函数, 在别的地方也可能用到,此时应该将其搬移到更通用的地方


// #region -------  2. 定义函数组  -------
// 函数内的子函数组应该放在代码逻辑的下方, 下方的无效代码会被删除 但函数不会
//! 注意 一组子函数组最好将其放到全局  并使用模块化, 嵌套子函数不是好行为 应搬移
function add() {
    const res = getNum() + getCount()
    return res

    function getNum() { }
    function getCount() { }
}
// #endregion


// #region -------  3. 搬移字段  -------
// 将相关字段聚合到对应的类中   用于对后续更大的重构做准备
class Customer {
    constructor() {
        // this._discountRate = 0.3
    }
}

class CustomerContract {
    constructor() {
        this._discountRate = 0.3
    }
}
// #endregion


// #region -------  4. 拆分函数并区别  -------
// 原先一个函数可以被两个点调用, 但现在两个调用点需要有逻辑区别
function add() {
    const a = 1 + 1
    const b = 2 + 2
    const c = 3 + 3
}

function foo() {
    add()
}

function bar() {
    add()
}


function add_2() {  // 此时需要将不变的东西保留, 变化的东西单独定义
    const a = 1 + 1
    const b = 2 + 2
}

function foo_2() {
    add_2()
    const c = 3 + 3
}

function bar_2() {
    add_2()
    const d = 4 + 4
}
// #endregion


// #region -------  5. 拆分循环  -------//todo 重要
// 身兼多职的循环并不一定好   因为他们一次做了两三件事情, 不必要为了这点性能破坏语义化
let totalAge = 0
let totalSalary = 0
for (const p of people) {
    totalAge += p.age
    totalSalary += p.salary
}


let totalAge_2 = 0
for (const p of people) {
    totalAge_2 += p.age
}

let totalSalary_2 = 0
for (const p of people) {
    totalSalary_2 += p.salary
}
// #endregion


// #region -------  6. 以管道取代循环  -------//todo 重要
// 通过管道运算 提高可读性
const names = []
for (const i of input) {
    if (i.job === "程序员" && i.age <= 35) {
        names.push(i.name)
    }
}

const names_2 = input                // 可通过filter+map组合出pipline语法
    .filter(i => i.job === "程序员") // 先过滤出程序员
    .map(i => i)                    // 再将这些人推入数组
    .filter(i => i.age <= 35)       // 再过滤出35岁以下的
    .map(i => i)                    // 再将这些人推入数组
// #endregion
