
// #region -------  1.分离查询函数和修改函数  -------
// 查询函数(一个函数只提供值, 而没有其他副作用, 这样的函数很关键, 可以复用)

// TODO 一个有副作用的函数
function getNumAndChange() {
    const num = this.count * 3 + 1
    changeNum(num)
    return num
}
// todo 拆分
function getNum() {
    return this.count * 3 + 1
}

function changeNum(num) {
    this.num = num
}
// #endregion


// #region -------  2.移除标记参数  -------
// todo 标记参数: 影响函数的控制流的tag参数
function setAgeOrName(tag, value) {
    if (tag === "age") {
        this.age = value
    } else if (tag === "name") {
        this.name = value
    }
}

function setAge(value) { this.age = value }
function setName(value) { this.name = value }
// #endregion


// #region -------  3.保持对象完整  -------
// 如果从一个结构中取几个值并传递给一个函数, 不如直接传递整个结构引用
const name = person.name
const age = person.age
caculate(name, age)

// todo 直接传整个结构
caculate(person)
// #endregion


// #region -------  4.以命令取代函数  -------
// 命令是单词的函数调用,封装一个函数为命令对象,
// 实例化的命令对象一般保存了其所用的参数,
// 命令对象可支持附加操作  如撤销命令
function getSum(a, b) { return a + b }

class GetSum {
    constructor(a, b) {
        this.a = a
        this.b = b
    }

    cancel() { }  // 执行撤销逻辑

    execute() { return this.a + this.b }
}
// #endregion