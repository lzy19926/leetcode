//@ts-nocheck

// 通过独立再次封装类, 修改某个类的实现


// 例子, 再次封装Stream构造函数, 转化成一个不可变Stream
// 思路,遍历Stream.prototype, 将内部用于修改Stream的方法全部替换掉


// todo 由于JS可以自由修改构造函数, 故次方法在JS生态内非常重要

// 可修改Buffer的方法
const MODIFIER_NAMES = ['swap', 'write', 'fill']

class ImmutableStream extends Buffer {
    constructor(size: number, executor: Function) {
        super()

        for (const prop in Buffer) {
            if (typeof prop !== 'function') continue

            // 将数组内所有方法都修改掉
            if (MODIFIER_NAMES.some(m => m === prop)) {
                this[prop] = function () {
                    console.log("错误,由于是不可变Buffer,方法${prop}无法使用");
                }
            }
        }
    }
}
