//@ts-nocheck

import type * as _T from "type-fest"

// 匹配所有基本类型
type A = _T.Primitive

// 匹配一个class
type C = _T.Class<A>

// 找出两个类型的互斥键
type D = _T.MergeExclusive<A, C>

// 省略/匹配一个type中所有的index signature
interface Example {
  id: number;
  name: string;
  [key: string]: any; //声明index signature
}
type E = _T.OmitIndexSignature<Example>
type F = _T.PickIndexSignature<Example>


// 匹配类型结构中  符合类型的key值
interface Example2 {
  id: number;
  name: string;
  age?: number;
}

type NumberKeysAndUndefined = _T.ConditionalKeys<Example2, number | undefined>;
//=> "id" | "age"
