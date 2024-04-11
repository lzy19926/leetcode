import profiler from 'v8-profiler-node8';
import autocannon from "autocannon"
import cluster from 'cluster';
import { cpus } from 'os';
import Koa from "koa"
import fs from "fs"



// CPU性能监视器
class CpuProfiler {
  constructor() {
    this.running = false
  }

  // 开启一个cpu监视任务  并导出为文件
  watch(time = 10, name = "test") {
    const that = this
    if (that.running == true) return

    console.log(`启动cpu监控:pid:${process.pid}`);

    profiler.setGenerateType(1);

    that.running = true
    profiler.startProfiling(name, true);

    setTimeout(() => {
      const profile = profiler.stopProfiling(name);

      profile
        .export()
        .pipe(fs.createWriteStream(`./${name}.cpuprofile`))
        .on('finish', () => {
          profile.delete()
          that.running = false
        });
    }, time * 1000);
  }
}


// 模拟CPU密集型任务
function testTask(ctx) {
  console.log(`handling request from pid:${process.pid}`);

  let i = 1e7; while (i > 0) { i-- }

  return `Hellow from pid:${process.pid}`
}

// 启动服务器
function startServer() {
  const app = new Koa()
  app.use(async (ctx) => {
    if (ctx.url === '/') {
      ctx.body = testTask(ctx)
    }
    else {
      ctx.body = "<div>404</div>"
    }
  })
  app.listen(8080, () => console.log(`服务启动在8080端口,pid:${process.pid}`))
}



// 使用cluster模块  依据cpu核心数启动多个服务实例-当前脚本 (仅在主线程中使用)
if (cluster.isPrimary) {
  const availableCpus = cpus()
  availableCpus.forEach(() => cluster.fork())
  // 开启cpu监控
  new CpuProfiler().watch(10)
  // 使用autocannon进行压力测试 或者使用代码
  // npx autocannon -c 200 -d 10 -p 1 http://localhost:8080/test
}
// 子线程中开启服务
else {
  startServer()
}
