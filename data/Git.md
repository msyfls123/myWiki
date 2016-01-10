Git同步服务器和本地代码
===
将本地代码通过Git同时保存在Github和服务器上, 使用版本版本管理工具的hook, 每次修改完文件只需`git push`一下

__两个目录:__

1. `/home/gitroot/projectname`是Git版本库目录
2. `/sites/projectname`是实际网站代码

###Github上的操作

#### 创建仓库
创建一个`Github repository`, 名字`projectname`, 不要带README文件

####在本机添加SSH(如已有SSH可忽略)
__主要目的:__ 省得每次输密码

1. `ssh-keygen -t rsa -b 4096 -C "m18771058712@live.com"`
2. 一路`Enter`
3. 输入`ssh-agent bash`进入BASH模式
4. `ssh-add C:/Users/Kimi/.ssh/id_rsa`添加`ssh-key`到`ssh-agent`
5. `exit`
6. 测试`ssh -T git@github.com`, 会显示
```
Hi msyfls123! You've successfully authenticated, but GitHub does not provide she
ll access.
```
7. 然后就可以正常进行`git push`了

###服务器端操作
1. 首先创建一个裸库，为什么是裸库？因为这个库不是真正用来修改的, 我们也不允许在服务器上修改代码, 我们只是把它当作一个代码中转的地方:
```
cd gitroot
mkdir projectname
cd projectname
git init --bare
```
2. 添加我们的`hook`
```
cd /hooks
touch post-update
```
3. 编辑`post-update`的内容, 其中`sites/projectname`, 是我们存放网站代码地方
```
#!/bin/sh
unset $(git rev-parse --local-env-vars)
env -i git archive master | tar -x -C /sites/projectname 
echo "远程更新完毕"
```
4. 输入`chmod 755 post-update`来使`post-update`可执行

5. 创建`/sites/projectname`目录, 以使`hook`能正常工作, 否则会报错

###本地git的操作
本地我们只需要添加一个远程库, 在需要部署的时候push到远程库就行了, 下面我们添加了两个分别名为`publish`和`origin`的远程库
```
git remote add publish username@xx.xx.xx.xx:/home/gitroot/projectname
git remote add publish git@github.com:username/projectname.git
git push publish master
```

###可以强化的地方
这里演示的是一个简单的小网站的部署过程，复杂的情况下我们还可以添加静态资源版本更新, 服务器重启等等, 举一反三,  最大程序自动化我们的工作。

>参考自[使用git代替FTP部署代码到服务器的例子](http://www.jb51.net/article/54867.htm)	