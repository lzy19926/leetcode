


namespace 类型计算 {

  // ----------条件类型计算 -----------
  //!通过extends关键字 + 多重三元运算符(条件类型)设计一个类型判断工具
  // 注意: 使用extends只能判断类型的兼容性  不能判断其完全相等
  type CheckType<T> = T extends string
    ? string
    : T extends number
    ? number
    : T extends boolean
    ? boolean
    : T extends Object
    ? Object
    : T extends null
    ? null
    : T extends undefined
    ? undefined
    : never

  // 用途: 该函数计算x+y 可传入三种类型, 需要判断其返回值类型
  function universalAdd<T extends number | bigint | string>(x: T, y: T): T {
    return x + (y as any);
  }

  const res_1 = universalAdd("linbudu", "599") // 无返回类型为           res: any
  const res_2 = universalAdd("linbudu", "599") // 如果直接返回:T 则类型为 res:"linbudu" | "599"

  // 使用CheckType工具类型,通过T计算返回值
  function universalAdd_2<T extends number | bigint | string>(x: T, y: T): CheckType<T> {
    return x + (y as any);
  }

  const res_3 = universalAdd("linbudu", "599") // res: string



  // 判断函数返回值的工具类型
  type Func = (...args: any[]) => any;
  type FunctionConditionType<T extends Func> = // 首先满足T是一个函数
    T extends (...args: any[]) => string       // 逐步判断T的返回值类型
    ? 'A string return func!'
    : T extends (...args: any[]) => number
    ? 'A number return func!'
    : T extends (...args: any[]) => boolean
    ? 'A boolean return func!'
    : Func

  //  "A string return func!"
  type StringResult = FunctionConditionType<() => string>;
  // 'A number return func!';
  type NumberResult = FunctionConditionType<() => number>;
  // 'A boolean return func!';
  type BooleanResult = FunctionConditionType<() => boolean>;


  //!  ---------infer关键字 用于猜想一个值的类型-----------
  // 仅在条件类型中可用, 可将infer位置的类型进行检测并抽取为类型R
  // 如果满足T extends Func,则返回R
  type FunctionReturnType_2<T extends Func> = T extends (...args: any[]) => infer R
    ? R
    : never;
  // 可直接判断出PromiseResult的类型
  type PromiseResult = FunctionReturnType_2<() => Promise<any>>;

  // 用于判断一个返回Promise函数内部值的类型
  type PromiseReturnTypeCheck<T extends Func> = T extends (...args: any[]) => Promise<infer R>
    ? { value: R }
    : never;
  // 推断出R为string,进而构造出更复杂的返回类型
  type StringPromiseResult = PromiseReturnTypeCheck<() => Promise<string>>;


  //! ----------递归获取嵌套Promise内部类型-------------
  // 条件类型可以进行递归操作 如获取多重嵌套的Promise内类型
  type CheckInnerPromiseType<T> = T extends Promise<infer V>
    ? CheckInnerPromiseType<V> // 如果是Promise 将其放入下一层CheckInnerPromiseType进行检查
    : T                        // 如果不是Promise 则直接返回

  // 检查一个多重嵌套的Promise 类型为number
  type InnerPromiseType = CheckInnerPromiseType<Promise<Promise<Promise<number>>>>


  //! --------never any不会实际执行条件类型--------------
  type IsStringType<T> = T extends string ? 1 : 2
  type Tmp_1 = IsStringType<any>   // 1|2
  type Tmp_2 = IsStringType<never> // never


}