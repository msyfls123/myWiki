MongoDB数据库
==
###安装配置
+ 下载地址：[https://www.mongodb.org/](https://www.mongodb.org/)
+ 装完后将Mongodb.exe路径加入环境变量 `PATH=D:\Program Files\MongoDB\Server\3.2\bin`

+ 启动用 `mongodb --dbpath <path to your directory>\data\db`

  客户端用`mongo`就能登陆

+ 认证启动用 `mongodb --dbpath <path to your directory>\data\db --auth`

  客户端用`mongo <your database name> --username "<your username>" --password "<your pwd>"`登陆

###基本操作
+ 显示`show <options>`,`options`包含`dbs`,`Collections`,`profile`,
+ 选择数据库 `use xxx`
+ 添加用户
  ```
  db.createUser({user:"<your username>",
      pwd:"<your pwd>",
      roles:["readWrite","dbAdmin"]})
  ```
+ 添加数据库管理员
  ```
  db.createUser({user:"<your username>",
      pwd:"<your pwd>",
      roles:["readWriteAnyDatebase","dbAdminAnyDatabase","clusterAdmin"]})
  ```
+ 创建库
  ```
  use hello
  db.createCollection("helloworld")
  ```
  上面创建了一个名为`hello`的库，并在其中插入了一张名为`helloworld`的表
+ 添加纪录 `db.helloworld.insert({"name":"kimi"})`
+ 修改记录 `db.helloworld.update({"name":"kimi"},{$set:{"age":23}})`
+ 删除记录 `db.col.remove({"name":"kimi"})`
+ 查找记录 `db.col.find({"name":"kimi"})`
