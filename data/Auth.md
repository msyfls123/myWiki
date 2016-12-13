Django用户认证
===
###基本用法
Django 提供内置的视图(view)函数用于处理登录和退出(以及其他奇技淫巧), 但在开始前, 我们来看看如何手工登录和退出。 Django提供两个函数来执行`django.contrib.auth`中的动作: `authenticate()`和`login()`。

认证给出的用户名和密码, 使用`authenticate()` 函数。它接受两个参数，用户名`username`和密码`password` ，并在密码对给出的用户名合法的情况下返回一个`User`对象。如果密码不合法, authenticate()返回None。

	>>> from django.contrib import auth
	>>> user = auth.authenticate(username='john', password='secret')
	>>> if user is not None:
	...     print "Correct!"
	... else:
	...     print "Invalid password."

`authenticate()`只是验证一个用户的证书而已。而要登录一个用户, 使用`login()`。该函数接受一个`HttpRequest`对象和一个`User` 对象作为参数并使用Django的会话（session）框架把用户的ID保存在该会话中。

下面的例子演示了如何在一个视图中同时使用`authenticate()`和`login()`函数：

	from django.contrib import auth
	def login_view(request):
	    username = request.POST.get('username', '')
	    password = request.POST.get('password', '')
	    user = auth.authenticate(username=username, password=password)
	    if user is not None and user.is_active:
	        # Correct password, and the user is marked "active"
	        auth.login(request, user)
	        # Redirect to a success page.
	        return HttpResponseRedirect("/account/loggedin/")
	    else:
	        # Show an error page
	        return HttpResponseRedirect("/account/invalid/")
注销一个用户，在你的视图中使用`django.contrib.auth.logout()`。 它接受一个`HttpRequest`对象并且没有返回值。

	from django.contrib import auth

	def logout_view(request):
	    auth.logout(request)
	    # Redirect to a success page.
	    return HttpResponseRedirect("/account/loggedout/")

注意，即使用户没有登录, `logout()`也不会抛出任何异常。
>以上内容引自[The Django Book 第十四章： 会话、用户和注册](http://djangobook.py3k.cn/2.0/chapter14/#cn135)

###URL配置
在URL中分别配置`用户信息(profile)`,`登录页面(login)`和`登出页面(logout)`

	from app.views import *
	urlpatterns = [
		url(r'^profile/$', profile, name='profile'),
	    url(r'^login/$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}, name='login'),
	    url(r'^logout/$',logout_view,name="logout"),
	]

###Views配置
1.通过`custom_proc`来生成`RequestContext`所需的字典，然后渲染到视图对象上
2.login页面采用`django.contrib.auth.views.login`的视图函数，这里没有给出
3.`auth.logout(request)`会将`request`的user对象注销，并处理`sessionid`等cookie

	from django.template import loader, RequestContext
	from django.shortcuts import render_to_response
	from django.http import HttpResponseRedirect
	from django.contrib.auth.decorators import login_required
	from django.contrib import auth
	from django.core.urlresolvers import reverse

	def custom_proc(request):
	    "A context processor that provides 'app', 'user' and 'ip_address'."
	    return {
	        'app': 'My app',
	        'user': request.user,
	        'ip_address': request.META['REMOTE_ADDR'],
	    }


	@login_required(login_url="/login/")  
	def profile(request):  

		#第一种写法
        return render_to_response('profile.html',
        {'message': request.user.has_perm('auth.change_user')},
        context_instance=RequestContext(request, processors=[custom_proc]))

        #第二种写法
        t = loader.get_template('profile.html')
	    c = RequestContext(request, {'message': request.user.has_perm('auth.change_user')},
	            processors=[custom_proc])
	    return t.render(c)


	def logout_view(request):
	    auth.logout(request)
	    # Redirect to a success page.
	    return HttpResponseRedirect(reverse('profile'))

###Templates配置

####templates/login.html

	<!DOCTYPE html>  
	<html lang="en">
	    <head>
	        <meta charset="UTF-8">
	        <title>login</title>  
	    </head>  
	    <body>  
	    <% if form.errors %>  
	        <p>Your username and password didn't match. Please try again.</p>  
	    <% endif %>  
	    <form method="post" action="<% url 'django.contrib.auth.views.login' %>">  
	    <% csrf_token %>  
	            <table>  
	            <tr>  
	                <td>{{ form.username.label_tag }}</td>  
	                <td>{{ form.username }}</td>  
	            </tr>  
	            <tr>  
	                <td>{{ form.password.label_tag }}</td>  
	                <td>{{ form.password }}</td>  
	            </tr>  
	            </table>  

	        <input type="submit" value="login" />  
	        <input type="hidden" name="next" value="{{ next }}" />  
	    </form>  
	    </body>  
	</html>  

####templates/profile.html
两种查看用户权限的方式:
1. user.get_all_permissions  -  [`User`对象方法](http://djangobook.py3k.cn/2.0/chapter14/#cn131)
2. perms.auth.add_user  -  [权限:模板变量](http://python.usyiyi.cn/django/topics/auth/default.html#permissions)


	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<title>Document</title>
	</head>
	<body>
		<h1>{{user.username}}</h1>
		<p>Ip:{{ip_address}}</p>
		<h3>权限列表</h3>
		<ul>
			<% for per in user.get_all_permissions%>
				<li>{{per}}</li>
			<% endfor %>
		</ul>
		<p><b>是否有增加用户的权限: </b>{{perms.auth.add_user}}</p>
		<p><b>更改用户的权限呢?</b>
			<% if message %>
				有啊
			<% else %>
				也木有啊
			<% endif %>
		</p>
		Welcome, <a target="_self" href="/logout/">logout</a>
	</body>
	</html>

###效果图
![用户详情页面](imgs/auth.jpg)

>参考自[Django用户认证系统　authentication system](http://blog.csdn.net/feelang/article/details/24992693)
