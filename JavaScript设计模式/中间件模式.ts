
// 企业开发中的中间件
// 指对底层机制(操作系统API 网络通信机制  内存管理机制等)做出抽象的套件,
// 它们使得开发者将精力集中在业务逻辑开发上


// NodeJS平台中的中间件
// 一组函数表示处理单元, 链接成一条异步队列   形成一条处理管道


// mid_in
// mid_in
// mid_in
// {中间逻辑}
// mid_out
// mid_out
// mid_out


// 中间件函数  使用next进行调用
// 中间件分为前置 后置中间件
interface Middleware {
    inBound: boolean
    outBound: boolean
    call: (req: Request) => Promise<Request>
}

type Options = { inBound?: boolean, outBound?: boolean }

// 定义一个中间件  用来处理req
class ReqMiddlewareManager {

    inboundMiddleware: Middleware[] = []
    outboundMiddleware: Middleware[] = []

    constructor() { }

    use(m: Middleware) {
        if (m.inBound) {
            this.inboundMiddleware.unshift(m)
        }
        if (m.outBound) {
            this.outboundMiddleware.push(m)
        }
    }

    async executeMiddleware(middles: Middleware[], req: Request) {
        let currentReq = req
        for (let m of middles) {
            currentReq = await m.call(currentReq)
        }

        return currentReq
    }

    async parseReq(req: Request) {
        const req_0 = req

        const req_1 = await this.executeMiddleware(this.inboundMiddleware, req_0)
        const req_2 = await this.executeMiddleware(this.outboundMiddleware, req_1)

        const finalReq = req_2
        return finalReq
    }
}

class BaseMiddleware {
    inBound: boolean = false
    outBound: boolean = false
    constructor(options: Options) {
        this.inBound = options.inBound || false
        this.outBound = options.outBound || false
    }
}

class PathResolver extends BaseMiddleware {
    constructor(option: Options) {
        super(option)
    }

    async call(req: Request) {
        return req
    }
}

class BodyParser extends BaseMiddleware {
    constructor(option: Options) {
        super(option)
    }

    async call(req: Request) {
        return req
    }
}


const req: any = {}
const manager = new ReqMiddlewareManager()

manager.use(new PathResolver({ inBound: true }))
manager.use(new BodyParser({ inBound: true }))
manager.use(new PathResolver({ outBound: true }))
manager.use(new BodyParser({ outBound: true }))

manager.parseReq(req)