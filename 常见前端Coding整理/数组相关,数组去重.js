//TODO 实现map方法
Array.prototype.myMap = function (fn, context) {
  let arr = this
  let result = []

  for (let i = 0; i < arr.length; i++) {
    let resItem = fn.call(context, arr[i], i)
    result.push(resItem)
  }

  return result
};

console.log([1, 2, 3].myMap((item) => {
  return 1 + item
}));

//TODO 实现reduce方法
Array.prototype.myReduce = function (fn, initValue) {

  let arr = this
  let res = initValue ? initValue : arr[0]
  let startIdx = initValue ? 0 : 1

  for (let i = startIdx; i < arr.length; i++) {
    res = fn.call(null, res, arr[i], i, this)
  }

  return res
}


//TODO 数组去重方案
let arr = [1, 1, 2, 2, 3]
// set+Array.form
let resultArr = Array.from(new Set(arr))


//TODO  数组扁平化方案
function flatten(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}

function flatten(arr) {
  return arr.reduce((p, c) => {
    return p.concat(Array.isArray(c) ? flatten(c) : c);
  }, [])
}