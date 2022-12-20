
//给你一个字符串 s，找到 s 中最长的回文子串。

// 如果字符串的反序与原始字符串相同，则该字符串称为回文字符串。

//TODO 中心扩散法。 中心扩散法怎么去找回文串？ 从每一个位置出发，向两边扩散即可。遇到不是回文的时候结束
// 两种情况 一种是回文子串长度为奇数（如aba，中心是b） 另一种回文子串长度为偶数（如abba，中心是b，b）
// 循环遍历字符串 对取到的每个值 都假设他可能成为最后的中心进行判断


/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    if (s.length<2){
        return s
    }
    let res = ''
    for (let i = 0; i < s.length; i++) {
        // 回文子串长度是奇数
        helper(i, i)
        // 回文子串长度是偶数
        helper(i, i + 1) 
    }

    function helper(m, n) {
        while (m >= 0 && n < s.length && s[m] == s[n]) {
            m--
            n++
        }
        // 注意此处m,n的值循环完后  是恰好不满足循环条件的时刻
        // 此时m到n的距离为n-m+1，但是mn两个边界不能取 所以应该取m+1到n-1的区间  长度是n-m-1
        if (n - m - 1 > res.length) {
            // slice也要取[m+1,n-1]这个区间 
            res = s.slice(m + 1, n)
        }
    }
    return res
};
