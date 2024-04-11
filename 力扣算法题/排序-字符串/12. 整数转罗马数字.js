// 12. 整数转罗马数字
// https://leetcode.cn/problems/integer-to-roman/description/?envType=study-plan-v2&envId=top-interview-150


var intToRoman = function (num) {
  // 列举罗马字母的所有组合
  // 由于罗马字母是优先选最大值, 将其从大到小排列
  const valueSymbols = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  // 持续从num中减去一个罗马数字的值
  const roman = [];
  for (const [value, symbol] of valueSymbols) {
    while (num >= value) {
      num -= value;
      roman.push(symbol);
    }
    if (num == 0) {
      break;
    }
  }
  return roman.join('');
};
