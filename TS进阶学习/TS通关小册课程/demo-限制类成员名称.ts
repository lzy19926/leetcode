

// 需求:  需要限制一个Class中的方法名称  必须以Handler进行结尾

type CheckMethod<C> = {
  [K in keyof C]:                           // 遍历Class
  C[K] extends (() => Promise<void> | void) // 检查方法类型
  ? K extends `${string}Handler` | "init"   // 检查方法名
  ? C[K]                                    // 返回方法本体
  : never                                   // 中断退出
  : never                                   // 中断退出
};

// 接口传入构造函数类型进行检查
interface IModuleA extends CheckMethod<ModuleA> {
  init: () => void
}

class ModuleA implements IModuleA {
  init() { }
  testHandler() { }
}

interface IModuleB extends CheckMethod<ModuleB> {
  init: () => void
}

class ModuleB implements IModuleB {
  init() { }
  testHandler() { }
  // testHandle() { }
}




type A = {
  name: string
  age: number
}

type B = {
  name: string
  sex: boolean
}


// 合并两个类型
type Merge<A, B> = A & B
type C = Merge<A, B>

// 显示两个合并类型的属性
type MergeParams<A, B> = keyof Merge<A, B>
type ParamsC = MergeParams<A, B>



type FuncFoo = (arg: number) => void;
type FuncBar = (...args: string[]) => void;
type FuncBaz = (arg1: string, arg2: boolean) => void;


// 获取函数第一个参数类型
type FirstFuncParam<F extends Function> =
  F extends (arg: infer P, ...args: any[]) => any
  ? P
  : never

// 获取函数的最后一个参数类型
type LastFuncParam<F extends Function> =
  F extends (arg: infer P) => any    // 检查是否是单参数函数
  ? P
  : F extends (...args: infer A) => any // infer提取参数列表A
  ? A extends [...any, infer Q]         // infer提取参数列表A最后一个参数Q
  ? Q
  : never
  : never

type FirstP = FirstFuncParam<FuncFoo>
type LastP = LastFuncParam<FuncBaz>

type D = C
