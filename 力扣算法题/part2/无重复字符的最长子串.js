// 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

function has(arr, s) {
    return arr.indexOf(s) != -1
}

var lengthOfLongestSubstring = function (s) {
    // 扫描s 用set记录字符, 当出现重复字符时,更新最长字串的长度
    // 删除重复字符之前的部分, 后续部分算作不重复字符继续处理
    let subString = []
    let maxLength = 0

    for (let i = 0; i < s.length; i++) {
        // 挨个扫描字符,检查subString是否有字符
        if (has(subString, s[i])) {
            // 如果发现重复的,删除重复字符之前的那一部分
            let prevS = subString.indexOf(s[i])
            subString = subString.slice(prevS + 1)
        }
        // 推入本次字符
        subString.push(s[i])

        // 更新最长字符
        maxLength = subString.length > maxLength ? subString.length : maxLength 
    }

    return maxLength
};





let s = "asjrgapa"
console.log(lengthOfLongestSubstring(s));