

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

// 有效字符串需满足：

// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。



var isValid = function(s) {
    let stark1 = s.split('')
    let stark2 = []
    let num = stark1.length
   
    // for循环  准备两个栈 a,b 
    // 将a,b栈的最后一位进行匹配  匹配上了同时弹栈
    // 未匹配上  则将a栈的最后一项push到b栈去

    for(let i = 0;i<num;i++){
        // 找到两个栈的最后一项
        let a = stark1[stark1.length-1]
        let b = stark2[stark2.length-1]

        if(a==='(' && b===')'){
            stark1.pop()
            stark2.pop()
        }else if(a==='{' && b==='}'){
            stark1.pop()
            stark2.pop()
        }else if(a==='[' && b===']'){
            stark1.pop()
            stark2.pop()
        }else {
            stark2.push(stark1.pop())
        }
        
    }
    if(stark1.length===0&&stark2.length===0) return true
                                             return false
};


console.log(isValid("{[]}"));


var isValid = function(s) {
    let stark1 = s.split('')
    let stark2 = []
    let num = stark1.length

    for(let i = 0;i<num;i++){
        let a = stark1[stark1.length-1]
        let b = stark2[stark2.length-1]

        switch(a){
            case '(': if(b==')') stark1.pop();stark2.pop();
            break

            case '{': if(b=='}') stark1.pop();stark2.pop();
            break

            case '[': if(b==']') stark1.pop();stark2.pop();
            break

            default: stark2.push(stark1.pop())
        }
    }
    if(stark1.length===0&&stark2.length===0) return true
                                             return false
};
