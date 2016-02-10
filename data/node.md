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
