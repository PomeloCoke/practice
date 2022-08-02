#!/bin/bash

temp_src="template/*"
echo -n "请输入需要被复制的项目文件夹路径："
read path
echo -n "确定要复制到 ${path} 中吗？(y/n)"
read user_confirm

if [ "$user_confirm" == "y" ]
then
  echo "确认复制 ${temp_src}"
  
  cp -r $temp_src $path
else
  echo '取消复制'
fi