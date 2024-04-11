// -----------------------获取Promise内值的类型-----------------------
namespace 获取Promise内值的类型 {
  type MyAwaited<P> = P extends Promise<infer R> ? R : never

  type ExampleType = Promise<string>

  type Result = MyAwaited<ExampleType> // string
}


// -----------------------检测函数参数和返回值类型-----------------------
// any表示无检查 unknown表示一定有值,但不知道是什么
namespace 检测函数参数类型 {

  type MyParameters<F extends Function> =
    F extends (...args: infer Args) => any
    ? Args
    : never


  type MyReturnType<F extends Function> =
    F extends (...args: any) => infer R
    ? R
    : never

  const foo = (arg1: string, arg2: number) => {
    if (arg2 == 0)
      return 1
    else
      return 2
  }

  type FunctionParamsType = MyParameters<typeof foo> // [arg1: string, arg2: number]
  type FunctionReturnType = MyReturnType<typeof foo> // 应推导出 "1 | 2"
}


// 声明了一个type 两个属性不能同时存在
//    A,A|B  B

// 平均