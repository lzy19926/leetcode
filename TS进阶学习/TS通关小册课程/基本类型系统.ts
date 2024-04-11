namespace 基本类型系统 {

  // ----------------类型系统层级-----------------
  // 通过类型层级判断类型是否能兼容
  // 能兼容的类型可以被赋值  可以使用extends关键字判断

  //  any          unknown
  //        Object
  // String Boolean Number
  // string boolean number
  // "123"  true    599
  //        Never


  // ---------结构化类型系统  标称类型系统-----------
  // 结构化类型系统中, 使用鸭子类型, 即如果一个类型实现了其他类型的所有方法,则它就是这个类型
  // 如下 此时类型Dog可以视作类型Cat
  class Cat {
    eat() { }
  }

  class Dog {
    bark() { }
    eat() { }
  }

  // 标称类型系统中, 两个实现完全相同的类型必须同名
  namespace A {
    type USD = number;
    type CNY = number;

    function addCNY(a: CNY, b: CNY): CNY {
      return a + b
    }

    // 此时 使用CNY和USD相加不会报错, 但实际类型意义没有体现出来
    const CNYCount: CNY = 200;
    const USDCount: USD = 200;
    addCNY(CNYCount, USDCount)
  }


  // 可以使用添加元数据的形式进行区分
  namespace B {
    class CNY {
      private _type: string = "CNY";
      constructor(public value: number) { }
    }
    class USD {
      private _type: string = "USD";
      constructor(public value: number) { }
    }

    function addCNY(a: CNY, b: CNY): CNY {
      return new CNY(a.value + b.value)
    }

    const CNYCount: CNY = new CNY(200);
    const USDCount: USD = new USD(200);
    // addCNY(CNYCount, USDCount) //=> Error: 类型USD参数不能赋值给CNY
  }




  // -----------类型断言 as语法----------
  // 如果ts分析类型不符合预期,则将其断言为此处正确的类型
  const str: string = "123";
  // 将str转为any
  (str as any).forEach(element => { });
  // 如果转换差异过大 如将string转为string[] 则会报错 需要先转换为unknow
  (str as unknown as any[]).forEach(element => { });
  // 非空断言
  str!.toString()


  // ----------工具类型----------
  // 使用泛型坑位的类型, 用于动态变更类型
  type FactoryType<T> = T | number | string;
  // 使用工具类型创建其他类型
  type FactoryWithBool = FactoryType<boolean>;
  // 常用工具类型
  type MaybeEmpty<T> = T | null | undefined


  // ----------交叉类型----------
  // 同时满足两个类型  如果无法实现则会变成never
  type StrAndNum = string & number


  // ----------索引类型----------
  // 用于定义kv的类型
  // 索引类型的key必须是string symbol number
  interface StringKV {
    [key: string]: string
  }
  interface AnyKV {
    [key: string | number | symbol]: string
  }


  // ----------类型守卫-----------
  // 如下函数, 如果这个函数返回true, 则后续的input会被推导为number
  function isNumber(input: unknown): input is number {
    return typeof input === "string";
  }

  function foo(input: string | number) {
    // 通过isNumber这个函数后,input的类型变为了number
    if (isNumber(input)) {
      // (input).replace("linbudu", "linbudu599") //=>Error: 类型Number上不存在replace
    }
  }


  // ----------克隆类型-----------
  interface Person {
    name: string,
    age: number,
  }
  // 用于克隆复杂类型的工具函数(单层)
  type CloneType<T> = {
    [k in keyof T]: T[k]
  }
  // 会获得克隆Person类型
  type ClonePerson = CloneType<Person>


  // ---------转换属性类型-------
  // 转换所有属性为string
  type Stringify<T> = {
    [K in keyof T]: string;
  };
  // TS内置类型工具Partial, 给所有属性标记为？ 可选
  type MyPartial<T> = {
    [P in keyof T]?: T[P];
  };

  type StringfyPerson = Stringify<Person>// 所有属性都被转换为了string
  type PartialPerson = Partial<Person> // 所有属性都变成了可选


  // --------类型的自动提取-----------
  // 例子: 一个函数可以接受多种类型参数并处理 返回值也为对应类型

  // 方案一 : 函数重载 如果类型比较多不方便
  function handle(input: string): string
  function handle(input: number): number
  function handle(input: {}): {}
  function handle(input: string | number | {}): string | number | {} { return input }
  // 方案二 : 泛型 input的类型与返回类型保持一致
  function handle_2<T>(input: T): T { return input }
  // 注意,这里返回值会被精确推导为字面量
  const res1 = handle_2(888)    // res的类型为888
  const res2 = handle_2("lzy")  // res的类型为"lzy"



}