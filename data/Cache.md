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
@login_required(login_url="/login/") 
@vary_on_cookie
def profile(request):  
	# do something here...
	return HttpResponse(...)
```