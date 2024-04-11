namespace 类型获取 {

  // ------------keyof关键字 获取所有类型------------
  type DatePropertyNames = keyof Date
  // & 交集符号,选取DatePropertyNames中所有string类型
  type DatePropertyStringNames = DatePropertyNames & string
  // & 交集符号,选取DatePropertyNames中所有Symbol类型
  type DatePropertySymbolNames = DatePropertyNames & symbol

  // typeof关键字 用于获取某个值的类型
  const Fruit = {
    name: "苹果",
    color: "red"
  }
  type FruitType = typeof Fruit

  // 对于一个类 p的类型是 typeof Person
  const Person = class Person { }
  // 对于类实例 p的类型是 Person
  const p = new Person()


  // ------------extends类型约束 类型判断------------
  // 左边的是否能被右边的包含
  type answer_1 = 64 extends number ? true : false  // true
  type answer_2 = number extends 64 ? true : false  // false
  type answer_3 = string extends any ? true : false  // true
  type answer_4 = string[] extends any[] ? true : false  // true


  type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002
    ? "success"
    : "failure"

  // 表示  传入的ResCode类型是否满足10000 | 10001 | 10002 输出不同的类型
  // <ResCode extends number = 10000>     表示给出泛型的默认类型为10000
  type Res1 = ResStatus<10000> // success
  type Res2 = ResStatus<40004> // failure
  type Res3 = ResStatus        // success


  // ------------Extract类型抽取------------
  // 例子 比如css中颜色可以是字符串,rgb,F0000 等类型
  type FavoriteColors =
    "red"
    | "green"
    | [number, number, number]
    | { red: number, green: number }

  // 使用Extract关键字 抽取某个类型集的string类型
  type StringColors = Extract<FavoriteColors, string>

  type ArrayColors = Extract<FavoriteColors, string[]>

  type ObjectColors = Extract<FavoriteColors, { red: number }>

  // ------------Exclude类型排除------------
  // 使用Exclude关键字  匹配所有除字符串以外的类型
  type NonStringColors = Exclude<FavoriteColors, string>


  //!  ---------infer用于猜想一个值的类型-----------
  // 仅在条件类型中可用, 可将infer位置的类型进行检测并抽取为类型R
  // 如果满足T extends Func,则返回R
  type Func = (...args: any[]) => any;
  type FunctionReturnType<T extends Func> = T extends (...args: any[]) => infer R
    ? R
    : never;
  // 可直接判断出PromiseResult的类型
  type PromiseResult = FunctionReturnType<() => Promise<any>>;

  // --------多泛型(多参数运算)-------------
  // 如果Type满足类型Element , 则输出类型为R1  否则为R2
  type Conditional<Type, Element, R1, R2> = Type extends Element ? R1 : R2;

}
