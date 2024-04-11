namespace 面向对象 {

  //------------ 函数重载 ------------------
  // 通过不同的参数类型返回不同的数据

  // todo 定义函数签名 下面是具体函数实现
  function foo(name: string): string
  function foo(age: number): string
  function foo(value: string | number): string {
    if (typeof value === "string")
      return `你好,我的名字是${value}`
    if (typeof value === "number")
      return `你好,我的年龄是${value}`

    return "参数类型错误"
  }

  //------------ 接口继承 ------------------
  interface Parent {
    prop1: string
  }
  interface Child extends Parent {
    prop2: string
  }


  // ------------单独存取器-------------
  class User {
    private _password: string = ""

    get password() {
      return this._password
    }
    set password(newVal: string) {
      this._password = newVal
    }
  }

  // ------------多定义标识符------------------
  // TS中允许一个标识符定义多个事物如
  interface Fruit {
    name: string,
    age: number
  }
  const Fruit = {
    name: "苹果",
    color: "red"
  }

}