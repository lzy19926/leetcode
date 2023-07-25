
// 汇编实现switch case
//  先实现跳转表  有3个分支
L_table:
    .quad   L_case0     # case 0
    .quad   L_case1     # case 1
    .quad   L_case2     # case 2
    .quad   L_default   # default

Case 0
.L1 
  jmp .L4  ; 执行操作,否则跳转到L4
Case 1
.L2 
  jmp .L4  ; 执行操作,否则跳转到L4
Case 2
.L3 
  jmp .L4  ; 执行操作,否则跳转到L4
Default case
.L4 