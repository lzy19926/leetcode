// #region -------  1. 封装数据为类  -------
// 如果内部数据也是复杂结构,也可以将其封装为类
const person = { name: "张三", age: 18, }

class Person {
    constructor(data) {
        this._name = data.name
        this._age = data.age
    }
    getName() { return this._name }
    getAge() { return this._age }
}

// #endregion

// #region -------  2. 封装集合  -------
// 对于一个集合(数组) 应该将其封装起来  给出获取 添加  删除  计算等基本方法
class Books {
    constructor(books = []) {
        this._books = books
    }
    addBook(book) { }
    removeBook(id) { }
    getBook(id) { }
}

// #endregion

// #region -------  3. 以查询变量取代临时变量  -------
// 将一个临时变量转换为函数,并内联到使用的部分
const basePrice = this.quanty.find(item => item.price == this.itemPrice)
let res = basePrice - discount


function basePirce() {
    return this.quanty.find(item => item.price == this.itemPrice)
}
let res_2 = basePirce() - discount
// #endregion

// #region -------  4. 隐藏委托关系  -------
// 当一个字段需要通过很多中间委托找到某个对象时,可以将其封装并隐藏
const manager = person.department.room.manager

class Person {
    get manager() { return this.department.room.manager }
}

const manager_2 = person.manager
// #endregion
