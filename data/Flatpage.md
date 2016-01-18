简单页面
===

###URL配置

```
from django.contrib.flatpages import views

urlpatterns = [
    url(r'^(?P<url>.*/)$', cache_page(60*5)(views.flatpage)),
]
```

###Settings配置
```
INSTALLED_APPS = (
    'django.contrib.sites',
    'django.contrib.flatpages',
    )
```
###生成数据库表

首次使用需应用migrate生成数据库表

```
python manage.py makemigrations
python manage.py migrate
```

###后台管理

1. 进入后台，`站点`-`增加站点`

  ```
  域名 : 网站域名(如www.django.com)
  显示名称 : (如Django网站)
  ```

2. `简单页面`-`增加简单页面`

  ```
  URL : /你要的URL地址/
  标题 : Django标题
  内容 : <h1>天气很好哇</h1>
  Sites : 勾选你的网站域名
  高级选项
    模板名称 ：flatpages/about.html
  ```
  
###模板应用
```
#flatpages/about.html

<!DOCTYPE HTML>
<html>
<head>
  <title>{{flatpage.title}}</title>
</head>
<body>
  You are in  {{flatpage.url}}
  {{ flatpage.content|safe }}

<h3>当前页面可用站点名</h3>
<ul>
  {% for f in flatpage.sites.all %}
    <li>{{f.name}}:{{f.domain}}</li>
  {% endfor %}
</ul>

<h3>可用Flatpages链接</h3>
{% load flatpages %}
{% get_flatpages as flatpages %}
<ul>
    {% for page in flatpages %}
        <li><a href="{{ page.url }}">{{ page.title }}</a></li>
    {% endfor %}
</ul>
</body>
</html>
```
