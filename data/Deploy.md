Django项目部署
===

###Django配置
####环境参考

+ Ubuntu 14.04 x64
+ Nginx 1.4.4
+ MySQL 5.6.21
+ Python 2.7.6
+ Django 1.8.4
+ uWSGI 2.0.11.2
+ MySQL-python 1.2.5
+ Pillow 2.3.0

####创建站点目录`/home/mysite`
	
	django-admin startproject mysite
####创建static和media目录
	
	mkdir static, media
####目录结构

	home
	├─ media
	├─ static
	└─ mysite
		├─ manage.py
		├─ static
		├─ templates┐ 
		├─ someapp  ├─ 40X.html
		└─ mysite   └─ 50X.html
		    ├─ setting.py
		    ├─ urls.py
			...

####设置Setttings和urls.py

	#settings.py

	DEBUG = False
	ALLOWED_HOSTS = ["*"] #需改成你网站的域名或IP
	LANGUAGE_CODE = 'zh-hans'
	TIME_ZONE = 'Asia/Shanghai'

	STATIC_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'static') #开发，部署后可注释掉
	STATIC_URL = '/static/' #部署
	STATICFILES_DIRS = (  
	    ("js",os.path.join(BASE_DIR, 'static/js'),  #开发，部署后可注释掉
	)

	MEDIA_ROOT = os.path.join(os.path.dirname(BASE_DIR), 'media') #部署
	MEDIA_URL = '/media/' #部署

	DATABASES = {
	    'default': {
	        'ENGINE': 'django.db.backends.mysql',
	        'NAME': 'mysite',
	        'USER': '数据库用户名',
	        'PASSWORD': '数据库密码',
	        'HOST': '127.0.0.1',
	        'PORT': '3306',
	    }
	}

	TEMPLATES = [
    {
        'DIRS': [
            os.path.join(BASE_DIR, 'template').replace('\\','/'),
        ],
    },
    ]

    #urls.py
    urlpatterns = [
    	...
    	url(r'^media/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': settings.MEDIA_ROOT,}), #开发,部署时可以去掉
	]

	handler404 = 'someapp.views.page_not_found'
	handler500 = 'someapp.views.page_error'

	#someapp.views.py
	from django.shortcuts import render,render_to_response
	def page_not_found(request):
	    return render_to_response('40X.html')

	def page_error(request):
	    return render_to_response('50X.html')
###配置数据库

####添加mysql数据库

	mysql -uroot -p
	Enter password : ********
	mysql> CREATE DATABASE mysite DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
	mysql> grant all privileges on mysite.* to 你的用户名@localhost identified by "root";
	mysql> use mysql;
	mysql> UPDATE user SET password=PASSWORD('你的密码') WHERE user='你的用户名';
	mysql> FLUSH PRIVILEGES;

####安装MySQLdb
	
	pip install mysql-python

####更新数据库连接

	python manage.py makemigrations
	python manage.py migrate

###uWSGI配置

####安装uWSGI

	export LDFLAGS="-Xlinker --no-as-needed"
	pip install uwsgi

####测试uWSGI

在你的机器上写一个test.py

	# test.py
	def application(env, start_response):
	    start_response('200 OK', [('Content-Type','text/html')])
	    return "Hello World"

然后执行shell命令：`uwsgi --http :8001 --wsgi-file test.py`

访问网页：`这台服务器的IP地址:8001/` 看在网页上是否有`Hello World`

####配置Django和uWSGI
编写django_wsgi.py文件，将其放在与文件manage.py同一个目录下。

注意： 编写文件时需要注意语句`os.environ.setdefault`。比如，如果你的项目为`mysite`，则你的语句应该是 `os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")`


	#!/usr/bin/env python
	# coding: utf-8

	import os
	import sys

	# 将系统的编码设置为UTF8
	reload(sys)
	sys.setdefaultencoding('utf8')

	os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")

	from django.core.wsgi import get_wsgi_application

	application = get_wsgi_application()

####连接Django和uWSGI
假设Django项目的地址是/home/mysite，然后，就可以执行以下命令：

`uwsgi --http :8000 --chdir /home/mysite --module django_wsgi`

这样就可以在浏览器中访问你的Django程序了。所有的请求都是经过uwsgi传递给Django程序的。

###Nginx配置

####配置uWSGI和Nginx的Socket
在本节中，我们将使用uWSGI配置文件的方式来改进uWSGI的启动方式。

假定你的程序目录是 `/home/mysite`

我们将要让Nginx采用8077端口与uWSGI通讯，请确保此端口没有被其它程序采用。

注意，请确定`django_wsgi.py`文件已经存在了。

新建一个XML文件：`django_socket.xml`，将它放在 `/home/mysite` 目录下：
	
	<uwsgi>
    <socket>:8077</socket>
    <chdir>/home/mysite</chdir>
    <module>django_wsgi</module>
    <processes>4</processes> <!-- 进程数 --> 
    <daemonize>uwsgi.log</daemonize>
	</uwsgi>

####配置Nginx
1. 假设你将会把Nginx程序日志放到你的目录`/alidata/log/nginx/access/`下，请确保该目录存在。

2. 假设你的Django的static目录是`/home/static/` ， media目录是`/home/media/`，请确保这些目录存在。

3. 暂时将可访问域名设为全部，即`localhost`, 假设你的域名是 `www.you.com` ,可设置`server_name www.you.com;`

4. 假设你的域名端口是 80（在调试时你可以设置一些特殊端口如 8070）

基于上面的假设，我们为conf/nginx.conf添加以下配置，也可直接存为`/alidata/server/nginx-1.4.4/conf/vhosts`下`django.conf`，会被自动引用

	server {

	        listen 80;
	        server_name localhost;
	        access_log /alidata/log/nginx/access/mysite.log;
	        error_log /alidata/log/nginx/mysite_error.log;

	        #charset koi8-r;

	        #access_log  logs/host.access.log  main;

	        location / {
	         include        uwsgi_params;
	         uwsgi_pass     127.0.0.1:8077;
	        }

	        error_page  404              /404;

	        error_page   500 502 503 504  /505;

	        location /static/ {
	            alias  /home/static/;
	            index  index.html index.htm;
	        }

	        location /media/ {
	            alias  /home/media/;
	        }
	    }
在上面的设置后，可以让Nginx来处理静态文件(/static/ 和 /media/ ）。非静态文件请求Nginx会发给 socket 8077，然后让uWSGI来进行处理。

###Nginx+uWSGI+Django实现
在完成上面配置后，需要按以下步骤来做：

####重启Nginx使配置生效

`nginx -s  reload`

重启后检查Nginx日志是否有异常。

####启动uWSGI服务器

	cd /home/mysite
	uwsgi -x django_socket.xml

检查日志 uwsgi.log 是否有异常发现。

####访问服务

基于上面的假设你的域名是`www.you.com`

因此，我们访问 `www.you.com`, 如果发现程序与单独使用Django启动的程序一模一样时, 就说明成功啦！

####关闭服务的方法

将uWSGi进程杀死即可。

1. killall  -9 uwsgi
2. killall -s HUP /var/www/uwsgi 
3. killall -s HUP /usr/local/bin/uwsgi

###[示例文件](store/demo.zip)

>参考自[五步教你实现使用Nginx+uWSGI+Django方法部署Django程序(上)](http://www.django-china.cn/topic/101/)[(下)](http://www.django-china.cn/topic/124/)

<div id="quickLink">
  <ul>
  </ul>
</div>
<div id="backTop" data-toggle="tooltip" title="飞" ></div>
<script src="files/js/scrollTab.js"></script>