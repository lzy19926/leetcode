//@ts-nocheck
// 函数柯里化: 指部分求值- 把接收多个参数的函数变成接收一个单一参数的函数,
// 每次计算使用一个参数, 并返回下一个接收其他参数的新函数的过程



// 定义一个加法函数
function add(a, b, c) {
  return a + b + c;
}

// 将其柯里化后得到新函数 curryAdd
const curryAdd = currying(add, 3);

// 分别调用 curryAdd 的三重嵌套形式得到结果： 或者按顺序自行提供所有参数：
add(1, 2, 3);      // 6
curryAdd(1)(2)(3); // 6
curryAdd(1, 2, 3); // 6



// ---------------柯里化实现----------------------
function currying(fn, length) {
  // 记录函数的形参个数
  length = length || fn.length

  return function (...args) {
    // 如果参数未传满, 则递归调用
    if (args.length < length) {
      return currying(fn.bind(this, ...args), length - args.length)
      // 如果参数传递满,才执行fn函数
    } else {
      return fn.call(this, ...args)
    }
  }
}

// -----------可以直接将Curring函数挂在原型上--------------
Function.prototype.currying = currying
Function.prototype.unCurrying = unCurrying