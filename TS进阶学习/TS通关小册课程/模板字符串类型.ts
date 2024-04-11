
// 模板字符串类型 用于增强字符串类型的灵活性
type Hellow = `Hellow ${string}`

// 用于限制版本号为三位数字 1.0.0
type Version = `${number}.${number}.${number}`;

const v1: Version = "1.1.0"
// const v2: Version = "1.0"  // 报错,必须由三个number组成


// 使用模板进行类型组合
type Brand = 'iphone' | 'xiaomi' | 'honor';
type Memory = '16G' | '64G';
type ItemType = 'official' | 'second-hand';

type PhoneName = `${Brand}-${Memory}-${ItemType}`;



// 用于检查字符串类型Str中是否有Search
// 使用_R1 _R2两个插槽判断是否可以被划分成两个部分
type Include<
  Str extends string,
  Search extends string
> = Str extends `${infer _R1}${Search}${infer _R2}` ? true : false;


type IncludeRes_1 = Include<'abcd', 'a'>; // true
type IncludeRes_2 = Include<'abcd', 'e'>; // false



// 实现字符串类型Trim
// 递归处理, 判断是否有前置空格, 每次删除一个空格
type TrimLeft<Str extends string> = Str extends ` ${infer R}` ? TrimLeft<R> : Str;
type TrimRight<Str extends string> = Str extends `${infer R} ` ? TrimRight<R> : Str;
type Trim<Str extends string> = TrimLeft<TrimRight<Str>>;