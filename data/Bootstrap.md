Django后台Bootstrap化
===
###[django-admin-bootstrapped](https://github.com/django-admin-bootstrapped/django-admin-bootstrapped)
1. `pip install django-admin-bootstrapped` (virtualenv highly suggested)
2. Add `django_admin_bootstrapped` into the `INSTALLED_APPS` list before `django.contrib.admin`
3. Have fun!

Your INSTALLED_APPS should look like this:
```
INSTALLED_APPS = (
    'django_admin_bootstrapped',
    'django.contrib.admin',

    ...
)
```
__注意，会重装Django__

###[django-admin-bootstrap](https://github.com/django-admin-bootstrap/django-admin-bootstrap)
1. pip install bootstrap-admin
2. And don't forget to add bootstrap_admin in INSTALLED_APPS before the django.contrib.admin.
  Example:
  ```
  INSTALLED_APPS = (
      # ...
      'bootstrap_admin', # always before django.contrib.admin
      'django.contrib.admin',
      # ...
  )
  ```
3. For Sidebar Menu in Django 1.8 be sure to have the correct TEMPLATES settings with the correct request template processor loaded 'django.template.context_processors.request' :
  ```
  from django.conf import global_settings
  TEMPLATES = [
      {
          'BACKEND': 'django.template.backends.django.DjangoTemplates',
          'DIRS': [
              # insert your TEMPLATE_DIRS here
          ],
          'APP_DIRS': True,
          'OPTIONS': {
              'context_processors': [
                  # Insert your TEMPLATE_CONTEXT_PROCESSORS here or use this
                  # list if you haven't customized them:
                  'django.contrib.auth.context_processors.auth',
                  'django.template.context_processors.debug',
                  'django.template.context_processors.i18n',
                  'django.template.context_processors.media',
                  'django.template.context_processors.static',
                  'django.template.context_processors.tz',
                  'django.contrib.messages.context_processors.messages',
                  'django.template.context_processors.request'
              ]
          },
      },
  ]

  BOOTSTRAP_ADMIN_SIDEBAR_MENU = True
  ```
__对数字等特殊输入支持不好__
