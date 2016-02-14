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

<div id="quickLink">
  <ul>
  </ul>
</div>
<div id="backTop" data-toggle="tooltip" title="飞" ></div>
<script src="files/js/scrollTab.js"></script>
