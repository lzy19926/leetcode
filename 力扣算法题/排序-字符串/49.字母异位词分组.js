// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// ate eat tea 都是由相同的三个字母组成的

// 方法1---------------使用map进行记录---------------
function ifCompare(object1, object2) {
  console.log(object1, object2);
  var o1keys = Object.keys(object1);
  var o2keys = Object.keys(object2);
  if (o2keys.length !== o1keys.length) return false;
  for (let i = 0; i <= o1keys.length - 1; i++) {
    let key = o1keys[i];
    if (!o2keys.includes(key)) return false;
    if (object2[key] !== object1[key]) return false;
  }
  return true;
}

var groupAnagrams2 = function (strs) {

  // 构建map
  const litterMap = new Map()

  for (let i = 0; i < strs.length; i++) {
    // 将单词转换为字母map 再进行检查
    let strMap = {}
    let str = strs[i]
    for (let j = 0; j < str.length; j++) {
      if (!strMap[str[j]]) { strMap[str[j]] = 1 }
      else { strMap[str[j]]++ }
    }

    console.log(strMap);
    // 遍历litterMap检查key是否存在

    let isAnagrams = false
    for (let item of litterMap) {
      let key = item[0]
      if (ifCompare(key, strMap)) {
        litterMap.get(key).push(str)
        isAnagrams = true
        break
      }
    }

    // 如果不存在  添加一个map
    if (!isAnagrams) {
      litterMap.set(strMap, [str])
    }
  }


  // 聚合结果
  let res = []
  for (let item of litterMap) {
    res.push(item[1])
  }

  return res
};

// groupAnagrams2(["eat", "tea", "tan", "ate", "nat", "bat"])


// 方法2 ------------------排序字母后进行判断---------------------
var groupAnagrams = function (strs) {
  // 这里将strs拷贝一份进行计算(后面都是用的copyStrs)
  let copyStrs = [...strs]

  // 记录map
  let resMap = {}

  for (let i = 0; i < copyStrs.length; i++) {
    let s = copyStrs[i].split("").sort().join("")
    // 推入结果数组
    typeof resMap[s] === "undefined"
      ? resMap[s] = [copyStrs[i]]
      : resMap[s].push(copyStrs[i])
  }

  // 聚合结果
  let res = []
  for (let key in resMap) {
    res.push(resMap[key])
  }

  return res
};


var groupAnagrams3 = function (strs) {
  // 记录map
  let resMap = {}

  for (let i = 0; i < strs.length; i++) {
    let s = strs[i].split("").sort().join("")
    // 推入结果数组
    typeof resMap[s] === "undefined"
      ? resMap[s] = [strs[i]]
      : resMap[s].push(strs[i])
  }

  // 聚合结果我
  let res = []
  for (let key in resMap) {
    res.push(resMap[key])
  }

  return res
};



// ----重写部分-----------------
// 使用长度为26的数组/对象作为key,判断是否相同
function groupAnagrams4(strs) {
  const cache = new Map()
  let result = []

  for (let i = 0; i < strs.length; i++) {
    const originKey = {
      'a': 0,
      'b': 0,
      'c': 0,
      'd': 0,
      'e': 0,
      'f': 0,
      'g': 0,
      'h': 0,
      'i': 0,
      'j': 0,
      'k': 0,
      'l': 0,
      'm': 0,
      'n': 0,
      'o': 0,
      'p': 0,
      'q': 0,
      'r': 0,
      's': 0,
      't': 0,
      'u': 0,
      'v': 0,
      'w': 0,
      'x': 0,
      'y': 0,
      'z': 0,
    }
    const word = strs[i]

    word.split('').forEach(litter => {
      originKey[litter]++
    })

    let key = JSON.stringify(originKey)
    debugger
    //
    if (cache.has(key)) {
      let idx = cache.get(key)
      result[idx].push(word)
    } else {
      let newIdx = result.length
      cache.set(key, newIdx)
      result.push([word])
    }
  }

  return result
}

console.log(groupAnagrams4(["eat", "tea", "tan", "ate", "nat", "bat"]));
