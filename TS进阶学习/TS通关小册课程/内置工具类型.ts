


namespace 内置工具类型 {
  // ------------属性修饰工具类型  Partial  Required  Readonly----------------
  interface Person {
    readonly name: string
    age: number
    sex?: boolean
  }

  // 全部可选 -- 给所有属性标记:?
  type Partial<T> = {
    [P in keyof T]?: T[P];
  };
  // 全部必填 -- 给所有属性移除?标记   -?表示移除?标记
  type Required<T> = {
    [P in keyof T]-?: T[P];
  };
  // 全部只读 -- 给所有属性标记: readonly  (也可以记作Immutable)
  type Readonly<T> = {
    readonly [P in keyof T]: T[P];
  };
  // 取消所有只读 -- 给所有属性移除readonly标记:
  type Mutable<T> = {
    -readonly [P in keyof T]: T[P];
  };
  // 从联合类型中剔除空值(非自定义)
  type NonNullable<T> = T extends null | undefined ? never : T;

  type PartialPerson = Partial<Person>
  type RequiredPerson = Required<Person>
  type ReadonlyPerson = Readonly<Person>
  type MutablePerson = Mutable<Person>


  // ------------自定义递归深度属性修饰工具类型----------------------
  // Partial  Required  Readonly NonNullable只能修饰单层, 有时候需要递归深入进行检测
  type DeepPartial<T extends Object> = {
    [K in keyof T]?: T[K] extends Object ? DeepPartial<T[K]> : T[K]
  }
  type DeepRequired<T extends Object> = {
    [K in keyof T]-?: T[K] extends Object ? DeepRequired<T[K]> : T[K]
  };
  type DeepReadonly<T extends Object> = {
    readonly [K in keyof T]: T[K] extends Object ? DeepReadonly<T[K]> : T[K]
  };
  type DeepMutable<T extends Object> = {
    -readonly [K in keyof T]: T[K] extends Object ? DeepMutable<T[K]> : T[K]
  };
  type DeepNonNullable<T extends Object> = {
    [K in keyof T]: T[K] extends Object
    ? DeepNonNullable<T[K]>
    : NonNullable<T[K]>
  }

  // ------------结构工具类型 Record----------------
  // 快速声明一个kv结构
  type Record<K extends keyof any, T> = {
    [P in K]: T;
  };
  // 字典型KV结构
  type Dictionary<T> = {
    [index: string]: T;
  };
  // 下标字典型KV结构
  type NumericDictionary<T> = {
    [index: number]: T;
  };

  // ------------集合工具类型  Pick  Omit  Extract  Exclude----------------
  // 选取-去除某些属性组成新的结构类型 Pick  Omit
  type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };
  type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

  type PickedParams = Pick<Person, "age" | "name">
  type OmitParams = Omit<Person, "sex">

  // 交集与差集实现Extract  Exclude
  type Extract<T, U> = T extends U ? T : never;
  type Exclude<T, U> = T extends U ? never : T;

  type StringParams = Extract< // 两个类型的交集 3
    1 | 2 | 3,
    3 | 4 | 5
  >
  type ExcludeParams = Exclude< // 两个类型的差集 1|2
    1 | 2 | 3,
    3 | 4 | 5
  >


  // ------------函数匹配工具类型  Parameters  ReturnType  ----------------
  // 主要使用条件类型与infer关键字来实现

  type FunctionType = (...args: any) => any;
  type FunctionFoo = (name: string, age: number) => Person
  // 匹配函数的参数类型
  type Parameters<T extends FunctionType> = T extends (...args: infer P) => any ? P : never;
  // 匹配函数返回值类型
  type ReturnType<T extends FunctionType> = T extends (...args: any) => infer R ? R : any;

  type ArgFoo = Parameters<FunctionFoo>
  type ResultFoo = ReturnType<FunctionFoo>

  // ------------对象匹配工具类型  ConstructorParameters  InstanceType  ----------------
  type ClassType = abstract new (...args: any) => any;

  // 匹配对象构造函数的参数类型
  type ConstructorParameters<T extends ClassType> =
    T extends abstract new (...args: infer P) => any
    ? P :
    never;

  // 匹配对象构造函数返回值(实例)的类型
  type InstanceType<T extends ClassType> =
    T extends abstract new (...args: any) => infer R
    ? R
    : any;

  class Dog {
    name: string
    age: string
    constructor(name: string, age: number) { }
    bark() { }
  }

  type DogConstructorParams = ConstructorParameters<typeof Dog>
  type DogInstance = InstanceType<typeof Dog>
}



//一门技术，要么应当能够在当下或者可预见的未来给予你帮助，
// 要么能够扩宽你的技术视野和知识边界（类型体操并不完全算）


// 我们书写的类型实际上也是逻辑，只不过是类型世界的逻辑，并且不存在于运行时。

// 在你优化 TypeScript 代码的过程中，如果感到边际成本明显提升，重构工作开始有些吃力，
// 那你很可能已经达到了一个临界值，也是该停下来的时候了