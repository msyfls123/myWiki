#入坑

###SSH 登陆
+ 管理员身份登陆
+ `cd ~/.ssh/`
+ `touch authorized_keys`
+ `vim authorized_keys` 并粘贴入`id_rsa.pub`
+ `:x && exit`
+ 可以用 ssh key 登陆了

### Nginxa安装
+ `wget http://nginx.org/download/nginx-1.10.2.tar.gz`
+ `tar zxvf nginx-1.10.2.tar.gz`
+ `wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz`
+ `tar zxvf pcre-8.35.tar.gz`
+ ```
  cd pcre-8.35
  ./configure
  make && make install

  cd nginx-1.10.2
  ./configure --user=www \
  --group=www \
  --prefix=/opt/server/nginx \
  --with-http_stub_status_module \
  --with-http_ssl_module \
  --with-http_gzip_static_module
  make && make install
  ```

+ 一般会失败需要安装`openssl zlib`等  
  `apt-get install libtool g++ openssl libssl-dev libperl-dev`

### 配置Nginx
+ 增加 www / www
  ```
  /usr/sbin/groupadd -f www
  /usr/sbin/useradd -g www www
  ```
+ 修改 `/opt/server/nginx/conf/nginx.conf`
  ```
  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;

  proxy_connect_timeout 5;
  proxy_read_timeout 60;
  proxy_send_timeout 5;
  proxy_buffer_size 16k;
  proxy_buffers 4 64k;
  proxy_busy_buffers_size 128k;
  proxy_temp_file_write_size 128k;
  proxy_temp_path /home/temp_dir;
  proxy_cache_path /home/cache levels=1:2 keys_zone=cache_one:200m inactive=1d max_size=5g;

  gzip  on;
  gzip_min_length  1k;
  gzip_buffers     4 16k;
  gzip_http_version 1.0;
  gzip_comp_level 2;
  gzip_types       text/plain application/x-javascript text/css application/xml;
  gzip_vary on;

  include /opt/server/nginx/conf/vhosts/*.conf;
  ```
+ `/opt/server/nginx/conf/` 下新建 `vhost` 文件夹，`touch web.conf`
  ```
  server {
      listen       80;
      server_name  localhost;

      #charset koi8-r;

      #access_log  logs/host.access.log  main;

      location / {
          root   /opt/web;
          index  index.html index.htm;
      }

      #error_page  404              /404.html;

      # redirect server error pages to the static page /50x.html
      #
      error_page   500 502 503 504  /50x.html;
      location = /50x.html {
          root   html;
      }

      # proxy the PHP scripts to Apache listening on 127.0.0.1:80
      #
      #location ~ \.php$ {
      #    proxy_pass   http://127.0.0.1;
      #}

      # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
      #
      #location ~ \.php$ {
      #    root           html;
      #    fastcgi_pass   127.0.0.1:9000;
      #    fastcgi_index  index.php;
      #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
      #    include        fastcgi_params;
      #}

      # deny access to .htaccess files, if Apache's document root
      # concurs with nginx's one
      #
      #location ~ /\.ht {
      #    deny  all;
      #}
  }
  ```
+ 在 `/opt/web/` 下放个 `index.html`
+ `apt-get install nginx-extras`
+ `nginx -c /opt/server/nginx/conf/nginx.conf`
+ `nginx -s reload` 重启，无报错则 ok
+ 应该可以访问你的 IP 了

### Vim配置
+ `touch .vimrc` 可见 [vim config](http://msyfls123.github.io/myWiki/index.html?name=douban#vim-config-demo)
+ 插件安装包 `git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim`

### 挂载数据盘
+ `fdisk -l`
+ `fdisk /dev/vdb`
+ 按照界面的提示，依次输入`n`(新建分区)、`p`(新建扩展分区)、`1`(使用第1个主分区)，两次回车(使用默认配置)，输入`wq`(保存分区表)，回车开始分区。
+ `mkfs.ext3 /dev/vdb1`
+ `mount /dev/vdb1 /data` 会覆盖 `/data` 数据
+ `echo '/dev/vdb1 /data ext3 defaults 0 0' >> /etc/fstab`
+  `df -h` 查看挂载结果
+ 参见 [HERE](https://www.qcloud.com/document/product/213/2974)

### 继续折腾吧~
