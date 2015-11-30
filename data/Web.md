Web
===

##Django 入门
+ `django-admin startproject XXX` 建立项目
+ `python manage.py runserver 0.0.0.0:8000` 启动服务器，监听8000端口
+ `python manage.py startapp XXX` 建立XXX应用


##Django 与 AngularJS 的冲突
	
	{{会被Django解析的变量}}.
	{% if 1 %}会被Django解析的语句{% endif %}
	
	{% verbatim %}
    	<span>{{会被Angular解析的变量}}</span>
	{% endverbatim %}

##Django加载静态文件(CSS,JS,img)

1.在settings.py中配置如下:
    
    import os
    STATIC_ROOT = ''  
	STATIC_URL = '/static/'  
	STATICFILES_DIRS = (  
	    os.path.join(os.path.dirname(__file__), '../static/').replace('\\','/'),
	    #如果是*nix系统，不需要replace函数
	)

2.在urls.py中配置如下:

	import settings  
	urlpatterns = patterns('',  
	    #...... 其他配置  
	    url( r'^static/(?P<path>.*)$', 'django.views.static.serve',{ 'document_root': settings.STATIC_ROOT }),  
	)  

3.页面引用css、js、img等静态文件:

	<link rel="stylesheet" type="text/css" href="{% static "css/bootstrap.min.css" %}" />
	<script type="text/javascript" src="{% static "js/angular.min.js" %}" />