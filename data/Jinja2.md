使用Jinja2模板引擎`BETA`
===

###安装Jinja2
```
pip install Jinja2
```

###配置Settings
```
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.jinja2.Jinja2',
        'DIRS': [os.path.join(BASE_DIR, 'templates/jinja2')],
        'APP_DIRS': True,
        'OPTIONS': {
            'environment': '你的PROJECT名.jinja2p.environment',
        },
    },
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.core.context_processors.i18n',
            ],
        },
    },
]
```

###配置`你的PROJECT名/jinja2.py`文件
```
from __future__ import absolute_import  # Python 2 only

from django.contrib.staticfiles.storage import staticfiles_storage
from django.core.urlresolvers import reverse

from jinja2 import Environment


def environment(**options):
    env = Environment(**options)
    env.globals.update({
        'static': staticfiles_storage.url,
        'url': reverse,
    })
    return env
```

###使用

1. 放在`templates/jinja2`内的html可被`Jinja2`解析
2. 很多标签不一致，可参考[教程](http://docs.jinkan.org/docs/jinja2/)

###目前问题

1. admin模板只能使用Django自带的模板引擎
2. `Jinja2`不支持`RequestContext`对象

>参考自[Upgrading to Jinja2 Templates in Django 1.8 With Admin](http://jonathanchu.is/posts/upgrading-jinja2-templates-django-18-with-admin/)