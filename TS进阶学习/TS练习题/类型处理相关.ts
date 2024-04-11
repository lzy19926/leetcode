

// -----------------------实现if工具类型-----------------------
// 接收一个条件类型  true时返回A false时返回B
namespace 实现if工具类型 {
  type If<Condition extends boolean, T, F> = Condition extends true
    ? T
    : F

  type A = If<true, 'a', 'b'>  // expected to be 'a'
  type B = If<false, 'a', 'b'> // expected to be 'b'
}

// -----------------------实现 Pick-----------------------
namespace 实现Pick {
  type MyPick<T, Keys extends keyof T> = {
    [key in Keys]: T[key]
  }

  interface Todo {
    title: string
    description: string
    completed: boolean
  }

  type TodoPreview = MyPick<Todo, 'title' | 'completed'>

  const todo: TodoPreview = {
    title: 'Clean room',
    completed: false,
  }
}


// -----------------------实现 Exclude-----------------------
namespace 实现Exclude {
  // 说明, 联合类型本身自带遍历 下列返回的T只是联合类型中的其中一个
  type MyExclude<T, U> = T extends U ? never : T

  type Result = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
}


// -----------------------实现Readonly  DeepReadonly-----------------------
namespace 实现Readonly {
  type MyReadonly<T> = {
    readonly [key in keyof T]: T[key]
  }
  interface Todo {
    title: string
    description: string
    list: {
      a: number
    }
  }

  const todo: MyReadonly<Todo> = {
    title: "Hey",
    description: "foobar",
    list: {
      a: 1
    }
  }

  todo.title = "Hello" // Error: cannot reassign a readonly property
  todo.description = "barFoo" // Error: cannot reassign a readonly property

}


// -----------------------元组转换为对象-----------------------
// 将一个元组类型转换为对象类型，这个对象类型的键/值和元组中的元素对应。
namespace 元组转换为对象 {

  type TupleToObject<T extends readonly (string | symbol | number)[]> = {
    [k in T[number]]: k
  }
  const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const

  type result = TupleToObject<typeof tuple>
}


// -----------------------实现Merge-----------------------
// 接收一个条件类型  true时返回A false时返回B
namespace 实现Merge {
  // 同时遍历Target和Source, 优先取Source 然后取Target 否则返回never
  type Merge<Target, Source> = {
    [K in keyof Target | keyof Source]:
    K extends keyof Source
    ? Source[K]
    : K extends keyof Target
    ? Target[K]
    : never
  }

  type foo = {
    name: string
    age: string
  }
  type coo = {
    age: number
    sex: string
  }

  type Result = Merge<foo, coo> // expected to be {name: string, age: number, sex: string}
}