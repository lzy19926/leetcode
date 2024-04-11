


// -----------------------可串联构造器-----------------------

namespace 可串联构造器 {


  // Merge Helper
  type Merge<Target, Source> = {
    [K in keyof Target | keyof Source]:
    K extends keyof Source
    ? Source[K]
    : K extends keyof Target
    ? Target[K]
    : never
  }

  // 给出一个默认类型{} ，将其递归传入下方
  type Chainable<T = {}> = {
    // 约束K需要是一个单独的字符串 需要进行泛型传入
    option: <K extends string, V>
      // 对K于T进行去重处理
      (
        key: K extends keyof T ? never : K,
        value: V
      )
      // 递归构造T 将KV结构合并到T中
      => Chainable<Merge<T, Record<K, V>>>,
    // 给出get方法返回类型T
    get: () => T
  }

  // 使用option给config设置值, 最终需要返回一个config的完整类型
  declare const config: Chainable

  const result = config
    .option('foo', 123)
    .option('name', 'type-challenges')
    .option('bar', { value: 'Hello World' })
    .get()

  // 期望 result 的类型是：
  // interface Result {
  //   foo: number
  //   name: string
  //   bar: {
  //     value: string
  //   }
  // }

}