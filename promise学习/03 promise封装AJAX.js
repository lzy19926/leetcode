

//使用promise封装Ajax请求 

// 传入url 使用promise进行ajax的get请求 
function sendAjax(url){
    return new Promise((resolve,reject)=>{
         
        // 创建ajax对象 进行请求
        const xhr= new XMLHttpRequest();
        // 初始化
        xhr.open('GET',url)
        // 发送
        xhr.send()
        // 处理响应结果 (当state改变时)
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4){
                // 判断响应状态码state  如果响应码是2xx
                if(xhr.status>=200 && xhr.status<=300){
                    resolve(xhr.response)// 成功调用回调1
                }else{
                    reject(xhr.status) // 失败调用回调2
                }
            }
        }
    




    })
}