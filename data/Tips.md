##软件使用小技巧

###AI快捷键
在将图片与编组图形进行剪贴蒙版操作前，先使用快捷键`Ctrl+8`将编组图形变为复合路径，再进行剪贴蒙版操作就没有问题了

###Chrome查找内容
`Ctrl+F`可以查找网页内相应文字
`Ctrl+E`搜索输入的文字
`Ctrl+L`切换到地址栏
`Ctrl+T`打开新标签页
`Ctrl+D`加入收藏夹
`Ctrl+H`查看历史记录

###Css生成内容

css即层叠样式表(Cascading Style Sheets)，一般主要是用来修饰效果，页面布局等。但是也是可以用来修改内容的，这在有些时候非常有用。

html:

	<div class="task" data-task-owner="Joe">mop kitchen</div>
	<div class="task" data-task-owner="Charles" data-apos="1">vacuum hallway</div>

css:

	div.task:before { content: attr(data-task-owner)"'s task - " ; }
	div.task[data-apos]:before { content: attr(data-task-owner)"' task - " ; }

result:

	Joe's task - mop kitchen
	Charles' task - vacuum hallway

[原文链接](http://i.rexdf.org/blog/2014/11/06/csssheng-cheng-nei-rong/)


###Git小贴士

`git commit -m "description"` 保存改动

`git push oripin gh-pages` 上传改动

`git merge develop` 将develop分支于当前分支合并

###LaTeX使用xeLaTeX编译
在首行插入`%!TEX program = xelatex` 即可使用xeLaTeX进行编译

###Windows中文字体
`cmd`命令行下输入`fc-list :lang=zh-cn`可以查询所有安装的中文字体

###MySQL使用
1. 管理员身份打开命令行窗口
2. `net start MySQL` 启动MySQL
3. `net stop MySQL` 关闭MySQL
4. 命令行 `mysql -uroot -p`进入mysql
5. `show databases`, `use ***`,`show tables`,`describe ***`,`select * from ***`
