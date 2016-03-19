Python操作
===

### 数据结构

#### collections.deque模块
有限的序列
```
from collections import deque
lines = deque(maxlen=5)
lines.append(1)
lines.appendleft(1)
lines.pop()
lines.popleft()
```

#### heapq模块
HEAP堆
```
import heapq

nums=[1,2,3]
heapq.nlargest(2,nums)
heapq.nsmallest(2,nums)

nums2=[{"name":"A","price":1},{"name":"B","price":2},{"name":"C","price":3}]
heapq.nlargest(2,nums2,key=lambda s:s['price'])
heapq.nsmallest(2,nums2,key=lambda s:s['price'])

heapq.heapify(list) #将list增序排列
heapq.heappop(list) #list增序冒泡
heapq.heappush(list,item) #向list内压入item
```
####defaultdict设置字典
```
from collections import defaultdict
d=defaultdict(list)
d=defaultdict(set)
d=defaultdict(dict)
```
####字典操作
```
zip(obj.values(),obj.keys()) # 翻转键值对
min(zip(obj.values(),obj.keys())) # 取最小值返回值键对
max(zip(obj.values(),obj.keys())) # 取最大值返回值键对
a.keys() & b.keys() # a,b的相同键
a.keys() - b.keys() # a,b的差集
a.items() & b.items() # a,b的相同键值
p={key:value for key,value in prices.items() if value > 200}
p={key:value for key,value in prices.items() if key in tech_names}
```
####序列切片
```
SHARES = slice(20,32)
PRICE = slice(40,48)
cost = int(record[SHARES]) * float(record[PRICE])

a = slice(5,50,2)
s = 'Helloworld'
a.indices(len(s)) # 限制在给定值内 : (5,10,2)
```

####分组操作
```
from operator import itemgetter
from itertools import groupby

rows.sort(key=itemgetter('date'))

for date item in groupby(rows, key = itemgetter('date') )
	print(date)
	for i in items:
		print("  ",i)
```
###Python字符串
####Python将字符串转为相应类型

	import ast

	x ="[['One','Two','Three'],[1,2,3]]"

	x = ast.literal_eval(x)

	print x

####正则

1. 分解
		```
		line = 'asdf ffaf; asfa, fafa,asdf,   foo'
		import re
		re.split(r'[;,\s]\s*',line) # 分割文本
		re.split(r'(;|,|\s)\s*',line) # 对符号也做捕获
		re.split(r'(?:;|,|\s)\s*',line) # 分组非捕获查询
		```
1. 抓取
		```
		datepat = re.compile(r'(\d+)/(\d+)/(\d+)')
		text = 'Today is 11/27/2012. PyCon starts 3/13/2013'
		datepat.findall(text) # [('11','27','2012'),('3','13','2013')]
		m = datepat.match('11/27/2012')
		m.groups() # ('11','27','2012')
		m.group(0) # '11'
		for m in datepat.finditer(text):
				print(m.groups())
		```
1. 替换
	```
re.sub(r'def\s+([a-zA-Z_][a-zA-Z_0-9]*)\s*\(\s*\):',
        r'static PyObject*\npy_\1(void)\n{',
        'def myfunc():')
'static PyObject*\npy_myfunc(void)\n{'

	def dashrepl(matchobj):
	  if matchobj.group(0) == '-': return ' '
	  else: return '-'
	re.sub('-{1,2}', dashrepl, 'pro----gram-files')
	# 'pro--gram files'
	re.sub(r'\sAND\s', ' & ', 'Baked Beans And Spam', flags=re.IGNORECASE)
	# 'Baked Beans & Spam'
	```

####匹配
```
str = '123.txt'
str.startswith('http:')
str.endswith('.txt')
str.endswith('.txt','.py')
str.find('txt') # 4

from fnmatch import fnmatch,fnmatchcase
fnmatch(name,'Dat*.txt') # 忽略大小写
fnmatchcase(name,'Dat*.txt') # 精确大小写
```

####

###Python杂项
####Python3 使用pip
`python3 -m pip <command> [options]`

####Python2操作MySQL

	#coding=utf-8
	import MySQLdb

	conn= MySQLdb.connect(
	        host='localhost',
	        port = 3306,
	        user='root',
	        passwd='19920428',
	        db ='test',
	        )
	cur = conn.cursor()

	#创建数据表
	cur.execute("create table student2(id int ,name varchar(20),class varchar(30),age varchar(10))")

	#插入一条数据
	cur.execute("insert into student2 values('2','Tom','3 year 2 class','9')")


	#修改查询条件的数据
	cur.execute("update student2 set class='3 year 1 class' where name = 'Tom'")

	#删除查询条件的数据
	cur.execute("delete from student2 where age='9'")

	cur.close()
	conn.commit()
	conn.close()

####Python3操作MySQL

	#coding=utf-8
	import pymysql
	try:
	#获取一个数据库连接，注意如果是UTF-8类型的，需要制定数据库
	  conn=pymysql.connect(host='localhost',user='root',passwd='19920428',db='test',port=3306)
	  cur=conn.cursor()#获取一个游标
	  cur.execute('select * from student2')
	  data=cur.fetchall()
	  for d in data :
	    #注意int类型需要使用str函数转义
	   print("ID: "+str(d[0])+'  名字： '+d[1]+"  年龄： "+d[3])

	  cur.close()#关闭游标
	  conn.close()#释放数据库资源
	except  Exception :print("发生异常")

####Pip install报错处理办法
python目录 `Python27\Lib\site-packages` 建一个文件`sitecustomize.py`
内容写:

	import sys
	sys.setdefaultencoding('gb2312')

####Python开启简易服务器
在要开启服务器的目录下打开命令行，输入`python -m SimpleHTTPServer 8000` 以开启8000端口

###Python图像
####PIL创建 JPEG 缩略图
```
from __future__ import print_function
import os, sys
from PIL import Image

size = (128, 128)

for infile in sys.argv[1:]:
    outfile = os.path.splitext(infile)[0] + ".thumbnail"
    if infile != outfile:
        try:
            im = Image.open(infile)
            im.thumbnail(size)
            im.save(outfile, "JPEG")
        except IOError:
            print("cannot create thumbnail for", infile)
```
