//@ts-nocheck

import cluster from 'cluster';
import { once } from "events"
import { cpus } from 'os';
import Koa from "koa"


// 启动Koa服务器
function startServer() {
  new Koa().listen(8080, () => console.log(`服务启动在8080端口,pid:${process.pid}`))
}

// 重启所有服务器
async function restartAllWorkers() {
  const workers = Object.values(cluster.workers)

  for (const worker of workers) {
    worker.disconnect()
    await once(worker, "exit")

    const newWorker = cluster.fork()
    await once(newWorker, "listening")
  }
}

// 基于cpu核心数 创建多个子进程
function forkWork() {
  const availableCpus = cpus()
  availableCpus.forEach(() => cluster.fork())
}

// 使用cluster模块  依据cpu核心数启动多个服务实例-当前脚本 (仅在主线程中使用)
// 子线程中开启服务
if (cluster.isPrimary) {
  forkWork()

  //一旦收到SIGUSR2信号  就重启所有worker实例
  // 这里通过UNIX信号机制触发, windows上则可以用socket信号
  process.on("SIGUSR2", restartAllWorkers)

} else {
  startServer()
}
