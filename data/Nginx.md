奇技淫巧
===

###Nginx缓存

####Nginx重新编译

1. <kbd>坑壁阿里云一键安装web环境装了个阉割版的Nginx</kbd>, 需要我们重新编译

	```
	cd nginx-1.4.4

	./configure --user=www \
	--group=www \
	--prefix=/alidata/server/nginx \
	--with-http_stub_status_module \
	--with-http_ssl_module \
	--with-http_gzip_static_module

	make
	```

2. 然后把`objs`目录下的`nginx`拷贝到`/alidata/server/nginx-1.4.4/sbin`下面,原nginx备份处理

3. 运行`nginx -s stop` `/alidata/server/nginx-1.4.4/sbin/nginx -c /alidata/server/nginx-1.4.4/conf/nginx.conf`来重启Nginx

####HTTP配置

```
proxy_connect_timeout 5;
proxy_read_timeout 60;
proxy_send_timeout 5;
proxy_buffer_size 16k;
proxy_buffers 4 64k;
proxy_busy_buffers_size 128k;
proxy_temp_file_write_size 128k;
proxy_temp_path /home/temp_dir;
proxy_cache_path /home/cache levels=1:2 keys_zone=cache_one:200m inactive=1d max_size=5g;
```

####Server配置
```
server {
	listen 80;
	...

	location /static/ {
         proxy_pass http://127.0.0.1:81/staticp/;
         proxy_cache cache_one;
         proxy_cache_key $host$uri$is_args$args;
         proxy_set_header Host $host;
         proxy_set_header X-Forwarded-For $remote_addr;
         proxy_cache_valid 200 302 1h;
         proxy_cache_valid 301 1d;
         proxy_cache_valid any 1m;
         expires 1h;
    }

    location /staticp/ {
        alias  /home/hny/static_col/;
        expires 1h;
    }

}
```

__原理__ 将`/static/`开头的请求通过`proxy`代理到`/staticp/`上, 通过`/staticp/`获取静态文件后, `proxy_cache`生效, 将文件缓存