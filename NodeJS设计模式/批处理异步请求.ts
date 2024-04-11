// todo 方案一: 将同一个API发出的调用请求  合并成一个批次进行处理batching
// todo 方案二: 缓存处理结果- 针对多次相同api调用
// 一般将上述两种方案进行结合, 批处理+缓存同时进行


// 异步查找数据库,计算累加
async function totalSales(product: string) {
  let sum = 0
  let dbResult = [1, 2, 3, 4, 5]
  for await (let sale of dbResult) {
    sum += sale
  }

  return sum
}

// cache中保存了正在执行的Promise任务  或者任务结果
const cache: Map<string, Promise<any>> = new Map()
const CACHE_TTL = 30 * 1000

function totalSalarys(product: string) {
  // 如果有值,直接查找返回结果
  // (批处理: 针对同一个product查询,如果这个product在查询中,则直接复用查询结果)
  if (cache.has(product))
    return cache.get(product)


  // 否则启动一个数据库查找任务并储存
  const resultPromise = totalSales(product)

  cache.set(product, resultPromise)

  // 任务执行完毕 缓存结果, 设置TTL  错误处理
  resultPromise
    .then(() => {
      setTimeout(() => {
        cache.delete(product)
      }, CACHE_TTL)
    })
    .catch(err => {
      cache.delete(product)
      throw new Error(err)
    })

  return resultPromise
}



// 取消异步请求方案
// 使用包装器将异步函数包装为可终止函数
function createCaccelWrapper() {
  let cancelRequest = false

  //内部提供中断操作
  function cancel() {
    cancelRequest = true
  }

  //内部提供包装器
  function cancelWrapper(func: Function, ...args: any[]) {
    if (cancelRequest) {
      return Promise.reject(new Error(`函数${func.name}被取消`))
    }

    return func(...args)
  }


  // 返回包装器和中断器
  return { cancelWrapper, cancel }
}
