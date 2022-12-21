
// 字典序:

var nextPermutation = function (nums) {
    // 从末尾到头 先找到
    // 最大字典序为倒序排序 所以找到最后一个不按倒序排列的数字(快速排序思想  右边的数字比左边的大)
    // 先找到较小数(右比左大)

    let min = 0;
    let max = 0;

    for (let i = nums.length - 1; i > 0; i--) {
        if (nums[i - 1] < nums[i]) {
            console.log(i - 1);
            min = nums[i - 1]
            break
        }
    }
    // 寻找较大数(比最小数大的最小数)
    for (let i = nums.length - 1; i > 0; i--) {
        if (nums[i] > min) {
            if (!max) {
                max = nums[i]
            }
            if (nums[i] < max) {
                max = nums[i]
            }
        }
    }


};

nextPermutation([4, 5, 2, 6, 3, 1])