
// 

function executor(resolve, reject) {
    setTimeout(reject, 1000, 'bar');
    debugger
}

function foo() {
    new Promise(executor);
}

//  ---Uncaught (in promise) bar
// setTimeout 
// setTimeout (async)  
// executor
// foo2


async function foo2() {
    await new Promise(executor);
}

// ---Uncaught (in promise) bar 
// executor
// foo



debugger
foo();
// foo2();