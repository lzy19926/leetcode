

//TODO  实现简易类型判断
// 主要考察typeOf无法识别null和具体原型
function MyTypeOf(value) {
  if (value === null) {
    return "null"
  }
  else if (typeof value === 'object') {// 获取具体原型的字符串表现形式
    const toString = Object.prototype.toString(value) // 得 [Person]
    return toString(value).slice(8, -1).toLowerCase();// 得 person
  } else {
    return typeof value
  }
}


//TODO 实现instanceof方法
// 递归检查构造函数的prototype链,判断是否是通过改原型实例化的
function MyInstanceof(obj, ctor) {
  let proto = Object.getPrototypeOf(obj)
  let curPrototype = ctor.prototype

  while (proto) {
    if (proto === curPrototype) return true
    proto = Object.getPrototypeOf(proto) // 继续向上查找
  }
}


//TODO 实现new关键字
function myNew() {
  var constructor = [].shift.call(arguments)    //将传入的构造函数弹出  arguments数组的第一项就是构造函数
  _this = {}                                    //创建一个this上下文  用于存放新对象
  _this.__proto__ = constructor.prototype       // 给this加上一个__proto__指向构造函数的prototype
  var res = constructor.apply(_this, arguments) // 调用构造函数  将传入的参数加进去  将this指向新的对象

  return typeof (res) === 'object' ? res : _this
}

let person = myNew(Object)
