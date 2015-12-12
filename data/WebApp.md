WebApp
===


### 配置Android环境
1. 安装[JAVA环境](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)，配置`Path = D:\Program Files\Java\jdk1.7.0_60\bin;`
2. 安装[Eclipse](http://www.eclipse.org/downloads/)
3. 安装[Android-SDK](http://dl.google.com/android/android-sdk_r24.4.1-windows.zip)
4. 安装[ADT Plugin](http://pan.baidu.com/s/1hqtivf2)
5. 配置Android SDK Manager，安装对应sdk
	+ `Tools``Options`的`Proxy`
		+ `HTTP Proxy Server:mirrors.neusoft.edu.cn`
		+ `HTTP Proxy Port:80`
		+ `Force https://... sources to be fetched using http://...`

	+ 安装以下Packages:
		+ SDK Tools (必须)
		+ SDK Platform-tools (必须)
		+ SDK Platform (必须至少安装一个版本,API22必须)
		+ System Image(装ARM EABI v7a System Image, 5.1版本的)
		+ Extras : Support Library / Support Repository / USB Driver / Accelerator
6. 系统变量加入`;..\android-sdk\platform-tools;..\android-sdk\tools`

### 安装Cordova和Ionic

	npm install -g cordova ionic

### 创建项目
	
	ionic start myApp tabs
	<!--'blank' 'tabs' 'sidemenu' -->

### 运作项目

	ionic serve

### 编译成APK

	ionic platform add android
	ionic build android

### 模拟器

	ionic emulate android