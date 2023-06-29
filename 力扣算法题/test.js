// 通过event实现一个简单的Promise/A 规范
class Promise extends EventEmitter {
    constructor() { }

    // 利用EventEmitter.once实现一次回调执行
    then(resolve, reject, process) {
        this.once("resolve", resolve)
        this.once("reject", reject)
        this.once("process", process)
    }

    all(promiseArr) {
        promiseArr.forEach(p => {
            // ...
        })
    }
}
