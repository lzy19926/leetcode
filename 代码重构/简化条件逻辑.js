
// #region -------  1. 分解条件表达式  -------
// 将每个条件判断和条件分支都抽离出来
if (!Date.isBefore(plan.summer) && !Date.isAfter(plan.End))
    charge = quantity * plan.summerRate
else
    charge = quantity * plan.regularRate


// 重构一
if (isSummer())
    charge = summerCharge()
else
    charge = regularCharge()

// 重构二
charge = isSummer()
    ? summerCharge()
    : regularCharge()

const isSummer = (plan) => !Date.isBefore(plan.summer) && !Date.isAfter(plan.End)
const summerCharge = (plan) => quantity * plan.summerRate
const regularCharge = (plan) => quantity * plan.regularRate
// #endregion


// #region -------  2. 防卫语句替代条件表达式  -------
// todo 防卫语句: 条件为真时直接从函数中返回
function test(num) {
    let result;
    if (num === 1) {
        result = 1
    } else if (num === 2) {
        result = 2
    }

    return result
}

function test2(num) {
    if (num === 1) return result = 1  // 可直接将其抽成函数
    if (num === 2) return result = 1
    if (num === 3) return result = 1
}
// #endregion


// #region -------  3.以多态类取代条件表达式  -------
function getColorIdx(color) {
    switch (color.type) {
        case "Green":
            return 1
        case "Blue":
            return 2
        default:
            return "unknow"
    }
}

class GreenColor {
    get index() { return 1 }
}
class BlueColor {
    get index() { return 2 }
}
// #endregion



// #region -------  4.引入断言  -------
// 例子, 平方根只有正值才能运行
// 使用断言而非注释可以增加代码可读性
assert(num >= 0)
const res = Math.sqrt(num)
// #endregion
