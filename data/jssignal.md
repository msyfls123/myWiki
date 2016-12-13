js-signal
==
[Download](https://github.com/millermedeiros/js-signals/)

###引入
```
<script src="js-signal.min.js"></script>
<script>
  var Signal = signal.Signal;
  var mySignal = new Signal();
  function handler(obj){
    console(obj+" is triggered")
  }
  mySignal.add(handler);
  mySignal.dispatch("foo");
</script>
```

###语法
+ `add(handler)` 添加handler
+ `addOnce(handler)` 一次性handler
+ `dispatch(params)` 触发事件->handler
+ `halt()` 阻止其后的handler（也可用`return false`)
+ `add(handler,obj)` 添加执行上下文
+ `add(handler,null,2)` 优先级2
+ `add(handler).execute` 手动触发单个handler
+ `remove(handler)` 清除单个handler
+ `removeAll()` 清除所有handler
+ `add(handler).detach()` 清除匿名handler
+ `params=["param1","param2"]` 添加默认参数（dispatch时只需补齐剩余参数
+  

###不常用
+ `isOnce()` 检查一次性handler
+ `has(handler)` 检查handler是否存在
+ `memorize=true` 记住一次dispatch，直到其被所有handler消费，新添加的handler会自动被这个dispatch触发
