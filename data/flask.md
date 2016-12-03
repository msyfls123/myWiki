Flask
==

### 安装
```
# 安装环境
apt-get install python-mysqldb
apt-get install python-dev
apt-get install supervisor
# 安装 Flask 和 uWSGI
pip install Flask
pip install uwsgi
```

### 写个 2B 的数据库展示 APP
`/data/flask-demo/app.py`
```
import sql as db
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return '<li>' + '</li><li>'.join(db.showdb()) + '</li>'
@app.route('/no')
def tell_me():
    return '!!!help me!'

if __name__ == '__main__':
    app.run()
```
`/data/flask-demo/sql.py`
```
import os, sys, string
import MySQLdb

def showdb():
    try:
        conn = MySQLdb.connect(host='localhost', user='***', passwd='******', db='ebichu')
    except Exception, e:
        print e
        sys.exit()

    cursor = conn.cursor()

    sql = 'select * from workers_info;'
    try:
        cursor.execute(sql)
    except Exception, e:
        print e

    data_list = []
    data = cursor.fetchall()
    if data:
        for rec in data:
            data_list.append(str(rec))

    cursor.close()
    conn.close()

    return data_list
```

### 配置 uWSGI
`/data/flask-demo/config.ini`
```
[uwsgi]
socket = 127.0.0.1:8777
processes = 4
threads = 2
master = true
chdir = /data/flask-demo
module = app
callable = app
memory-report = true
python-autoreload = 1
```

### 配置 supervisor
+ `/etc/supervisor/conf.d/flask.conf`
  ```
  [program:flask]
  command=/usr/local/bin/uwsgi --ini /data/flask-demo/config.ini
  directory=/data/flask-demo
  user=root

  autostart=true
  autorestart=true
  redirect_stderr = true
  stdout_logfile=/data/flask-demo/logs/uwsgi_supervisor.log
  stdout_logfile_maxbytes = 5MB
  ```
+ ```
  ps -A | grep supervisor
  kill <id>
  mkdir /data/flask-demo/logs
  supervisord -c /etc/supervisor/supervisord.conf
  supervisorctl stop flask
  supervisorctl start flask
  ```
  [config.ini](http://juxuan.fu.blog.163.com/blog/static/112129259201411188132562/)
  [Deploying-Flask-with-nginx-uWSGI-and-Supervisor/](http://flaviusim.com/blog/Deploying-Flask-with-nginx-uWSGI-and-Supervisor/)
+ 这时已经可以在 `127.0.0.1：8777` 上看到应用了

### 配置 Nginx 代理
+ `/opt/server/nginx/conf/vhosts/flask.conf`
  ```
  server {
      listen       80;
      server_name  ebichu.cc;

      #charset koi8-r;
      #access_log  logs/host.access.log  main;

      location / {
        root /opt/web;
        index index.html index.htm;
      }

      location = /flask { rewrite ^ /flask/; }
      location /flask { try_files $uri @flask; }
      location @flask {
          include uwsgi_params;
          uwsgi_param SCRIPT_NAME /flask;
          uwsgi_modifier1 30;
          uwsgi_pass 127.0.0.1:8777;
      }
  }
  ```
  [nginx配置](http://docs.jinkan.org/docs/flask/deploying/uwsgi.html)
+ `nginx -s reload`

### 多应用
#### 方法1：一个 uWSGI 挂载多个 app
`/data/uwsgi/config.ini`
```
[uwsgi]
socket = 127.0.0.1:8777
processes = 4
threads = 2
master = true
mount = /home=/data/home/app.py
mount = /service=/data/service/app.py
mount = /help=/data/help/app.py
callable = app
memory-report = true
manage-script-name = true
python-autoreload = 1
```
`/opt/server/nginx/conf/vhosts/uwsgi.conf`
```
location / {
    include uwsgi_params;
    uwsgi_pass 127.0.0.1:8777;
}
```
注意：`nginx server` 的 `location` 只能是 `/`

#### 方法2：多个 uWSGI 管理 app
+ 通过 `supervisor` 分别启动不同的 uwsgi 进程。  
  有可能需要重启 supervisord 进程
  ```
  root@VM-112-92-ubuntu:/etc/supervisor/conf.d# supervisorctl status
  flask                            RUNNING    pid 23510, uptime 0:04:36
  flask2                           RUNNING    pid 23526, uptime 0:04:32
  ```
+ `Nginx` 相关部分如下配置
  ```
  location /flask {
      include uwsgi_params;
      uwsgi_param SCRIPT_NAME /flask;
      uwsgi_modifier1 30;
      uwsgi_pass 127.0.0.1:8777;
  }

  location /test {
      include uwsgi_params;
      uwsgi_param SCRIPT_NAME /test;
      uwsgi_modifier1 30;
      uwsgi_pass 127.0.0.1:8666;
  }
  ```
+ 需要保证 `location` 和 `SCRIPT_NAME` 一致  
 [参考资料](http://www.cnblogs.com/soukingang/p/5694872.html)
