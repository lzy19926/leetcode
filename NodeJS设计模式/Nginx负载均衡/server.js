
import { createServer } from 'http'
import consul from 'consul'         // Consul:分布式网络服务解决方案  用于与consul进行交互
import portfinder from 'portfinder' // 空余端口搜寻
import { nanoid } from 'nanoid'     // 随机ID生成


const serviceType = process.argv[2]
const { pid } = process


async function main() {
  const serviceId = nanoid()
  const consulClient = consul()
  const freePort = await portfinder.getPortPromise()


  // 注册consul服务
  function registerService() {
    consulClient.agent.service.register({
      id: serviceId,
      name: serviceType,
      address: "localhost",
      port: freePort,
      tags: [serviceType]
    }, () => {
      console.log(`${serviceType},registered successfully`);
    })
  }
  // 注销consul服务
  function unRegisterService(err) {
    err && console.error(err)
    console.log(`unRegister id:${serviceId}`);

    consulClient.agent.service.deregister(serviceId, () => {
      process.exit(err ? 0 : 1)
    })
  }

  // 进程出错时注销consul服务
  process.on("exit", unRegisterService)
  process.on("uncaughtException", unRegisterService)
  process.on("SIGINT", unRegisterService)

  // 创建web服务器
  const server = createServer((req, res) => {
    let i = 1e7; while (i > 0) { i-- }
    console.log(`Handing request from ${pid}`);
    res.end(`${serviceType} response from ${pid} \n`)
  })

  server.listen(port, localhost, () => {
    registerService()// 注册当前web服务为一个consul服务(进入注册表)
    console.log("服务启动在", port, pid);
  })
}


main().catch(err => {
  console.log(err);
  process.exit(1)
})