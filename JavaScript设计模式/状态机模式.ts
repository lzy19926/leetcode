
// class Light {

//     state: string // 内部状态

//     // 切换状态方法  这里定义三种状态
//     press() {
//         if (this.state === '关闭') {
//             this.state = '弱光'
//         }
//         else if (this.state === '弱光') {
//             this.state = '强光'
//         }
//         else if (this.state === '强光') {
//             this.state = '关闭'
//         }
//     }
// }

// 将状态 和状态对应的行为 封装为单独的类

interface LightState {
    name: string
    state: string
    nextState: string//todo 状态迁移一般让state自己定义, 这样最灵活
}

class Off implements LightState {
    name = "关闭"
    state = "off"
    nextState = "weakLight"
}

class WeakLight implements LightState {
    name = "弱光"
    state = "weakLight"
    nextState = "strongLight"
}

class StrongLight implements LightState {
    name = "强光"
    state = "strongLight"
    nextState = "off"
}

class Light {
    // 保存状态对象
    private states: Map<string, LightState>
    private currentState: LightState

    // 初始化状态
    constructor() {
        this.states = new Map()
        this.currentState = new Off()
        this.states.set("off", new Off())
        this.states.set("weakLight", new WeakLight())
        this.states.set("strongLight", new StrongLight())
    }

    getState() {
        return this.currentState.name
    }

    // 状态对应的行为  如果相同 可以单独抽出
    press() {
        const nextState = this.currentState.nextState
        const newState = this.states.get(nextState)

        if (!newState) {
            return new Error("状态off未注册")
        }

        console.log(`当前状态:${this.currentState.name},  切换为:${newState?.name}`);
        this.currentState = newState
    }
}



// 使用
const light = new Light()
light.press()
light.press()
light.press()