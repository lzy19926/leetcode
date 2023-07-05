var assert = require('assert')
const { Console } = require('console')

let res = Math.max(1, 100)
let aim = 100
// assert模块的API
assert.ok(res, aim)           // 为true
assert.equal(res, aim)        // 相等
assert.notEqual(res, aim)
assert.deepEqual(res, aim)    // 深度相等
assert.notDeepEqual(res, aim)
assert.strictEqual(res, aim)  // 严格相等
assert.notStrictEqual(res, aim)
assert.throws(res, aim)       // 异常