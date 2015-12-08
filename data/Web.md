Web
===

##Django 入门
+ `django-admin startproject XXX` 建立项目
+ `python manage.py runserver 0.0.0.0:8000` 启动服务器，监听8000端口
+ `python manage.py startapp XXX` 建立XXX应用
+ `python manage.py makemigrations` 配置数据库映射
+ `python manage.py migrate` 应用数据库更改
+ `python manage.py migrate --list` 查看数据库应用
+ `python manage.py shell` 打开SHELL命令行操作数据库


##Django 与 AngularJS 的冲突
	
	{{会被Django解析的变量}}.
	{% if 1 %}会被Django解析的语句{% endif %}
	
	{% verbatim %}
    	<span>{{会被Angular解析的变量}}</span>
	{% endverbatim %}

##Django加载静态文件(CSS,JS,img)

1.在settings.py中配置如下:
    
    import os
	STATIC_URL = '/static/'  
	STATICFILES_DIRS = (  
	    os.path.join(BASE_DIR, 'static').replace('\\','/'),  
	    #如果是*nix系统，不需要replace函数
	)

2.页面引用css、js、img等静态文件:
	
	{% load staticfiles %}

	<link rel="stylesheet" type="text/css" href="{% static "css/bootstrap.min.css" %}" />
	<script type="text/javascript" src="{% static "js/angular.min.js" %}" />

##Django的后台管理显示列表项

	#admin.py
	from django.contrib import admin

	# Register your models here.
	import models
	class ItemAdmin(admin.ModelAdmin):
		list_display = ["title","value",...]
	admin.site.register(models.Item,ItemAdmin)

##Django的URL引用

	#urls.py
	from django.conf.urls import include, url
	from App.views import *
	urlpatterns = [
	    url(r'^bye/$',bye,name="bye"),
	]
	
	#template.html
	<a href="{% url 'bye' %}">bye</a>
