//TODO 可取消的Promise拓展 - 包装一层
//实际上请求仍然发出去了  在浏览器中可看到请求未被canceled 只是调用方拿不到请求
function makePromiseCancelable(promise) {
  let canceled = false

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(val => {
      canceled ? reject({ canceled: true }) : resolve(val)
    })
    promise.catch(val => {
      canceled ? reject({ canceled: true }) : resolve(val)
    })
  })

  return {
    promise: wrappedPromise,
    cacncel: () => { canceled = true }
  }
}
