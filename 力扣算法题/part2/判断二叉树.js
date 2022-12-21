



var isValidBST = function (root) {
    // 首先判断是否是合法二叉树(单数)
    let count = 0
    let isValid = true
    let rootNode = root[count]

    // 递归遍历二叉树
    function deep(parent) {
        let leftCount = count + 1
        let left = root[leftCount]

        let rightCount = count + 2
        let right = root[rightCount]

        count += 2

        // 判断当前节点是否合法
        if (left && right) {
            isValid = left < parent && right > parent
        }
        if (!left && !right) {
            isValid = true
        }
        if (left && !right) {
            isValid = false
        }
        if (!left && right) {
            isValid = false
        }

        if (count < root.length) {
            deep(right)
        }
    }
    deep(rootNode)

    return isValid
};


console.log(isValidBST([5, 1, 4, null, null, 3, 6]));
console.log(isValidBST([2, 1, 3]));
