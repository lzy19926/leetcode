/*
 * @Author: 
 * @Date: 2023-06-12 18:34:58
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-07-24 13:00:46
 * @Description: 
 */

// C语言代码 
int accum = 0;
int sum(int x，int y)
{
    int t = x + Y;
    accum += t;
    return t;
}


// 产生的汇编
// 每个缩进是一条机器指令
sum:
pushl %ebp           //将寄存器%ebp的内容压入程序栈中
movl %esp, %ebp      //存储当前栈指针到基址指针%ebp中
mov1 12(%ebp), %eax  //将参数2（第一个参数在8(%ebp)）从内存在地址为 base_ptr+12 的字节处移动到累加器eax中 
add1 8(%ebp), %eax   //加上参数1，将结果保存在累加器eax中
addl %eax, accum     //累加本次计算结果，并将结果存储在名为 'accum' 的变量或地址处。
movl %ebp,%esp       //恢复栈指针为前一个基址值.
popl %ebp            //取出以前现场保护好的基址. 
ret                  //返回子过程/函数,



char            字节        单个字符
short           字          短整型 
int             双字        32位整数类型
unsigned        双字        无符号整型
long int        双字        长整数类型
unsigned long   双字        长无符号整型       
float           单精度   
double          双精度
long double     扩展精度





双字
双字
双字
双字


