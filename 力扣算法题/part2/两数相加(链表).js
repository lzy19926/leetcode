
// 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

// 请你将两个数相加，并以相同形式返回一个表示和的链表。

// 你可以假设除了数字 0 之外，这两个数都不会以 0 开头。


function addTwoNumbers(l1, l2) {
    let longerList = l1?.length >= l2?.length ? l1 : l2
    let shoutterList = l1?.length < l2?.length ? l1 : l2

    for (let i = 0; i < longerList.length; i++) {
        let l1n = longerList[i] ? longerList[i] : 0
        let l2n = shoutterList[i] ? shoutterList[i] : 0

        longerList[i] = l1n + l2n
        if (longerList[i] > 9) {
            longerList[i] = longerList[i] - 10

            if (typeof longerList[i + 1] == 'number') {
                longerList[i + 1]++
            } else {
                longerList[i + 1] = 1
            }

        }
    }


    return longerList
};


let l1 = [2,4,3], l2 = [5,6,4]

console.log(addTwoNumbers(l1, l2));
