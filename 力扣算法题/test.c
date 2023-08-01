void combine1(vec_ptr v, data_t *dest)
{
  int i;
  for (i = 0;i < vec_length(v); i++) {}
}


void combine2(vec_ptr v, data_t *dest)
{
  int i;
  ## 将原先在for循环中的计算移动到上面
  int lengh =  vec_length(v)  
  for (i = 0;i < lengh; i++) {}
}