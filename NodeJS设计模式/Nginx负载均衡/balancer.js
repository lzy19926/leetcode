/**
 * 简易负载均衡器实现
 *
*/

import { createServer } from 'http'
import consul from 'consul'         // Consul:分布式网络服务解决方案  用于与consul进行交互
import httpProxy from 'http-proxy'


// 需要的服务路由表
const routing = [
  {
    path: "/api",
    service: "api-service",
    index: 0
  },
  {
    path: "/api",
    service: "webapp-service",
    index: 0
  }
]


const consulClient = consul()
const proxy = httpProxy.createProxyServer()

const server = createServer((req, res) => {

  const route = routing.find(route => req.url.startWith(route.path))


  // 查找consulClient中所有服务列表
  consulClient.agent.service.list((err, services) => {

    if (err) {
      return res.end("Bad gateway", err)
    }

    // 通过tag获取需要的服务
    const servers = Object.values(services)
      .filter(service => service.Tags.includes(route.service))
    if (!servers.length) {
      return res.end("Bad gateway")
    }


    // 通过httpProxy创建一个代理 拦截httpServer的req,res 提供轮询负载均衡

    // 这行代码提供轮询算法  通过计算index,逐个发送请求
    route.index = (route.index + 1) % servers.length

    const server = servers[route.index]
    const target = `http://${server.Address}:${server.Port}`

    proxy.web(req, res, { target })
  })
})


server.listen(8080, () => {
  console.log("Load balancer started on port 8080");
})