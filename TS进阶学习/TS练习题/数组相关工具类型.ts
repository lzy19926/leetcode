// -----------------------第一个/最后一个数组元素-----------------------
namespace 第一个数组元素 {

  type First<T extends any[]> = T[0]
  type Last<T extends any[]> = [never, ...T][T['length']]

  type arr1 = ['a', 'b', 'c']
  type arr2 = [3, 2, 1]

  type head1 = First<arr1> // 应推导出 'a'
  type head2 = First<arr2> // 应推导出 3

  type tail1 = Last<arr1> // 应推导出 'c'
  type tail2 = Last<arr2> // 应推导出 1
}


// -----------------------实现类型Array.includes-----------------------
// 思路  解构+infer+递归
// 递归取T中第一项与U进行判断是否相等。
namespace 实现类型Array.includes {

  // 工具类型Equal
  type Equal<X, Y> =
    (<T>() => T extends X ? 1 : 2) extends
    (<T>() => T extends Y ? 1 : 2) ? true : false


  type Includes<A extends any[], Target> =
    A extends [infer Item, ...infer Rest]  // 递归获取第一项 , 和剩余项
    ? Equal<Item, Target> extends true     // 判断第一项是否与Target相等
    ? true
    : Includes<Rest, Target>               // 将剩余项继续放入判断
    : false

  type hasMen = Includes< // expected to be `false`
    ['张三', '李四', '王五'],
    '赵六'
  >
}


// -----------------------实现类型Array.push unshift concat-----------------------
namespace 实现类型Array各个方法 {
  type Push<A extends unknown[], B> = [...A, B]

  type Unshift<A extends unknown[], B> = [B, ...A]

  type Concat<A extends any[], B extends any[]> = [...A, ...B]

  type Result_1 = Push<[1, 2], '3'> // [1, 2, '3']
  type Result_2 = Unshift<[1, 2], 0> // [0, 1, 2]
  type Result_3 = Concat<[1], [2]> // expected to be [1, 2]
}
