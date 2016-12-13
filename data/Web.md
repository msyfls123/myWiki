Web
===

###Django 入门
+ `django-admin startproject XXX` 建立项目
+ `python manage.py runserver 0.0.0.0:8000` 启动服务器，监听8000端口
+ `python manage.py startapp XXX` 建立XXX应用
+ `python manage.py makemigrations` 配置数据库映射
+ `python manage.py migrate` 应用数据库更改
+ `python manage.py migrate --list` 查看数据库应用
+ `python manage.py shell` 打开SHELL命令行操作数据库
+ `python manage.py collectstatic` 收集静态文件至`STATIC_ROOT`文件夹


###Django 与 AngularJS 的冲突

	{{会被Django解析的变量}}.
	<% if 1 %>会被Django解析的语句<% endif %>

	<% verbatim %>
    	<span>{{会被Angular解析的变量}}</span>
	<% endverbatim %>

###Django加载静态文件(CSS,JS,img)

1.在settings.py中配置如下:

    import os
	STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static') # collected
	STATIC_URL = '/static/' # display in url
	STATICFILES_DIRS = (  
	    ("js",os.path.join(BASE_DIR, 'static/js').replace('\\','/')),  #js files' static path
	)

2.当`Debug=False`时需设置URL

	url(r'^static/(?P<path>.*)$', 'django.views.static.serve', { 'document_root': settings.STATICFILES_DIRS,}),

3.页面引用css、js、img等静态文件:

	<% load staticfiles %>

	<link rel="stylesheet" type="text/css" href="<% static "css/bootstrap.min.css" %>" />
	<script type="text/javascript" src="<% static "js/angular.min.js" %>" />

4.静态文件配置解释

	# 静态文件会被收集到的目录
	STATIC_ROOT = os.path.join(BASE_DIR, 'collected_static')

	# 静态文件URL显示的路径
	STATIC_URL = '/static/' # display in url

	# 静态文件配置目录
	STATICFILES_DIRS = (  
	    ("js",os.path.join(BASE_DIR, 'static/js').replace('\\','/')),  #
	)

###Django的后台管理显示列表项

	#admin.py
	from django.contrib import admin

	# Register your models here.
	import models
	class ItemAdmin(admin.ModelAdmin):
		list_display = ["title","value",...]
	admin.site.register(models.Item,ItemAdmin)

###Django的URL引用

	#urls.py
	from django.conf.urls import include, url
	from App.views import *
	urlpatterns = [
	    url(r'^bye/$',bye,name="bye"),
	]

	#template.html
	<a href="<% url 'bye' %>">bye</a>

###Django的模板引用
+ `<% include 'xxx.html' %>` 表示包含其他网页
+ `<% extends 'base.html' %>` 表示继承自其他网页
+ `<% block content %>...<% endblock %>` 这其中的内容可被继承的网页更改

1.base.html

	<!DOCTYPE html>
	<html>
	<head>
	    <title><% block title %>默认标题<% endblock %></title>
	</head>
	<body>

	<% include 'nav.html' %>

	<% block content %>
	<div>这里是默认内容，所有继承自这个模板的，如果不覆盖就显示这里的默认内容。</div>
	<% endblock %>

	<% include 'bottom.html' %>

	<% include 'analys.html' %>

	</body>


2.home.html

	<% extends 'base.html' %>

	<% block title %>欢迎光临首页<% endblock %>

	<% block content %>
	<% include 'ad.html' %>
	这里是首页，欢迎光临
	<% endblock %>

###Django密码加密

	#使用SHA1加密
	import hashlib
	passwd = lambda passwd : hashlib.sha1(passwd).hexdigest()

[参考网址](http://www.liaoxuefeng.com/wiki/001374738125095c955c1e6d8bb493182103fac9270762a000/0013868328251266d86585fc9514536a638f06b41908d44000)

###Django通用视图

	#urls.py
	url(r'^list/$', ListObj.as_view(),name="list"),

	#views.py
	from Tell.models import Item
	from django.views.generic import ListView
	class ListObj(ListView):
    	model=Item

    #Tell/item_list.html(这是默认模板，会自动寻找，objects_list就是Item.objects.all())
    <% for item in object_list %>
    <li>{{ item.title }}:{{ item.amount }}</li>
	<% endfor %>

###Django通用视图查找数据

1.通过`(?P<pk>\d+)`传Primary Key给视图类

	#urls.py
	from django.conf.urls import url
	from . import views
	urlpatterns = [
		...
	    url(r'^(?P<pk>\d+)/$', views.DetailView.as_view(), name='detail'),
	    ...
	]

	#views.py
	from django.views import generic
	class DetailView(generic.DetailView):
    model = Question
    template_name = 'polls/detail.html'    
    def get_context_data(self, **kwargs):   ##添加上下文
        context = super(DetailView, self).get_context_data(**kwargs)
        context['now'] = timezone.now()
        return context

    #polls/detail.html
    <h1>{{ question.question_text }}</h1>
    <p>日期: {{ now|date }}</p>

    #output for example
    <h1>Question.objects.get(id=pk).question_text</h1>
    <p>日期: Dec 19 2015</p>

2.通过`(?P<pk>\d+)`传Primary Key给视图类

	# views.py
	from django.views.generic.detail import DetailView
	from django.utils import timezone

	from articles.models import Article

	class ArticleDetailView(DetailView):

	    model = Article # 要显示详情内容的类

	    template_name = 'article_detail.html'
	    # 模板名称，默认为 应用名/类名_detail.html（即 app/modelname_detail.html）

	    # 在 get_context_data() 函数中可以用于传递一些额外的内容到网页
	    def get_context_data(self, **kwargs):
	        context = super(ArticleDetailView, self).get_context_data(**kwargs)
	        context['now'] = timezone.now()
	        return context


	# urls.py
	from django.conf.urls import url

	from article.views import ArticleDetailView

	urlpatterns = [
	    url(r'^(?P<slug>[-_\w]+)/$', ArticleDetailView.as_view(), name='article-detail'),
	]

__SlugField__

`class SlugField([max_length=50, **options])`

Slug is a newspaper term. A slug is a short label for something, containing only letters, numbers, underscores or hyphens. They’re generally used in URLs.

Set `prepopulated_fields` to a dictionary mapping field names to the fields it should prepopulate from:

	class ArticleAdmin(admin.ModelAdmin):
	    prepopulated_fields = {"slug": ("title",)}
