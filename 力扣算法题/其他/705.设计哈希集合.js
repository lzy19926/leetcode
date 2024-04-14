// https://leetcode.cn/problems/design-hashset/description/?envType=daily-question&envId=2024-04-14
// 705. 设计哈希集合 set


// 思路
// 只考虑往哈希表里插入整数类型的key,
// 根据插入的key计算其hash


// 哈希表是数组 其index对应一个hash,
// 内部保存数组, 存放相同hash的key
// 如base为769, 1,770... 为相同hash的key

// hash     value
// 0        0->769...
// 1        1->770...
// 2        2->771...
// ...
// 768      768->1537...

var MyHashSet = function () {
    this.BASE = 769
    this.data = new Array(this.BASE).fill(0).map(() => new Array());
};

/**
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.hash = function (key) {
    return key % this.BASE
};


/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.add = function (key) {
    const h = this.hash(key);
    const bucket = this.data[h]

    for (const element of bucket) {
        if (element === key) return;
    }

    bucket.push(key)
};

/**
 * @param {number} key
 * @return {void}
 */
MyHashSet.prototype.remove = function (key) {
    const h = this.hash(key);
    const bucket = this.data[h]

    for (let i = 0; i < bucket.length; ++i) {
        if (bucket[i] === key) {
            bucket.splice(i, 1);
            return;
        }
    }
};

/**
 * @param {number} key
 * @return {boolean}
 */
MyHashSet.prototype.has = function (key) {
    const h = this.hash(key);
    const bucket = this.data[h]

    for (const element of bucket) {
        if (element === key) return true;
    }
    return false;
};
