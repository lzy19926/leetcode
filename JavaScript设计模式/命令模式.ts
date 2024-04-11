


// 命令模式作用
// 1. 可以先创建命令 然后延后执行
// 2. 可以传递命令,实现远程调用
// 3. 可以使用命令内部记录操作
// 4. 命令可以撤销, 重启
// 5. 多个命令又可以相互组合成宏命令(组) 或者原子命令


// commend类接口定义(封装命令的execute,pause,redo等等)
interface Command {
    execute: Function
    pause: Function
    redo: Function
}

// Cooker类
class Cooker {
    finishedDist: number = 0
    timer: any

    cook() {
        this.timer = setInterval(() => {
            this.finishedDist++
        }, 1000 * 5)
        console.log("start cooking")
    }

    stop() {
        this.timer && clearInterval(this.timer)
        console.log("stop cooking")
    }
}

//
class CookCommand implements Command {
    constructor(private cooker: Cooker) { }
    execute() {
        this.cooker.cook()
    }
    pause() {
        this.cooker.stop()
    }
    redo() {
        this.cooker.stop();
        this.cooker.cook()
    }
}

// 创建commend
let cooker = new Cooker()
let cookCommand = new CookCommand(cooker)

// ---------------宏命令(一组命令的集合)----------------------------------
class MacroCommand {
    commandList: Command[] = []
    constructor() { }

    add(c: Command) {
        this.commandList.push(c)
    }

    execute() {
        this.commandList.forEach(c => c.execute)
    }
}


// 添加多个宏命令
const macroCommand = new MacroCommand()
macroCommand.add(cookCommand)
macroCommand.add(cookCommand)
macroCommand.add(cookCommand)

// 批量执行命令
macroCommand.execute()




type P = Promise<T>