##软件使用小技巧

###AI快捷键
在将图片与编组图形进行剪贴蒙版操作前，先使用快捷键`Ctrl+8`将编组图形变为复合路径，再进行剪贴蒙版操作就没有问题了

###Chrome查找内容
按`Ctrl+F`可以查找网页内相应文字

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