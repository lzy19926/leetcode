//TODO 组合继承
// 创建父类以及方法
function Father(name, age) {
  this.name = name
  this.age = age
}
Father.prototype.sayName = function () {
  console.log(this.name)
}


// 创建子类以及方法
function Child(name, age) {
  this.name = name
  this.age = age
}
Father.prototype.sayAge = function () {
  console.log(this.age)
}

// 继承,修改子类的原型 指向一个父原型实例
Child.prototype = Object.create(Father.prototype)




//TODO 防抖 n秒内重新计时  节流 n秒内不重新计时
function debounce(fn, wait) {
  let timer = null  // 基于闭包

  return function () {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(() => {
      fn.apply(this, arguments)
    }, wait)
  }
}

function throttle(fn, wait) {
  let timer = null
  return function () {
    if (timer) return
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, arguments)
    }, wait)

  }
}
