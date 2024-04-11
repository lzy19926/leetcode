//TODO 实现call函数
// 此函数中的this是调用函数本身
Function.prototype.myCall = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('need function');
  }
  const args = arguments.slice(1) // 获取参数
  let result = undefined

  context = context || window     // 给出this初始值
  context.fn = this               // 指定上下文的调用函数为目标函数
  result = context.fn(...args)    // 执行目标函数

  delete context.fn

  return result
}

//TODO 实现apply
// 与call基本相同,参数取值方式不同
Function.prototype.myApply = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('need function');
  }
  let args = arguments[1];
  let result = null;

  context = context || window;

  context.fn = this;
  result = context.fn(...args);

  delete context.fn;
  return result;
}

//TODO 实现bind
Function.prototype.myBind = function (context) {
  const args = arguments.slice(1) // 获取参数
  let fn = this

  return function () {
    return fn.apply(
      context, // 通过apply修改this
      args.concat(...arguments) // 组合两组参数
      )
  }
}