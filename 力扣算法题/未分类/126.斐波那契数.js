

// 126.斐波那契数列
var fib = function (n) {
  let prev = 0
  let cur = 1
  let MOD = 1000000007

  if (n === 0) return 0
  if (n === 1) return 1

  while (n > 1) {
    let nextPrev = cur
    cur = (prev + cur) % MOD
    prev = nextPrev
    n--
  }

  return cur
};


console.log(fib(4))
