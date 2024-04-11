//TODO 实现Object.create
// 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__。 --MDN
function create(obj) {
  function MyObject() { }

  MyObject.prototype = obj
  MyObject.prototype.constructor = Constructor

  return new MyObject()
}


//TODO 实现Object.assign
// 实际上就是一个浅拷贝
Object.prototype.myAssign = function (target, sourceObj) {
  if (typeof target !== "object") throw new Error("target must be an object")

  Object.keys(sourceObj).forEach(key => {
    target[key] = sourceObj[key]
  })

  return target
}



//TODO 实现深拷贝
//json遇到函数或者symbol会失效
// 处理循环引用问题
// 处理数组深拷贝
function deepClone(target, cache = new WeakMap()) {
  if (target === null || typeof target !== 'object') {
    return target
  }

  const copy = Array.isArray(target) ? [] : {} // 初始化本轮拷贝对象
  cache.set(target, copy)                      // 缓存本轮拷贝对象

  Object.keys(target).forEach(key => {         // 递归克隆
    copy[key] = deepClone(target[key], cache)
  })

  return copy
}

//TODO 实现对象扁平化(转为path:value的形式)
// 要求转换对象的各值为 path:value的形式如下
// 要求转换成如下对象
var entryObj = {
  a: {
    b: {
      c: {
        d: 'abcd'
      }
    },
    e: ['ae']
  }
}

var outputObj = {
  'a.b.c.d': 'abcd',
  'a.e[0]': 'ae'
}

function flatObj(obj, path = '', result = {}, isArray = false) {
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    let nextPath = isArray ? `${path}[${key}]` : `${path}${key}.`

    if (Array.isArray(value)) {
      flatObj(value, nextPath, result, true)
    }
    else if (typeof value === 'object') {
      flatObj(value, nextPath, result, false)
    }
    else {
      result[nextPath] = value
    }
  })

  return result
}

console.log(flatObj(entryObj));