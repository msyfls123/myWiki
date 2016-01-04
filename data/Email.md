发送邮件
===
###设置`Settings.py`
```
EMAIL_HOST = 'smtp.qq.com'
EMAIL_PORT = 25
```
###设置`Views.py`
```
from django.core.mail import send_mail
send_mail(u'我是标题', u'我是正文.', '发件QQ号@qq.com',
    ['收件邮箱@地址'], fail_silently=False,auth_user='发件QQ号@qq.com',auth_password='QQ密码')

```
###配置自定义发送
```
if request.method == 'POST':
    send_addr = request.POST["from"]
    auth_name = request.POST["name"]
    auth_passwd = request.POST["passwd"]
    to_addr = request.POST["to"].split(',')
    title = request.POST["title"]
    content = request.POST["content"]
    try:
        send_mail(title, content, send_addr,to_addr, fail_silently=False,auth_user=auth_name,auth_password=auth_passwd)
    except Exception, e:
        raise Exception
    finally:
        return HttpResponseRedirect("/")
```