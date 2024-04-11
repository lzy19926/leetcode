//TODO  并发控制 大概逻辑基本相同
function getUrlByFetch() {
  let idx = maxload = 3

  // 每个任务结束后,再次启动下一个任务
  const getCondition = (i) => {
    fetch(tasks[i]).then(() => {
      if (idx < tasks.length) {
        getCondition(++idx)
      }
    })
  }

  // 同时启动三个任务
  const start = () => {
    for (let i = 0; i < maxload; i++) {
      getCondition(i)
    }
  }
}


//TODO Promise并发限制



//TODO 实现lazy链式调用
// 所有任务异步化存到队列,最后触发
function Person() {
  this.tasks = []
  this.lock = false
}

Person.prototype.work = function () {
  this.queue.push(() => new Promise(resolve => {
    console.log("牛马工作");
    resolve()
  }))
  return this  // 链式调用最后要返回this
}

Person.prototype.sleep = function (time) {
  this.queue.push(() => new Promise(resolve => {
    setTimeout(() => {
      console.log("牛马睡觉");
      resolve()
    }, time * 1000)
  }))
  return this
}

// 触发链条循环执行
Person.prototype.run = async function () {
  while (this.tasks.length) {
    this.lock = true
    const task = this.tasks.shift()
    await task()
    this.lock = false
    this.run()
  }
}

new Person().work().work().sleep(8).work().run()