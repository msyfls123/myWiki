MongoDB数据库
==
###安装配置
+ 下载地址：[https://www.mongodb.org/](https://www.mongodb.org/)
+ 装完后将Mongodb.exe路径加入环境变量 `PATH=D:\Program Files\MongoDB\Server\3.2\bin`

+ 启动用 `mongodb --dbpath <path to your directory>\data\db`

  客户端用`mongo`就能登陆

+ 认证启动用 `mongodb --dbpath <path to your directory>\data\db --auth`

  客户端用`mongo <your database name> --username "<your username>" --password "<your pwd>"`登陆
+ 加入windows服务
  ```
  mongod.exe --logpath "E:\mongodb\data\dbConf\mongodb.log" --logappend --dbpath "E:\mongodb\data\db" --port 27017 --serviceName "mongodb" --serviceDisplayName "MongoDB" --install

  mongod.exe --auth --logpath "E:\mongodb\data\dbConf\mongodb.log" --logappend --dbpath "E:\mongodb\data\db" --port 27017 --serviceName "mongodb2" --serviceDisplayName "MongoDBAuth" --install
  ```
  之后就可以用`net start/stop mongodb/mongodb2`来启动关闭服务了。

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
      roles:["readWriteAnyDatebase","dbAdminAnyDatabase","clusterAdmin"，"userAdminAnyDatabase"]})
      //上面一行权限分别是 任意读写，任意修改，管理数据库，任意修改用户
  ```
+ 修改用户信息
  ```
  use admin
  db.updateUser(
      "<username>",
     {
       roles : [
                 { role: "<role>", db: "<database>" } | "<role>",
                 ...
               ],
       pwd: "<cleartext password>"
      },
      writeConcern: { <write concern> }
  )
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

###Node.js使用MongoDB
+ 先安装相关库
  ```
  npm install mongodb -g
  npm install mongoose -g
  ```
+ 认证连接
  ```
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://<username>:<pwd>@localhost:27017/<dbname>", {
                        db: { w: 1, native_parser: false },
                        server: {
                          poolSize: 5,
                          socketOptions: { connectTimeoutMS: 500 },
                          auto_reconnect: true
                        },
                        replSet: {},
                        mongos: {}
                      }, function(err, db) {
    if(err){
      console.log("Connection Failed Via Connection String.");
      console.log(err)
    }
    var theDb=db.db("<your db>")  //创建对应数据库的实例
    theDb.collection("<your db.collection>",function(err,col){
      col.insert({"<title>":"<my title name>"})  //添加示例文档
      col.find({},function(err,cur){ //查找所有文档
        cur.toArray(function(err,items){
          console.log("Data");
          console.log(items);
          db.close()
        })
      })
    })
  });
  ```
