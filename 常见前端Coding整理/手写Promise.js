
export default class MyPromise {

  constructor(executor) {
    this.promiseState = 'pending'
    this.promiseResult = null
    this.callbackQueue = []

    // 首先定义resolve和reject函数,将其抛出给executor
    const that = this

    const resolve = (value) => {   // 修改状态并调用所有成功回调
      if (that.promiseState === "pending") {
        that.promiseState = 'resolved'
        that.promiseResult = value
        that.callbackQueue.forEach(item => {
          item.onResolve(that.promiseResult)
        })
      }
    }

    const reject = (error) => {   // 修改状态并调用所有失败回调
      if (that.promiseState === "pending") {
        that.promiseState = 'reject'
        that.promiseResult = error
        that.callbackQueue.forEach(item => {
          item.onReject(that.promiseResult)
        })
      }
    }

    // 执行executor,返回一个Promise
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }

    return this
  }

  // then方法 包装传入的执行器,返回新的Promise
  then(onResolve, onReject) {
    const that = this

    if (typeof onReject !== "function") {
      onReject = (error) => { throw error }
    }

    if (typeof onResolve !== "function") {
      onResolve = (value) => { return value }
    }

    return new MyPromise((resolve, reject) => {
      // 判断状态, 触发对应的回调 , 状态还未改变时先保存这些回调进入队列
      if (this.promiseState === "resolved") {
        setTimeout(() => { callback(onResolve) })
      }
      if (this.promiseState === "reject") {
        setTimeout(() => { callback(onReject) })
      }
      if (this.promiseState === "pending") {
        this.callbackQueue.push({
          onResolved: function () { callback(onResolve) },
          onRejected: function () { callback(onReject) }
        })
      }

      // 封装回调  先解开这一层的Promise,判断是否是Promise,是则继续执行下一层的then方法
      // 否则直接执行最终resolve
      function callback(onResolveOrReject) {
        try {
          let result = onResolveOrReject(that.promiseResult)

          if (result instanceof MyPromise) {
            result.then(
              v => { resolve(v) },
              e => { reject(e) }
            )
          } else {
            resolve(v)
          }
          // 如果监测到了reject抛出的异常,则捕获
        } catch (e) {
          reject(e)
        }
      }
    })

  }

  // catch方法封装 直接调用then方法返回下一层的promise
  catch(onReject) {
    return this.then(undefined, onReject)
  }

  // 封装其他Promise实例的静态方法

  // resolve方法 直接返回一个promise,执行器内传入value并触发Promise链条
  static resolve(valueOrPromise) {
    return new MyPromise((resolve, reject) => {
      if (valueOrPromise instanceof MyPromise) {
        valueOrPromise.then(
          v => { resolve(v) },
          e => { reject(e) }
        )
      } else {
        resolve(valueOrPromise)
      }
    })
  }
  // reject方法 返回promise,触发链条执行,在最后执行reject抛出
  static reject(errorOrPromise) {
    return new MyPromise((resolve, reject) => {
      if (errorOrPromise instanceof MyPromise) {
        errorOrPromise.then(
          v => { resolve(v) },
          e => { reject(e) }
        )
      } else {
        reject(errorOrPromise) // 最终触发reject
      }
    })
  }
  // all方法封装
  static all(promiseArr) {
    return new MyPromise((resolve, reject) => {
      let count = promiseArr.length
      let resultArr = []

      // 执行全部promise ,
      // 全部执行完毕  触发resolve,返回最终结果
      // 单个执行失败整体失败
      for (i = 0; i < promiseArr.length; i++) {
        const handleResolve = v => {
          count--
          resultArr[i] = v
          if (count === 0) {
            resolve(resultArr)
          }
        }
        const handleReject = e => {
          reject(e)
        }
        promiseArr[i].then(handleResolve, handleReject)
      }
    })
  }
  // race方法封装

}
