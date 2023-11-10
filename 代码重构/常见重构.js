
// -------  1. 提炼函数  -------
// -------  2. 内联(合并)函数  -------


// #region -------  3. 引入解释型变量  -------
function before() {
    return (a + b - c / 3)
}

function after() {
    const basePrice = a + b
    const discount = c / 3
    return basePrice - discount
}
// #endregion

// #region -------  4. 重命名函数- 迁移式  -------
// 先定义新重命名函数  再将其内联到旧函数中 再测试逐步删除(更安全)
function add(a, b) {
    return a + b
}


function add(a, b) {
    return addPrice(a, b)
}

function addPrice(a, b) {
    return a + b
}
// #endregion

// #region -------  5. 封装变量为函数调用  -------
// 如果一个独立的数据被广泛作用域使用,则需要将其封装起来, 这里抽取为模块
let defaultOwner = { name: "张三", age: 18 }

export const getDefaultOwner = () => {//取值时取副本,阻止对其修改
    return Object.assign({}, defaultOwner)
}
export const setDefaultOwner = (newOwner) => {//设置时也可以取副本
    defaultOwner = newOwner
    return Object.assign({}, defaultOwner)
}
// #endregion

// #region -------  6. 引入参数对象  -------
// 将总是结伴出现的参数封装成一个对象/类
function before(temp, min, max) { }

const range = { min, max }
function after(temp, range) { }
// #endregion

// #region -------  7. 集中一组数据的派生数据  -------
// 如person初始只有两个字段, 剩下两个字段是分散在程序各处进行计算得出 , 将他们收拢到一起
const person = {
    name: "张三",
    age: 18,

}
// 通过封装类来集中派生数据
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    //  一组计算派生数据的函数
    getBirthYear() { this.birthYear = "1997" }
    getFirstName() { this.firstName = "张" }
}

// 通过计算函数
function enrichPerson(person) {
    const result = _.deepClone(person)// 深拷贝以达到immutable
    result.birthYear = getBirthYear(result)
    result.firstName = getFirstName(result)
    return result
}
// #endregion

//  -------  8. 拆分阶段-略  -------
