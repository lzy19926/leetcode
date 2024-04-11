


// ------------Koa使用洋葱模型------------------------
// 比起Express,Koa的洋葱模型设计更优秀  前一个中间件完全执行完毕才会开始执行下一个中间件,
// 执行顺序为 1-2-3
async function koa_middleware1(params: any) {
  console.log("中间件1-启动");
  console.log("中间件1-结束");
}
async function koa_middleware2(params: any) {
  console.log("中间件2-启动");
  console.log("中间件2-结束");
}
async function koa_middleware3(params: any) {
  console.log("中间件3-启动");
  console.log("中间件3-结束");
}

(async () => {
  let res1 = await koa_middleware1(null)
  let res2 = await koa_middleware2(res1)
  let res3 = await koa_middleware3(res2)
})();



// ---------------Express使用的中间件模型--------------------
// 执行顺序为 1-2-3 3-2-1
// 而Express则是将中间件作为回调插入
async function exporess_middleware1(cb: any) {
  console.log("中间件1-启动");
}
async function exporess_middleware2(cb: any) {
  console.log("中间件2-启动");
}
async function exporess_middleware3(cb: any) {
  console.log("中间件3-启动");
}

((req, res) => {
  exporess_middleware1(exporess_middleware2(exporess_middleware3(null)))
})();

// 类似于这样
((req, res) => {
  console.log("中间件1-启动");
  ((req, res) => {
    console.log("中间件2-启动");
    ((req, res) => {
      console.log("中间件3-启动");
      console.log("中间件3-结束");
    })(req, res);
    console.log("中间件2-结束");
  })(req, res);
  console.log("中间件1-结束");
})();