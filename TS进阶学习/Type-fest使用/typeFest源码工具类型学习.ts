// @ts-nocheck 禁用此Demo文件的类型检查

// ------------------DoMergeDeepRecord------------------
// 深度合并两个结构
export type UnknownRecord = Record<PropertyKey, unknown>;


type DoMergeDeepRecord<
  Destination extends UnknownRecord,
  Source extends UnknownRecord
> =
  // Case in rule 1: 找到Destination中存在但Source不存在的Key
  {
    [Key in keyof Destination as Key extends keyof Source ? never : Key]: Destination[Key];
  }
  // Case in rule 2: 找到Source中存在但Destination中不存在的Key
  & {
    [Key in keyof Source as Key extends keyof Destination ? never : Key]: Source[Key];
  }
  // Case in rule 3: 找到Source和Destination中共同存在的Key
  & {
    [Key in keyof Source as Key extends keyof Destination ? Key : never]: MergeDeepOrReturn<Destination[Key], Source[Key]>;
  };


// ------------------SimpleMerge------------------
// 将Source中的所有属性合并到Destination中, 覆盖重复的属性
type SimpleMerge<Destination, Source> =
  { // 遍历Destination的所有key,重新断言 如果Source中有该key,则不获取
    [key in keyof Destination as  key extends keyof Source ? never : key]: Destination[key]
  }
  & Source // 最后合并Source


type Foo = { foo: string; fooBar: unknown; items: string[] };
type Bar = { bar: number; fooBar: boolean; items: number[] };
type FooDeep = { foo: Foo; fooBar: Foo; items: { foo: Foo[]; fooBar: Foo } };
type BarDeep = { bar: Bar; fooBar: Bar; items: { bar: Bar[]; fooBar: Bar } };

type AB = SimpleMerge<FooDeep, BarDeep>


type M = DoMergeDeepRecord<FooDeep, BarDeep>