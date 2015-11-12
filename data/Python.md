Python操作
===

###Python3 使用pip
`python3 -m pip <command> [options]`

###Python2操作MySQL
	
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

###Python3操作MySQL

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

###Pip install报错处理办法
python目录 `Python27\Lib\site-packages` 建一个文件`sitecustomize.py`
内容写: 

	import sys 
	sys.setdefaultencoding('gb2312') 