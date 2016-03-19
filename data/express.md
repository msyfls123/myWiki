Express
==

###https服务器

+ 准备好相应证书
+ 8200端口是http协议，443端口是https协议

```
var express = require('express');
var https = require('https');
var http = require('http');
var fs = require('fs');
var app = express();
var options = {
    host: '127.0.0.1',
    key: fs.readFileSync('ssl/server.key'),
    cert: fs.readFileSync('ssl/server.crt')
  };
http.createServer(app).listen(8200);
https.createServer(options, app).listen(443);
app.get('/', function(req, res){
  res.send('Hello from Express');
});
```

###路由配置

+ 查询字符串 `url.parse(req.url, true).query`
+ 正则表达式 `/^\/book\/(\w+)\:(\w+)?$/` `req.params[0,1,2...]`
+ 定义参数 `'/user/:userid'` `req.params('userid')`

```
var express = require('express');
var url = require('url');
var app = express();
app.listen(80);
app.get('/', function (req, res) {
  res.send("Get Index");
});
app.get('/find', function(req, res){
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var response = 'Finding Book: Author: ' + query.author +
                  ' Title: ' + query.title;
  console.log('\nQuery URL: ' + req.originalUrl);  
  console.log(response);
  res.send(response);
});
app.get(/^\/book\/(\w+)\:(\w+)?$/, function(req, res){
  var response = 'Get Book: Chapter: ' + req.params[0] +
              ' Page: ' + req.params[1];
  console.log('\nRegex URL: ' + req.originalUrl);
  console.log(response);
  res.send(response);
});
app.get('/user/:userid', function (req, res) {
  var response = 'Get User: ' + req.param('userid');
  console.log('\nParam URL: ' + req.originalUrl);
  console.log(response);
  res.send(response);
});
app.param('userid', function(req, res, next, value){
  console.log("\nRequest received with userid: " + value);
  next();
});
```

###Request
```
var express = require('express');
var app = express();
app.listen(80);
app.get('/user/:userid', function (req, res) {
  console.log("URL:\t   " + req.originalUrl);
  console.log("Protocol:  " + req.protocol);
  console.log("IP:\t   " + req.ip);
  console.log("Path:\t   " + req.path);
  console.log("Host:\t   " + req.host);
  console.log("Method:\t   " + req.method);
  console.log("Query:\t   " + JSON.stringify(req.query));
  console.log("Fresh:\t   " + req.fresh);
  console.log("Stale:\t   " + req.stale);
  console.log("Secure:\t   " + req.secure);
  console.log("UTF8:\t   " + req.acceptsCharset('utf8'));
  console.log("Connection: " + req.get('connection'));
  console.log("Headers: " + JSON.stringify(req.headers,null,2));
  res.send("User Request");
});

// localhost/user/4983?name=Brad
```

###发送文件
```
var express = require('express');
var url = require('url');
var app = express();
app.listen(8001);
app.get('/image', function (req, res) {
  res.sendfile('arch.jpg',
               { maxAge: 24*60*60*1000,
                 root: './views/'},
               function(err){
    if (err){
      console.log("Error");
    } else {
      console.log("Success");
    }
  });
});
```

###json响应
```
var express = require('express');
var url = require('url');
var app = express();
app.listen(8001);
app.get('/json', function (req, res) {
  app.set('json spaces', 4);
  res.json({name:"Smithsonian", built:'1846', items:'137M',
            centers: ['art', 'astrophysics', 'natural history',
                      'planetary', 'biology', 'space', 'zoo']});
});
app.get('/error', function (req, res) {
  res.json(500, {status:false, message:"Internal Server Error"});
});
app.get('/jsonp', function (req, res) {
  app.set('jsonp callback name', 'cb');
  res.jsonp({name:"Smithsonian", built:'1846', items:'137M',
            centers: ['art', 'astrophysics', 'natural history',
                      'planetary', 'biology', 'space', 'zoo']});
});

// http://localhost/json
// http://localhost/error
// http://localhost/jsonp?cb=handleJSONP
```

###实现会话
```
var express = require('express');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var app = express();
app.use(cookieParser());
app.use(cookieSession({secret: 'MAGICALEXPRESSKEY'}));
app.get('/library', function(req, res) {
  console.log(req.cookies);
  if(req.session.restricted) {
    res.send('You have been in the restricted section ' +
             req.session.restrictedCount + ' times.');
  }else {
    res.send('Welcome to the library.');
  }
});
app.get('/restricted', function(req, res) {
  req.session.restricted = true;
  if(!req.session.restrictedCount){
    req.session.restrictedCount = 1;
  } else {
    req.session.restrictedCount += 1;
  }
  res.redirect('/library');
});
app.listen(8001);
```

###会话身份验证
```
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var crypto = require('crypto');
function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('MAGICString'));
app.use(session());
app.get('/restricted', function(req, res){
  if (req.session.user) {
    res.send('<h2>'+ req.session.success + '</h2>' +
             '<p>You have entered the restricted section<p><br>' +
             ' <a href="/logout">logout</a>');
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
});
app.get('/logout', function(req, res){
  req.session.destroy(function(){
    res.redirect('/login');
  });
});
app.get('/login', function(req, res){
  var response = '<form method="POST">' +
    'Username: <input type="text" name="username"><br>' +
    'Password: <input type="password" name="password"><br>' +
    '<input type="submit" value="Submit"></form>';
  if(req.session.user){
    res.redirect('/restricted');
  }else if(req.session.error){
    response +='<h2>' + req.session.error + '<h2>';
  }
  res.type('html');
  res.send(response);
});
app.post('/login', function(req, res){
  //user should be a lookup of req.body.username in database
  var user = {name:req.body.username, password:hashPW("myPass")};
  if (user.password === hashPW(req.body.password.toString())) {
    req.session.regenerate(function(){
      req.session.user = user;
      req.session.success = 'Authenticated as ' + user.name;
      res.redirect('/restricted');
    });
  } else {
    req.session.regenerate(function(){
      req.session.error = 'Authentication failed.';
      res.redirect('/restricted');
    });
    res.redirect('/login');
  }
});
app.listen(8888);
```
