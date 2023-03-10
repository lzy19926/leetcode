// 需求 :输入：s = "Hello how are you Contestant", k = 4
// 输出："Hello how are you"
// 解释：
// s 中的单词为 ["Hello", "how" "are", "you", "Contestant"]
// 前 4 个单词为 ["Hello", "how", "are", "you"]
// 因此，应当返回 "Hello how are you"

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/truncate-sentence
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。



const s = "Hello how are you Contestant"
// 普通写法
var truncateSentence = function(s, k) {
    let arr = s.split(' ')
    let resultStr = ''
    for(let i=0;i<k;i++){
        resultStr+=' '+arr.shift()
    }    
    return resultStr.trim()
};

// 简化写法
const truncateSentence = (s, k) => {
    const arr = s.split(' ').slice(0, k);
    return arr.join(' ');
};

console.log(truncateSentence(s,4));