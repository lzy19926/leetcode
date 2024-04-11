// import React, { useState, useCallback } from 'react';
// import ReactDom from 'react-dom';
// 以下代码尽可能完善，并在下面的 Test 组件中进行测试使用

// 第一题
// 实现一个求和函数，满足以下测试用例 console打印结果
// sum(1,2,3)=>6
// sum(1,2)=>3
// sum:



// 第二题
// 实现一个异步获取数字的函数 fetchNum(num1: number): Promise<number>
// fetchNum:



// 第三题
// 实现 asyncSum 函数，要求每个参数都要通过 fetchNum 获取到新数字后再求和 console打印结果
// asyncSum:
// asyncSum(1,2,3)=>Promise<6>
// asyncSum(1,2)=>Promise<3>



// 第四题
// 实现一个 get 函数， 根据 object 对象的 path 路径获取值
const object = { a: [{ b: { c: 3 } }] };
function get(data, path) {

}

get(object, 'a[0].b.c');


// 第五题
// 实现自定义 Hook useCount(id: string, count: number) => newCount
// 要求传入元素的 id（elementId），为获取到的 DOM 元素添加 click 事件，
// 每次触发 click 事件，count + 1 并返回新的计数值



// useCount
const Test = function () {
    // 你可以在这里测试 useCount 自定义 Hook
    // const count = useCount('div1', 1);
    // return <div id='div1'>点击我 {count} 次</div>;


    return 'Hello world';
};

ReactDom.render(<Test />, document.getElementById('app'));
