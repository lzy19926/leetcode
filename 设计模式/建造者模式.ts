//todo 将一个需要多参数构造的创建类拆离
class Person {
    constructor(
        name,
        age,
        sex,
        height,
        weight
    ) { }
}

const p = new Person("张三", 18, 0, 175, 70)






// 定义构造器
class PersonBuilder {
    name: string
    age: number
    sex: 0 | 1
    height: number
    weight: number

    constructor() {
        this.name = ""
        this.age = 0
        this.sex = 0
        this.height = 0
        this.weight = 0
    }
    // 设置属性
    setProp(props, value) {
        this[props] = value
        return this
    }
    // 创建
    build() {
        return new Person(
            this.name,
            this.age,
            this.sex,
            this.height,
            this.weight
        )
    }
}

// 使用Builder进行创建
const builder = new PersonBuilder()

const person = builder
    .setProp("name", "张三")
    .setProp("age", 18)
    .setProp("sex", 0)
    .build()