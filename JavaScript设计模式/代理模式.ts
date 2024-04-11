//
class MyImage {
    imgNode: HTMLImageElement

    constructor() {
        this.imgNode = document.createElement('img')
    }
    // 设置src
    setSrc(src: string) {
        this.imgNode.src = src
    }
}

// 代理模式间接访问Img
class ProxyImage {
    setSrc(src: string) {
        let myImg = new MyImage()
        myImg.setSrc('-------占位图片src------')
    }
}

// ----------通过组合实现代理模式-------------
// 一个利用栈结构的计算器
class StackCaculator {
    add(a: number, b: number) { return a + b }
    min(a: number, b: number) { return a - b }
}

// 安全计算器代理类
// 需要对StackCaculator上的部分方法进行代理, 补充额外校验逻辑
class SafeCaculator {
    caculator: StackCaculator

    constructor(caculator: StackCaculator) {
        // 进行组合
        this.caculator = caculator
    }

    add(a: number, b: number) {
        this.checkNumberArgs(a, b)
        return this.caculator.add(a, b)
    }
    min(a: number, b: number) {
        this.checkNumberArgs(a, b)
        return this.caculator.min(a, b)
    }
    // 数字参数校验
    checkNumberArgs(...args: any[]) {
        for (let i = 0; i < args.length; i++) {
            if (typeof args[i] !== 'number') {
                return new Error("Arguments must be an Number")
            }
        }
    }
}

// -----------猴子补丁-对象增强----------------
// todo 如果原对象只有少数几个方法需要做代理, 则最好使用对象增强
// ! 风险 会修改原对象 导致其他调用位置不知道出现什么问题
function createSafeCaculator_patch(caculator: StackCaculator) {
    // 增强某些方法
    const originAdd = caculator.add
    // 添加额外逻辑
    caculator.add = function (...args) {
        return originAdd(...args)
    }

    return caculator
}

// ---------直接使用Proxy进行代理 并不完全浏览器支持-----------------
function createLoggingCaculator(caculator: StackCaculator) {
    return new Proxy(caculator, {

        get(target, propKey) {
            // 访问add方法时, 进行额外操作
            if (propKey == "add") {
                return function (a: number, b: number) {
                    console.log("执行了add方法,记录日志");
                    return caculator.add(a, b)
                }
            }

            // 其他方法直接返回
            return target[propKey]
        }
    })
}