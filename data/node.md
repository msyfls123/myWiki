Node.js
==
###事件IO
1. 事件 `function()`
2. 事件结束 `process.nextTick()`
3. 定时器 `setTimeout()`
4. 事件队列空闲 `setImmediate()`

```
console.log('1');

setImmediate(function () {
console.log('2');
});

setTimeout(function () {
console.log('3');
},0);

process.nextTick(function () {
console.log('4');
});

//输出
1
4
3
2
```
###监听器
```
var events = require('events');
function Account(){
  this.balance = 0;
  events.EventEmitter.call(this);
  this.deposit = function(amount){
    this.balance += amount;
    this.emit('balanceChanged');
  }
  this.withdraw = function (amount) {
    this.balance -= amount;
    this.emit('balanceChanged')
  }
}
Account.prototype.__proto__ = events.EventEmitter.prototype;
function displayBalance(){
  console.log("Account balance: $%d",this.balance);
}
function checkOverdraw(){
  if(this.balance<0){
    console.log("Account overdrawn!")
  }
}
function checkGoal(acc,goal){
  if(acc.balance>goal){
    console.log("Goal Achieved!")
  }
}
var account = new Account();
account.on("balanceChanged",displayBalance);
account.on("balanceChanged",checkOverdraw);
account.on("balanceChanged",function(){
  checkGoal(this,1000);
});
account.deposit(220);
account.deposit(320);
account.deposit(620);
account.withdraw(1220);
```
__Output:__
```
Account balance: $220
Account balance: $540
Account balance: $1160
Goal Achieved!
Account balance: $-60
Account overdrawn!
[Finished in 0.149s]
```
传入参数给`emit`
```
var events = require("events");
function CarShow(){
  events.EventEmitter.call(this);
  this.seeCar = function(make){
    this.emit('sawCar',make)
  };
}
CarShow.prototype.__proto__ = events.EventEmitter.prototype;
var show = new CarShow();
function logCar(make){
  console.log("Saw a " + make);
}
function logColorCar(make, color){
  console.log("Saw a %s %s", color, make);
}
show.on("sawCar",logCar);
show.on("sawCar",function (make) {
  var colors = ['red','blue','black'];
  var color = colors[Math.round(Math.random()*3)];
  logColorCar(make,color);
})
show.seeCar('Ferrari');
show.seeCar('Ferrari');
show.seeCar('Ferrari');
show.seeCar('Ferrari');
show.seeCar('Ferrari');
```
###异步回调中的闭包
```
function logCar(logMsg,callback){
  process.nextTick(function(){
    callback(logMsg);
  });
}
var cars = ["Ferrari","Porsche","Bugatti"];
for (var idx in cars) {
  var message = "Saw a " + cars[idx];
  logCar(message,function(){
    console.log("Normal Callback: " +message);
  });
}
for (var idx in cars) {
  var message = "Saw a " + cars[idx];
  (function(msg){
    logCar(msg,function(){
      console.log("Closure Callback: "+ msg);
    });
  })(message)
}
```
###读写文件
+ `r` 读，不存在则异常
+ `w` 写，不存在则创建，存在则覆写
+ `a` 追加，不存在则创建
+ `+` 读写双模式
+ `s` 同步读取，绕过缓存
+ `x` 路径存在则失败

简单读
```
var fs = require('fs');
var options = {encoding:'utf8', flag:'r'};
fs.readFile('../data/config.txt', options, function(err, data){
  if (err){
    console.log("Failed to open Config File.");
  } else {
    console.log("Config Loaded.");
    var config = JSON.parse(data);
    console.log("Max Files: " + config.maxFiles);
    console.log("Max Connections: " + config.maxConnections);
    console.log("Root Path: " + config.rootPath);
  }
});
```
异步读
```
var fs = require('fs');
function readFruit(fd, fruits){
  var buf = new Buffer(5);
  buf.fill();
  fs.read(fd, buf, 0, 5, null, function(err, bytes, data){
      if ( bytes > 0) {
        console.log("read %dbytes", bytes);
        fruits += data;
        readFruit(fd, fruits);
      } else {
        fs.close(fd);
        console.log ("Fruits: %s", fruits);
      }
  });
}
fs.open('../data/fruit.txt', 'r', function(err, fd){
  readFruit(fd, "");
});
```
同步读
```
var fs = require('fs');
fd = fs.openSync('../data/veggie.txt', 'r');
var veggies = "";
do {
  var buf = new Buffer(5);
  buf.fill();
  var bytes = fs.readSync(fd, buf, null, 5);
  console.log("read %dbytes", bytes);
  veggies += buf.toString();
} while (bytes > 0);
fs.closeSync(fd);
console.log("Veggies: " + veggies);
```
流
```
var fs = require('fs');
var options = { encoding: 'utf8', flag: 'r' };
var fileReadStream = fs.createReadStream("../data/grains.txt",  options);
fileReadStream.on('data', function(chunk) {
  console.log('Grains: %s', chunk);
  console.log('Read %d bytes of data.', chunk.length);
});
fileReadStream.on("close", function(){
  console.log("File Closed.");
});
```
```
var http = require('http');
var fs = require('fs');

var options = {encoding: 'utf8', flag: 'r'}
var fileStream = fs.createReadStream(__dirname + '/ligo.txt',options)
var server = http.createServer(function (req, res) {
  fileStream.pipe(res)
});

fileStream.on("close",function(){
  console.log("Finish")
})
server.listen(8000);
```

简单写
```
var fs = require('fs');
var config = {
  maxFiles: 20,
  maxConnections: 15,
  rootPath: "/webroot"
};
var configTxt = JSON.stringify(config);
var options = {encoding:'utf8', flag:'w'};
fs.writeFile('../data/config.txt', configTxt, options, function(err){
  if (err){
    console.log("Config Write Failed.");
  } else {
    console.log("Config Saved.");
  }
});
```

异步写
```
var fs = require('fs');
var fruitBowl = ['apple', 'orange', 'banana', 'grapes'];
function writeFruit(fd){
  if (fruitBowl.length){
    var fruit = fruitBowl.pop() + " ";
    fs.write(fd, fruit, null, null, function(err, bytes){
      if (err){
        console.log("File Write Failed.");
      } else {
        console.log("Wrote: %s %dbytes", fruit, bytes);
        writeFruit(fd);
      }
    });
  } else {
    fs.close(fd);
  }
}
fs.open('../data/fruit.txt', 'w', function(err, fd){
  writeFruit(fd);
});
```

同步写
```
var fs = require('fs');
var veggieTray = ['carrots', 'celery', 'olives'];
fd = fs.openSync('../data/veggie.txt', 'w');
while (veggieTray.length){
  veggie = veggieTray.pop() + " ";
  var bytes = fs.writeSync(fd, veggie, null, null);
  console.log("Wrote %s %dbytes", veggie, bytes);
}
fs.closeSync(fd);
```

流
```
var fs = require('fs');
var grains = ['wheat', 'rice', 'oats'];
var options = { encoding: 'utf8', flag: 'w' };
var fileWriteStream = fs.createWriteStream("../data/grains.txt",  options);
fileWriteStream.on("close", function(){
  console.log("File Closed.");
});
while (grains.length){
  var data = grains.pop() + " ";
  fileWriteStream.write(data);
  console.log("Wrote: %s", data);
}
fileWriteStream.end();
```
文件系统操作
```
var fs = require('fs');
fs.exists('filesystem.js', function (exists) {
  console.log(exists ? "Path Exists" : "Path Does Not Exist");
});

fs.writeFileSync("old.txt", "text");
fs.rename("old.txt", "new.txt", function(err){
  console.log(err ? "Rename Failed" :  "File Renamed");
});
fs.mkdirSync("test");
fs.rename("test", "renamed", function(err){
  console.log(err ? "Rename Failed" :  "Folder Renamed");
});

fs.truncate("new.txt", function(err){
  console.log(err ? "File Truncate Failed" :  "File Truncated");
});

fs.unlink("new.txt", function(err){
  console.log(err ? "File Delete Failed" :  "File Deleted");
});
```
###HTTP客户端
```
var http = require('http');
var options = {
    hostname: '139.129.133.18',
    path: '/result/?alipay=18771058712',
    port: '81',
    method: 'GET'
  };
function handleResponse(response) {
  var serverData = '';
  response.on('data', function (chunk) {
    serverData += chunk;
  });
  response.on('end', function () {
    console.log("Response Status:", response.statusCode);
    console.log("Response Headers:", response.headers);
    console.log(JSON.parse(serverData))
  });
}
http.request(options, function(response){
  handleResponse(response);
}).end();
```
###HTTP请求与响应
```
var http = require('http');
http.createServer(function (req, res) {
  var jsonData = "";
  req.on('data', function (chunk) {
    jsonData += chunk;
  });
  req.on('end', function () {
    var reqObj = JSON.parse(jsonData);
    var resObj = {
      message: "Hello " + reqObj.name,
      question: "Are you a good " + reqObj.occupation + "?"
    };
    res.writeHead(200);
    res.end(JSON.stringify(resObj));
  });
}).listen(8080);


var http = require('http');
var options = {
  host: '127.0.0.1',
  path: '/',
  port: '8080',
  method: 'POST'
};
function readJSONResponse(response) {
  var responseData = '';
  response.on('data', function (chunk) {
    responseData += chunk;
  });
  response.on('end', function () {
    var dataObj = JSON.parse(responseData);
    console.log("Raw Response: " +responseData);
    console.log("Message: " + dataObj.message);
    console.log("Question: " + dataObj.question);
  });
}
var req = http.request(options, readJSONResponse);
req.write('{"name":"Bilbo", "occupation":"Burglar"}');
req.end();
```
###HTTPS服务器
HTTPS中一个关键就是证书文件。当然我们可以找专业的第三方机构签发。自己玩玩的话就用自签名的证书就可以了，用户在访问的时候则需要确认安全性问题。

####生成密钥
  生成传输pre-master secret的时候所需要的Server端的私钥，运行时提示需要输入密码，用于对key的加密。以后每次读取此文件的时候，都需要输入指令。
  ```
  # 生成服务器端的非对称秘钥
  openssl genrsa -des3 -out server.key 1024

  # 生成签名请求的CSR文件
  openssl req -new -key server.key -out server.csr

  # 自己对证书进行签名，签名的有效期是365天
  openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

  # 去除证书文件的password
  cp server.key server.key.orig
  openssl rsa -in server.key.orig -out server.key
```
#### 使用密钥

  + `server.crt`
  + `server.key`

####建立服务器
  NodeJS建立一个HTTPS的Server
  ```
  var httpsModule = require('https');
  var fs = require('fs');

  var https = httpsModule.Server({
       key: fs.readFileSync('/path/to/server.key'),
       cert: fs.readFileSync('/path/to/server.crt')
  }, function(req, res){
      res.writeHead(200);
      res.end("hello world\n");
  });

  //https默认de监听端口时443，启动1000以下的端口时需要sudo权限
  https.listen(443, function(err){  
       console.log("https listening on port: 443");
  });
  ```
  这里使用的fs.readFileSync方法会阻塞其他进程直到文件的读取完毕，在读取关键的配置文件的时候这样的方法是比较适宜的。
####Plan`B`
```
openssl genrsa -out s.pem 2048
openssl req -new -key s.pem -out s.csr
#不要输入密码
openssl x509 -req -days 365 -in s.csr -signkey s.pem -out s.crt
```

```
var https = require('https');
var fs = require('fs');

var server = https.createServer({
     key: fs.readFileSync('s.pem'),
     cert: fs.readFileSync('s.crt')
}, function(req, res){
    res.writeHead(200);
    res.end("hello not world\n");
});

server.listen(811, function(err){
     console.log("https listening on port: 811");
});
```
  >参考[HTTPS 的原理和 NodeJS 的实现](https://segmentfault.com/a/1190000002630688)

###WebSocket
socket_server
```
var net = require('net');
var server = net.createServer(function(client) {
  console.log('Client connection: ');
  console.log('   local = %s:%s', client.localAddress, client.localPort);
  console.log('   remote = %s:%s', client.remoteAddress, client.remotePort);
  client.setTimeout(500);
  client.setEncoding('utf8');
  client.on('data', function(data) {
    console.log('Received data from client on port %d: %s',
                client.remotePort, data.toString());
    console.log('  Bytes received: ' + client.bytesRead);
    writeData(client, 'Sending: ' + data.toString());
    console.log('  Bytes sent: ' + client.bytesWritten);
  });
  client.on('end', function() {
    console.log('Client disconnected');
    server.getConnections(function(err, count){
      console.log('Remaining Connections: ' + count);
    });
  });
  client.on('error', function(err) {
    console.log('Socket Error: ', JSON.stringify(err));
  });
  client.on('timeout', function() {
    console.log('Socket Timed out');
  });
});
server.listen(8107, function() {
  console.log('Server listening: ' + JSON.stringify(server.address()));
  server.on('close', function(){
    console.log('Server Terminated');
  });
  server.on('error', function(err){
    console.log('Server Error: ', JSON.stringify(err));
  });
});
function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }  
}
```
socket_client
```
var net = require('net');
function getConnection(connName){
  var client = net.connect({port: 8107, host:'localhost'}, function() {
    console.log(connName + ' Connected: ');
    console.log('   local = %s:%s', this.localAddress, this.localPort);
    console.log('   remote = %s:%s', this.remoteAddress, this.remotePort);
    this.setTimeout(500);
    this.setEncoding('utf8');
    this.on('data', function(data) {
      console.log(connName + " From Server: " + data.toString());
      this.end();
    });
    this.on('end', function() {
      console.log(connName + ' Client disconnected');
    });
    this.on('error', function(err) {
      console.log('Socket Error: ', JSON.stringify(err));
    });
    this.on('timeout', function() {
      console.log('Socket Timed Out');
    });
    this.on('close', function() {
      console.log('Socket Closed');
    });
  });
  return client;
}
function writeData(socket, data){
  var success = !socket.write(data);
  if (!success){
    (function(socket, data){
      socket.once('drain', function(){
        writeData(socket, data);
      });
    })(socket, data);
  }  
}
var Dwarves = getConnection("Dwarves");
var Elves = getConnection("Elves");
var Hobbits = getConnection("Hobbits");
writeData(Dwarves, "More Axes");
writeData(Elves, "More Arrows");
writeData(Hobbits, "More Pipe Weed");
```
####Better Plan
+ [ws模块](https://github.com/websockets/ws)
+ [socket.io](http://socket.io/docs/)
>参考自[借助Nodejs探究WebSocket](http://www.tuicool.com/articles/AJRnyuf)
>   [原生WebSocket](http://my.oschina.net/u/1266171/blog/357488)

###子进程
执行命令
```
var childProcess = require('child_process');
var options = {maxBuffer:100*1024, encoding:'utf8', timeout:5000};
var child = childProcess.exec('dir /B', options,
                              function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error Code: '+error.code);
    console.log('Error Signal: '+error.signal);
  }
  console.log('Results: \n' + stdout);
  if (stderr.length){
    console.log('Errors: ' + stderr);
  }
});
child.on('exit', function (code) {
  console.log('Completed with code: '+code);
});
```
执行文件
```
var childProcess = require('child_process');
var options = {maxBuffer:100*1024, encoding:'utf8', timeout:0,cwd:'E:/Desktop/pyqt'};
var child = childProcess.exec('python test.py', options,
                              function (error, stdout, stderr) {
  if (error) {
    console.log(error.stack);
    console.log('Error Code: '+error.code);
    console.log('Error Signal: '+error.signal);
  }
  console.log('Results: \n' + stdout);
  if (stderr.length){
    console.log('Errors: ' + stderr);
  }
});
child.on('exit', function (code) {
  console.log('Completed with code: '+code);
});
```
派生子进程
```
var child_process = require('child_process');
var options = {
    env:{user:'Brad'},
    encoding:'utf8'
};
function makeChild(){
  var child = child_process.fork('chef.js', [], options);
  child.on('message', function(message) {
    console.log('Served: ' + message);
  });
  return child;
}
function sendCommand(child, command){
  console.log("Requesting: " + command);
  child.send({cmd:command});
}
var child1 = makeChild();
var child2 = makeChild();
var child3 = makeChild();
sendCommand(child1, "makeBreakfast");
sendCommand(child2, "makeLunch");
sendCommand(child3, "makeDinner");

#chef.js
process.on('message', function(message, parent) {
  var meal = {};
  switch (message.cmd){
    case 'makeBreakfast':
      meal = ["ham", "eggs", "toast"];
      break;
    case 'makeLunch':
      meal = ["burger", "fries", "shake"];
      break;
    case 'makeDinner':
      meal = ["soup", "salad", "steak"];
      break;
  }
  process.send(meal);
});
```
###进程集群
HTTP服务器集群
```
var cluster = require('cluster');
var http = require('http');
if (cluster.isMaster) {
  cluster.on('fork', function(worker) {
    console.log("Worker " + worker.id + " created");
  });
  cluster.on('listening', function(worker, address) {
    console.log("Worker " + worker.id +" is listening on " +
                address.address + ":" + address.port);
  });
  cluster.on('exit', function(worker, code, signal) {
    console.log("Worker " + worker.id +" Exited");
  });
  cluster.setupMaster({exec:'cluster_worker.js'});
  var numCPUs = require('os').cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    if (i>=4) break;
    cluster.fork();
  }
  Object.keys(cluster.workers).forEach(function(id) {
    cluster.workers[id].on('message', function(message){
      console.log(message);
    });
  });
}

```
工作进程HTTP服务器
```
var cluster = require('cluster');
var http = require('http');
if (cluster.isWorker) {
  http.Server(function(req, res) {
    res.writeHead(200);
    res.end("Process " + process.pid + " says hello");
    process.send("Process " + process.pid + " handled request");
  }).listen(8080, function(){
    console.log("Child Server Running on Process: " + process.pid);    
  });
}
```
HTTP客户端(测试用)
```
var http = require('http');
var options = { port: '8080'};
function sendRequest(){
  http.request(options, function(response){
    var serverData = '';
    response.on('data', function (chunk) {
      serverData += chunk;
    });
    response.on('end', function () {
      console.log(serverData);
    });
  }).end();
}
for (var i=0; i<5; i++){
  console.log("Sending Request");
  sendRequest();
}
```
###Util模块
继承
```
ar util = require("util");
var events = require("events");
function Writer() {
  events.EventEmitter.call(this);
}
util.inherits(Writer, events.EventEmitter);
Writer.prototype.write = function(data) {
  this.emit("data", data);
};
var w = new Writer();
console.log(w instanceof events.EventEmitter);
console.log(Writer.super_ === events.EventEmitter);
w.on("data", function(data) {
    console.log('Received data: "' + data + '"');
});
w.write("Some Data!");
```
