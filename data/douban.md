豆瓣笔记
==

###Linux
+ `source $HOME/.bash_profile`  
  立即应用bash的设置
+ `ln -sf path1 path2`  
  path2 指向 path1
+ `find ./ -name '*.* | xargs grep 'data'`  
  在./下寻找包含data字样的任意名称后缀名的文件
+ `ps aux | grep name`  
  查找name创建的进程
+ `ls ./ -alh`  
  查看文件所有者
+ `chmod a+x filename`  
  文件变可执行

###Git
+ `git fetch remotename`  
  从远程仓库拉取代码
+ `git rebase remotename/branchname`  
  重新整理commit于远程分支commit后面  
+ `git rebase -i SHA1`  
  以SHA1指向的commit为基础rebase你的commits  
+ `git update-index --assume-unchanged ***`  
  忽略对某文件的改动  
+ `git rm --cached ***`  
  将某个文件的改动移出缓存区
+ `git branch -a`  
  查看分支信息  
+ `git branch -r -d remotename/branchname`  
  删除本地分支和远程指向，不加-r则只删除本地
+ `git push remotename :branchname`  
  删除远程分支
