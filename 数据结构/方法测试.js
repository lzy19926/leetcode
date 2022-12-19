


// --------------while循环测试-----------------------
console.time('time2')
let i=0
let result2 = 1
while(i<800){
    result2 = result2+i/3
    i+=1
}
console.log(result2);
console.timeEnd('time2')


console.time('time1')
let result = 1
for(let i=0;i<800;i++){
    result = result+i/3
}
console.log(result);
console.timeEnd('time1')