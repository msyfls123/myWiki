缓存
===

###使用文件缓存

```
#settings.py
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': '/var/tmp/django_cache',
        'TIMEOUT': 3600,
        'OPTIONS': {
            'MAX_ENTRIES': 1000
        }
    }
}
```

###全站缓存

```
#settings.py
CACHE_MIDDLEWARE_ALIAS = "default"
CACHE_MIDDLEWARE_SECONDS = 300
CACHE_MIDDLEWARE_KEY_PREFIX = '站点名'

MIDDLEWARE_CLASSES = (
    'django.middleware.cache.UpdateCacheMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.cache.FetchFromCacheMiddleware',
)
```
###用户页面

用户信息页面在登出后不能继续用缓存页面, 而要刷新

__使用`@vary_on_cookie`装饰器__

```
from django.views.decorators.vary import vary_on_cookie
from django.contrib.auth.decorators import login_required

@login_required(login_url="/login/")
@vary_on_cookie
def profile(request):  
	# do something here...
	return HttpResponse(...)
```

###页面级缓存

```
from django.views.decorators.cache import cache_page,cache_control

@cache_page(60*5)
@cache_control(must_revalidate=True,max_age=60*5)
def profile(request):  
	# do something here...
	return HttpResponse(...)
```

###基于类的视图缓存

```
from django.views.decorators.cache import cache_page,cache_control
from app.views import *

urlpatterns = [
	   url(r'^$',cache_page(60*5)(cache_control(must_revalidate=True,max_age=60*5)(IndexView.as_view()),name="index")),
  ]
```

###刷新缓存

```
from django.core.cache import cache
from django.http import HttpRequest
from django.utils.cache import get_cache_key

def expire_page(request,path):
    # The cache of request url after 'expire/' will be deleted,
    # so you will get a fresh page !
    request2 = HttpRequest()
    request2.META['SERVER_NAME'] = request.META['SERVER_NAME']
    request2.META['SERVER_PORT'] = request.META['SERVER_PORT']
    request2.path = request.get_host()+'/'+path
    print request2.build_absolute_uri()
    key = get_cache_key(request2)
    if cache.has_key(key):
        cache.delete(key)
    return HttpResponse("OK, the cache is refreshed")
```
本质上是利用`HttpRequest`伪造了一个与想要清除缓存的URL地址相同的请求，通过`get_cache_key`这个函数生成`cache_key`，然后删除对应的cache，达到刷新页面的效果。函数可以进一步改进至用户前台输入`path`，然后清除缓存后通过`Ajax`返回成功信息...

>参考自[django中清除cache_page生成的缓存](http://lutaf.com/65.htm)
