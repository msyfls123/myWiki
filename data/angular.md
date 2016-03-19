Angular
==

###配置作用域
+ `@` : 指令作用域 DOM属性
+ `=` : 指令作用域(scope)与局部作用域($scope)双向绑定
+ `&`xxx : 从局部作用域寻找`xxx`函数并绑定到指令作用域

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="/js/angular.min.js"></script>
  <script>
  angular.module("myApp",[]).controller("myController",function($scope){
    $scope.title="A title";
    $scope.mypFunc=function(){
      console.log("out")
    };
  }).directive("myDirective",function(){
    return{
      scope:{title:"=title",newFunc:"&myFunc",info:"@info"},
      template:"<div ng-click='newFunc()'>{{title}}:{{info}}</div>"
    };
  });
  </script>
</head>
<body  ng-app="myApp">
  <div ng-controller="myController">
  <my-directive my-func="mypFunc()" title="title" info="something">
  </my-directive>
  </div>
</body>
</html>
```
输出
```
A title:something
#点击则会在console输出out字样
```

###自定义指令

+ directive_custom.js

```
angular.module('myApp', [])
  .directive('myPhotos', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      controller: function($scope) {
        var photos = $scope.photos = [];
        $scope.select = function(photo) {
          angular.forEach(photos, function(photo) {
            photo.now = false;
          });
          photo.now = true;
        };
        this.addPhoto = function(photo) {
          photos.push(photo);
        };
      },
      templateUrl: 'my_photos.html'
    };
  })
  .directive('myPhoto', function() {
    return {
      require: '^myPhotos',
      restrict: 'E',
      transclude: true,
      scope: { title: '@'},
      link: function(scope, elem, attrs, photosControl) {
        photosControl.addPhoto(scope);
      },
      template: '<div ng-show="now" ng-transclude></div>'
    };
  });
```
+ directive_custom.html

```
<!doctype html>
<html ng-app="myApp">
<head>
  <title>AngularJS Custom Directive</title>
</head>
<body>
   <my-photos>
     <my-photo title="Flower">
       <img src="/images/flower.jpg" height="150px"/>
     </my-photo>
     <my-photo title="Arch">
       <img src="/images/arch.jpg" height="150px"/>
     </my-photo>
     <my-photo title="Lake">
       <img src="/images/lake.jpg" height="150px"/>
     </my-photo>
   </my-photos>
  <script src="/js/angular.min.js"></script>
  <script src="/js/directive_custom.js"></script>
</body>
</html>
```
+ my_photos.html

```
<div>
  <span ng-repeat="photo in photos"
        ng-class="active:{{photo.now}}">
    <a href="" ng-click="select(photo)">{{photo.title}}</a>
  </span>
  <div ng-transclude></div>
</div>
```

###基本http请求

+ node_server.js

```
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use('/', express.static('./static')).
    use('/images', express.static( '../images')).
    use('/lib', express.static( '../lib'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var days=['Monday', 'Tuesday', 'Wednesday',
          'Thursday', 'Friday'];
var serviceDays = days.slice(0);
app.get('/reset/days', function(req, res){
  serviceDays = days.slice(0);
  res.json(serviceDays);
});
app.post('/remove/day', function(req, res){
  if (serviceDays.length > 2){
    serviceDays.splice(serviceDays.indexOf(req.body.day), 1);
    console.log(serviceDays);
    res.json(serviceDays);
  }else {
    res.json(400, {msg:'You must leave 2 days'});
  }
});
app.listen(8300);
```

+ service_http.html

```
<!doctype html>
<html ng-app="myApp">
<head>
  <title>AngularJS $http Service</title>
  <style>span{color:red;}</style>
</head>
<body>
  <div ng-controller="myController">
    <h2>$http Service</h2>
    <input type="button" ng-click="resetDays()"
           value="Initialize Days"/>
    {{status}}
    <h3>Days Available</h3>
    <div ng-repeat="day in days">
      {{day}}
      [<span ng-click="removeDay(day)">remove</span>]
    </div>
  </div>
  <script src="/js/angular.min.js"></script>
  <script src="/js/service_http.js"></script>
</body>
</html>
```

+ service_http.js

```
angular.module('myApp', []).
  controller('myController', ['$scope', '$http',
                              function($scope, $http) {
    $scope.days=[];
    $scope.status = "";
    $scope.removeDay = function(deleteDay){
      $http.post('/remove/day', {day:deleteDay}).
        success(function(data, status, headers, config) {
          $scope.days = data;
        }).
        error(function(data, status, headers, config) {
          $scope.status = data.msg;
        });
    };
    $scope.resetDays = function(){
      $scope.status = "";
      $http.get('/reset/days')
               .success(function(data, status, headers, config) {
        $scope.days = data;
      }).
      error(function(data, status, headers, config) {
        $scope.status = data;
      });
    };
  }]);
```

###自定义服务

+ service_custom.js

```
var app = angular.module('myApp', []);
app.value('censorWords', ['bad','mad','sad']);
app.constant('repString', "****");
app.factory('censorF', ['censorWords', 'repString',
                        function (cWords, repString) {
  return function(inString) {
    var outString = inString;
    for(i in cWords){
      outString = outString.replace(cWords[i], repString);
    }
    return outString;
  };
}]);
function CensorObj(cWords, repString) {
  this.censor = function(inString){
    var outString = inString;
    for(i in cWords){
      outString = outString.replace(cWords[i], repString);
    }
    return outString;
  };
}
app.service('censorS', ['censorWords', 'repString', CensorObj]);
app.controller('myController', ['$scope', 'censorF', 'censorS',
                                function($scope, censorF, censorS) {
    $scope.censoredByFactory = censorF("mad text");
    $scope.censoredByService = censorS.censor("bad text");
  }]);
```

+ service_custom.html

```
<!doctype html>
<html ng-app="myApp">
<head>
  <title>AngularJS $animate Service</title>
</head>
<body>
  <div ng-controller="myController">
    <h3>Image Animation:</h3>
    {{censoredByFactory}}
    {{censoredByService}}
  </div>
  <script src="/js/angular.min.js"></script>
  <script src="/js/service_custom.js"></script>
</body>
</html>
```
