蜗牛前端实习
===
###蜗牛直播平台
+ URL [v.woniu.com](http://v.woniu.com)

+ 开发 `Gulp` + `Less` + `CSS-sprite雪碧图`

  + 根据不同类型（flash/iframe/video）动态渲染直播源至页面
  + 视频列表页面的js 分页及按页面宽度缩放列表项以充满屏幕宽度
  + 针对不同屏幕及不同内容长度对侧边栏、主体内容和底栏做兼容性适配

![video1](imgs/woniu/v_.jpg)

###某海外视频站点
+ URL [video_site](http://139.129.133.18/video_site/all.html)
+ 开发 `webpack` + `Sass`

  + 首页及列表页的无限滚动加载
  + Vue 做用户评论点赞功能的组件化开发
  + 未购买用户视频播放时的购买弹窗功能

`页面未真正上线，故接口并没有暴露在外网，打开页面会报错`

![video1](imgs/woniu/video_1.png)
![video2](imgs/woniu/video_2.png)

###太极熊猫2天团战活动
+ URL [活动主页](http://m.panda2.woniu.com/static/act/201605/zqgh/?uuid=testuid&token=1234567#!/index)
[活动分享页](http://m.panda2.woniu.com/static/act/201605/zqgh/?uuid=testuid&nickname=eclairff_&token=1234567#!/share)
+ 开发 `webpack` + `Vue` + `Less`
  + 微信回复关键词获取uuid，后台经第三方接口生成用户token作为用户标识
  + 用户报名后分享至朋友圈或好友，好友可根据shareid（即报名者token）给对应用户投票
  + 利用`Vue-router`做了单页面路由，因该活动数据量较小，故直接建了个module作为数据容器

![天团战1](imgs/woniu/ttz1.jpg)
![天团战2](imgs/woniu/ttz2.jpg)

###九阳神功以武为尊抽奖活动
+ URL [http://9yang.woniu.com/static/act/201606/highwushu/](http://9yang.woniu.com/static/act/201606/highwushu/)

+ 开发 `webpack` + `Vue` + `Sass`
 + 用户登录抽奖+分享加抽奖机会
 + 用户登录签到+按签到次数发奖

![以武为尊1](imgs/woniu/ywwz1.jpg)
![以武为尊2](imgs/woniu/ywwz2.jpg)

###太极熊猫2好声音活动
+ URL [http://m.panda2.woniu.com/static/act/201604/voice/](http://m.panda2.woniu.com/static/act/201604/voice/)
+ 开发 `React`
 + 渲染音频列表，绑定播放投票等事件
 + 储存显示抽奖码

![好声音1](imgs/woniu/voice1.jpg)
![好声音2](imgs/woniu/voice2.jpg)

###蜗牛免卡宣传页面
+ URL[http://mobile.snail.com/card/](http://mobile.snail.com/card/)
+ 开发 `Gulp` + `Less` + `CSS-sprite`
 + 小图标合并
 + css3动画平稳退化
 + 不足之处：免卡展开动画因为涉及到切换background，没有对后插入的图片做预加载

![蜗牛免卡](imgs/woniu/mianka.jpg)

###其他部分页面

+ 方舟大逃杀夏季杯决赛页面 [http://playark.com.cn/summercupfinal/](http://playark.com.cn/summercupfinal/)

+ 方舟大逃杀夏季杯报名页面(CDN挂了，有问题ing) [http://playark.com.cn/summercup/](http://playark.com.cn/summercup/)

+ 方舟大逃杀夏季杯排行榜页面 [http://playark.com.cn/summercup/gongbu/#!/index](http://playark.com.cn/summercup/gongbu/#!/index)

![ARK](imgs/woniu/ark.jpg)

+ 九阴手游武林至尊新版本专题[http://9yinsy.woniu.com/static/act/201607/wlzz/](http://9yinsy.woniu.com/static/act/201607/wlzz/)

![九阴手游武林至尊](imgs/woniu/wlzz.jpg)

+ 樱花三国推广页面
[http://m.yh.woniu.com/static/tg/ad1/](http://m.yh.woniu.com/static/tg/ad1/)

![樱花三国](imgs/woniu/yhtg.jpg)

+ 九阴真经2概念站 [http://9yin2.woniu.com/](http://9yin2.woniu.com/)

![九阴真经2概念站](imgs/woniu/9yin.jpg)
![九阴真经2概念站](imgs/woniu/9yin2.jpg)
