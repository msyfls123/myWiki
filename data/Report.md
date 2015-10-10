![广州白云万达广场雕塑](imgs/title.jpg)

#实习报告

>咏到老树婆娑叶茂枝繁根牢固，春来桃李璀璨红嫣姹紫绿晶莹
><p style="font-size:12px;float:right;margin-top:-15px;">———— 叶问堂</p>


###简介
从7月初踏上佛山顺德这片工业设计的热土，至今已在广东工业设计城实习了两个半月了，现大致将实习经历和感受体悟汇报一下。实习期间参与了数个项目，包括产品调研，产品设计的配色，网页设计，画册排版，微营销的推广及网络众筹等。对项目可行性的把控能力，对市场需求的发掘，以及对自身职责定位都在实习过程中得到了提高。在亲身经历商业项目的制作实施过程中，深感学校学习的重要性，同时也感受到设计不能仅仅依赖想象，更需要让__设计__落到实处，让创意__落地__。

###项目概览
1. 干衣机的设计调研及市场定位分析，并完成干衣机的配色、衣柜图案设计及包装箱设计
2. 某企业网站网页设计，尝试制作页面banner宣传图的演示demo
3. 某品牌净水器网站网页设计及相应APP界面设计
4. 某品牌产品画册的排版
5. 尚致设计自身微营销的制作（所用工具：[易企秀](http://www.eqxiu.com))
6. 绿真超能饮食净化器的众筹页面设计（[购买链接](http://www.zhongchou.com/deal-show/id-195967)）

###设计调研部分

>工欲善其事   必先利其器

实习所接到第一个项目是对市面上在售干衣机做一个总体的市场调研，分析一下市场的喜好。首先遇到的问题就是市场范围的选择，经过再三考量，选择[天猫商城](http://www.tmall.com)作为调研的目标。最初打算用Python写一个网络爬虫爬取经过[几次失败的尝试](PythonTryTaobao)，触发了阿里巴巴的反爬虫机制，无功而返。当然这也是情理之中的事，如果不对类似的接口进行控制，那网络上的资源将变得更加低廉。这于消费者和普通用户当然是好事，但于大公司（尤其依赖数据挖掘分析技术牟利的公司）而言，丧失了数据的保密性，也就丧失了对市场的主导权，前不久网络上闹得沸沸扬扬的“携程网宕机”事件就是数据安全的典型案例。

直接提取天猫的项目列表页进行分析看来是行不通的了，那只能在加载完页面后进行提取。故选择所有浏览器都用的开发者工具（按`F12`进入，选择`Console`标签卡），使用Javascript直接获取加载完的页面元素，在`Console`上显示结果。

####Javascript抓取数据

1. 在淘宝首页搜索关键词`干衣机`，在打开页面内选择`天猫`标签页,进入列表页后按`F12`进入到`Console`内
2. 复制<a data-toggle="tooltip" title="跳转到代码部分" href="javascript:$('html,body').animate({scrollTop: $('#codeT').offset().top}, 1000);">代码</a>并粘贴到`Console`内，单击`Enter`
3. 如果顺利的话（不顺利的话就算了吧），可以看到商品信息（包括商品名、店铺名，销量和价格）都会显示在`Console`内，只需要`Ctrl+C``Ctrl+V`到记事本里，并保存为`*.csv`文件，就可以在Excel里进行各种<a data-toggle="tooltip" title="跳转到数据处理" href="javascript:$('html,body').animate({scrollTop: $('#csvId').offset().top}, 1000);">数据处理</a>。

<span id="codeT"></span>
####__代码__
  
    //读取商品价格
    price=document.getElementsByTagName('strong');
    var list=new Array();
    for(i=2;i<=price.length-1;i++){list.push(price[i].innerHTML)};

    //读取店铺名称
    shop=document.getElementsByClassName('shopname J_MouseEneterLeave J_ShopInfo');
    var list2=new Array();
    for(k=0;k<=shop.length-1;k++){list2[k]=shop[k].childNodes[3].innerHTML};

    //读取商品名称
    nameP=document.getElementsByClassName('row row-2 title');
    var list3=new Array();
    for(k=0;k<=nameP.length-1;k++){list3[k]=nameP[k].textContent.replace(/\s+/g, "")};

    //读取商品页面地址
    URL=document.getElementsByClassName('J_U2IStat');
    var list4=new Array();
    for(i=0;i<=URL.length/2-1;i++){list4[i]=URL[2*i].href};

    //读取购买人数
    buyer=document.getElementsByClassName('deal-cnt');
    var list5=new Array();
    for(i=0;i<=buyer.length-1;i++){list5[i]=buyer[i].textContent.slice(0,-3) };

    //输出成数据
    var listTotal=new Array();
    for (var i = 0; i <= list.length-1; i++) {
      listTotal.push("\n"+list3[i]);
      listTotal.push(list[i]);
      listTotal.push(list5[i]);
      listTotal.push(list2[i]);
      listTotal.push(list4[i]);
    }
    console.log(listTotal.join(","));

__代码文件：__[所得数据文件](store/tmall_js/data.csv) / [Javascript代码文件](store/tmall_js/test.js)

#####*简易版本

![更改书签](imgs/EditBookmark.jpg)

不会打开`Console`，嫌复制粘贴麻烦？试试复制以下代码并保存为浏览器的一个书签，操作方式如上图所示。之后就可以在搜索页面点击这个书签，便可弹出带有商品信息的对话框。加入书签之后可以拿[`这个网址`](https://s.taobao.com/search?q=%E5%B9%B2%E8%A1%A3%E6%9C%BA&tab=mall)试一下。

    javascript: ( function (){price=document.getElementsByTagName('strong');var list=new Array();for(i=2;i<=price.length-1;i++){list.push(price[i].innerHTML)};shop=document.getElementsByClassName('shopname J_MouseEneterLeave J_ShopInfo');var list2=new Array();for(k=0;k<=shop.length-1;k++){list2[k]=shop[k].childNodes[3].innerHTML};nameP=document.getElementsByClassName('row row-2 title');var list3=new Array();for(k=0;k<=nameP.length-1;k++){list3[k]=nameP[k].textContent.replace(/\s+/g, "")};URL=document.getElementsByClassName('J_U2IStat');var list4=new Array();for(i=0;i<=URL.length/2-1;i++){list4[i]=URL[2*i].href};buyer=document.getElementsByClassName('deal-cnt');var list5=new Array();for(i=0;i<=buyer.length-1;i++){list5[i]=buyer[i].textContent.slice(0,-3) };var listTotal=new Array();for (var i = 0; i <= list.length-1; i++) {listTotal.push("\n"+list3[i]);listTotal.push(list[i]);listTotal.push(list5[i]);listTotal.push(list2[i]);listTotal.push(list4[i]);};alert(listTotal.join(","));})();

#####主要特点

1. 将天猫上搜索得到的商品数据快速汇总，无需重复手工复制粘贴
2. 绕开了阿里巴巴的反爬虫程序……在页面加载完成后对页面数据进行提取，一次可提取40条信息，比直接抓取略费时一点
3. 所得数据可以直接保存为csv文件在Excel中打开

####数据分析
有了数据之后我们可以做很多事，比如分析商品价格和销量的关系，商品颜色的差异性，色调风格与价格销量的关系等等。现在也有很多种工具帮助实现数据的可视化，这将是我在接下来的实习工作中重点研究的方向。这里是<a data-toggle="tooltip" title="跳转到分析部分" href="javascript:$('html,body').animate({scrollTop: $('#imgAna').offset().top}, 1000);">在PPT内完成的简单分析</a>。
<script type="text/javascript" src="files/js/highcharts.js"></script>
<script type="text/javascript" src="files/js/highcharts-more.js"></script>
<script type="text/javascript" src="files/js/data.js"></script>
<script type="text/javascript" src="files/js/exporting.js"></script>
<div id="container" style="max-width:800px; height:400px;margin:20px auto;border:3px solid #7CB5EC"></div>
<script type="text/javascript" src="files/js/graphic.js"></script>

#####干衣机市场概况
1. 价格区间位于100至200间的产品占总量的90%以上
2. 大多数产品选择冷色系浅蓝色
3. 在色系图中大部分产品位于浅色调和亮色调上，少部分位于暗色调和暗灰色调
4. 纯色、条纹和简单图案的销量均很高，体现大众对于简洁图案的喜爱，但不可忽视的是复杂图案和场景有着丰富的种类很多，可以满足不同消费者的需要
5. 简单图案，条纹和纯色销量差异性较大，可以针对特殊群体进行优化以达到高销量，而复杂图案销量不一，说明其受众较为普遍

有了比较详细的市场喜好数据后，设计就变得有目标，有方向了很多，可以针对不同目标群体来优化<a data-toggle="tooltip" title="跳转到设计案例" href="javascript:$('html,body').animate({scrollTop: $('#flow-box').offset().top}, 1000);">其后的设计</a>。

<span id="imgAna"></span>
#####色彩趋势分析
![色彩趋势](imgs/survey1.jpg)
#####价格与销量趋势分析
![价格与销量趋势](imgs/survey2.jpg)

<span id="csvId"></span>
####天猫干衣机前20名列表
数据已经过Excel整理，各项信息为笔者采集时所录，不保证其时效性
<table id="csvText">
    <th>商品名</th>
    <th>价格</th>
    <th>销量</th>
    <th>店铺名</th>
    <th>网址</th>
</table>

<!-- 调用csv文件生成表格 -->
<script type="text/javascript">
  var data=d3.csv("store/tmall_js/top20.csv",function(error,csvdata){  
    if(error){  
      console.log(error);  
    }   
    for (var i = 0; i <= csvdata.length - 2; i++) {
      $("table#csvText").append("<tr><td>"+csvdata[i].name+"</td><td>"+csvdata[i].price+"</td><td>"+csvdata[i].sell+"</td><td>"+csvdata[i].shop+"</td><td><a href="+csvdata[i].url+">"+csvdata[i].url+"</a></td></tr>");
    };

    // console.log(csvdata);
    });
</script>


###产品众筹部分
>酒香还怕巷子深

俗话说酒香不怕巷子深，但这句话在当今的社会早就是不适用的了。人人都在使劲推广自家的产品和服务，让设计走出去成为当下必然的选择。

![greenreal](imgs/greenreal-01.jpg)

要问2014年互联网最火的是什么？当然是众筹。众筹，通俗地讲，就是预先把产品信息告诉潜在的消费者，消费者可以预购即将量产的产品，这样既给产品制造方提供了订单的保证，又有效减少了前期投资的风险。

![greenreal](imgs/greenreal-02.jpg)

####众筹页面展示
我们公司出品的绿真超能饮食净化器，采用臭氧杀菌消毒技术，可以有效去除食物表面农药残留及微生物细菌等，现正式上市前，需要在网络上进行众筹试探市场反应。实习期间主要配合策划人员设计并实现相关产品展示页面.

![greenreal](imgs/greenreal-03.jpg)

经过一番调查，发现众筹的产品大多有自己的特色，并把特色作为主要方面进行突出展示。而我们公司的产品主打的是健康牌，故需要用一些比较卡通的场景进行带入。

![greenreal](imgs/greenreal-04.jpg)

这里运用了情感化设计的方法，将臭氧杀菌的过程拟人化、卡通化，以达到取悦消费者的需求，增进消费者对产品的喜爱度。各种精致的实物展示图则是获取消费者的信任感，提升他们对于产品的认同度。当然，最后消费者的感受能否转化成实际的购买力，那就要看产品的定位与消费者的实际消费水平的均衡，这也就是众筹的目的所在。

[众筹网演示页面](http://www.zhongchou.com/deal-show/id-195967)

####饮食净化器宣传
< 可操作 —— 拖拽页面 >
<iframe frameborder = "0" src="http://eqxiu.com/s/2Ra6kSQR" style="width:27.13rem;height:52.25rem;position:relative;left:50%;margin:1rem 0 1rem -13.565rem;border:2px solid #234;border-radius:18px;"></iframe>

###总结
实习尚未结束，正在进行的还有尚致自身官网的建设以及微营销的宣传，期待将更多新颖的技术引入到设计及设计的推广之中。谢谢！

下面是我的部分设计作品展示，由于经验和能力所致，作品尚不成熟，希请各位指正。


###附录-设计案例展示
<ul id="flow-box">

</ul>

<!-- 添加图片 -->
<script type="text/javascript">
  var titlearr=[
    ["null","hello~friend"],
    ["尚致设计有限公司图示","卡通色块风格，使用AI创作"],
    ["尚致设计有限公司简介","在前图基础上添加铺在地上的文字，增加纵深感"],
    ["手持吸奶器","海马状的造型，独创间歇式吮吸模式，荣膺红星奖"],
    ["牙科综合治疗椅","海底生物造型，多项先进专利，荣膺红星奖"],
    ["某品牌汽车除味机","版面设计"],
    ["某品牌汽车除味机","版面设计"],
    ["某品牌手机APP设计","仿支付宝APP设计"],
    ["某品牌手机APP设计","常规选项页面"],
    ["某品牌网页设计","突出商品售卖的首页"],
    ["某品牌网页设计","文章页面设计"],
    ["某品牌手机APP设计","文章页面"],
    ["某品牌网页设计","文章列表页设计"],
    ["某品牌网页设计","图文列表页设计"],
    ["绿真易企秀页面","说明食品污染的严重性"],
    ["绿真易企秀页面","功能说明图标"],
    ["绿真易企秀页面","漫画形式表现水分子的运动"],
    ["绿真易企秀页面题","漫画形式展现水分子消除农残和病菌"],
    ["某品牌智能锁众筹方案","众筹详情页面简笔设计草案，待实施"],
    ["创意咖啡背景墙","水滴入水池多边形风格"],
    ["创意咖啡背景墙","电脑连接APP"],
    ["绿真众筹封面图","绿真众筹封面图"],
    ["简洁列表页","某品牌皮鞋列表页"],
    ["品牌展示页","某品牌皮鞋展示页"],
    ["品牌宣传页","某品牌企业风格展示页"],
    ["某干衣机设计","有钱男性风格"],
    ["某干衣机设计","单身女性风格"],
    ["干衣机外包装设计","简洁被风吹起的衣服图案"],
    ["某干衣机衣柜设计","呆萌喷水鲸鱼风格"],
    ["某品牌企业招贴画","万丈高楼平地起，体现力量感"],
    ["某品牌企业招贴画计","机器手抓取残次品，体现严谨"],
    ["某品牌企业招贴画","树的叠影，体现成长"],
    ["某品牌企业招贴画","一群大雁，体现团结的力量"],
    ["某品牌企业招贴画","撑杆跳，体现飞翔的感觉"],
    ["企业愿景","成为行业知名上市企业"],
    ["企业文化","勤劳 朴实 诚信 共赢"],
    ["合作伙伴","诚信服务 共赢未来"],
    ["质量方针","不接受不良品  不生产不良品  不放行不良品"],
    ["做事原则","有所为 有所不为"],
    ["团队精神","孤军奋战 其力有限 众志成城 坚不可摧"]
  ]

  for (var i = 1; i <= 39; i++) {
      var imgLi=document.createElement("li");
      var imgA=document.createElement("a");
      var imgNode=document.createElement("img");
      var imgH=document.createElement("h6");
      imgH.innerHTML=titlearr[i][0];
      imgNode.setAttribute("src","imgs/repo/"+i+".jpg");
      imgA.setAttribute("href","imgs/repo/"+i+".jpg");
      imgA.setAttribute("title",titlearr[i][0]+" - "+titlearr[i][1]);
      imgA.setAttribute("class","flow-img");
      imgA.appendChild(imgNode);
      imgLi.appendChild(imgA);
      imgLi.appendChild(imgH);
      document.getElementById("flow-box").appendChild(imgLi);
  }
</script>

<!-- 排列图片 -->
<script>
 /*
     原理：
1.把所有的li的高度值放到数组里面
     2.第一行的top都为0
     3.计算高度值最小的值是哪个li
     4.把接下来的li放到那个li的下面
     */
    var margin = 8;//这里设置间距
    var li=$("#flow-box li");//这里是区块名称
    var li_W = li[0].offsetWidth+margin;//取区块的实际宽度（包含间距，这里使用源生的offsetWidth函数，不适用jQuery的width()函数是因为它不能取得实际宽度，例如元素内有pandding就不行了）
    function waterFlowImg(){//定义成函数便于调用
        var h=[];//记录区块高度的数组
        var n = document.getElementById("flow-box").offsetWidth/li_W|0;//窗口的宽度除以区块宽度就是一行能放几个区块
        // alert(n)
        for(var i = 0;i < li.length;i++) {//有多少个li就循环多少次
            li_H = li[i].offsetHeight;//获取每个li的高度
            if(i < n) {//n是一行最多的li，所以小于n就是第一行了
                h[i]=li_H;//把每个li放到数组里面
                li.eq(i).css("top",8);//第一行的Li的top值为0
                li.eq(i).css("left",i * li_W+8);//第i个li的左坐标就是i*li的宽度
            }
            else{
                min_H =Math.min.apply(null,h) ;//取得数组中的最小值，区块中高度值最小的那个
                minKey = getArrayKey(h, min_H);//最小的值对应的指针
                h[minKey] += li_H+margin ;//加上新高度后更新高度值
                li.eq(i).css("top",min_H+margin+8);//先得到高度最小的Li，然后把接下来的li放到它的下面
                li.eq(i).css("left",minKey * li_W+8);//第i个li的左坐标就是i*li的宽度
            }
            $("h6").eq(i).text(li.eq(i).find("img").attr("alt"));//把区块的序号和它的高度值写入对应的区块h6标题里面
        }
       var LiTop=li.eq(li.length-1).css("top");
       var LiTopNum=Number(LiTop.slice(0,-2));
       var LiHeight=li.eq(li.length-1).css("height");
       var LiHeightNum=Number(LiHeight.slice(0,-2));
       $("#flow-box").css("height",LiTopNum+LiHeightNum+30)
    }
    /* 使用for in运算返回数组中某一值的对应项数(比如算出最小的高度值是数组里面的第几个) */
    function getArrayKey(s, v) {for(k in s) {if(s[k] == v) {return k;}}}
    /*初始化时计算图片位置，这里一定要用onload，因为图片不加载完就不知道高度值*/
    window.onload = function() {waterFlowImg();};
    /*浏览器窗口改变时重新布局排版*/
    window.onresize = function() {waterFlowImg();};
    window.onscroll = function() {waterFlowImg();};
</script>

<!-- 显示大图片 -->
<script type="text/javascript">
        $(document).ready(function() {
            $("#flow-box li>a").imgbox({
              padding: 0,               // Set the padding/transparent border around the image.
              border: 0,                 // Set the solid border around the image.
              alignment: 'center',       // Position - may be auto OR center.
              allowMultiple: false,      // Allow opening multiple imgBoxes.
              autoScale: true,           // Scale the image to fit the available space.
              speedIn: 500,              // Set the zoom-in speed.
              speedOut: 500,             // Set the zoom-out speed.
              easingIn: 'swing',         // Set the zoom-in animation easing.
              easingOut: 'swing',        // Set the zoom-out animation easing.
              zoomOpacity: false,        // If true, changes image transparency when zooming.
              overlayShow: true,         // Display an overlay under the imgBox.
              overlayOpacity: 0.85,       // Set overlay opacity.
              hideOnOverlayClick: true,  // Hide imgBox when the overlay is clicked.
              hideOnContentClick: true, // Hide imgBox when the image is clicked.
              slideshow: false,           // Display next/previous controls.
              theme: 'light'             // Choose a color scheme (light/black).
            });
        });
</script>


<!-- #####网站首页banner展示

<iframe src="store/banner/demo.html" style="width:100%;height:200%;display:block;border: 1px solid #aaa;border-radius: 10px;zoom:50%" scrolling="no"></iframe>

#####鼠标悬浮切换背景

<iframe src="store/quarter/quarter.html" width=628 height=300 frameBorder="0" style="padding:20px 0px;background:#EFEFEF;border: 1px solid #ccc;border-radius: 4px" scrolling="no"></iframe> -->



#####尚致设计-易企秀
< 可操作 —— 拖拽页面 >
<iframe frameborder = "0" src="http://eqxiu.com/s/xhJv1aEi" style="width:27.13rem;height:52.25rem;position:relative;left:50%;margin:1rem 0 1rem -13.565rem;border:2px solid #234;border-radius:18px;"></iframe>

<!-- #####尚致设计-微官网
< 可操作 —— 点击页面图标 >
<iframe width="628px" frameborder = "0" height="568px" src="http://wx.budray.com/index.php?g=Wap&m=Index&a=index&token=rnfzfk1423274632" style="padding:20px 140px;border:1px solid #ddd;"></iframe> -->

#####美的透明展示屏
<div style="width:502px;position:relative;left:50%;margin:0 -251px;padding:10px;background:#EFEFEF;border: 1px solid #ccc;border-radius: 4px;">
	<embed id="" height="482" allowscriptaccess="never" style="visibility:visible;" pluginspage="http://get.adobe.com/cn/flashplayer/" flashvars="playMovie=true&amp;auto=1&amp;autostart=true" width="482" allowfullscreen="true" quality="high" src="http://www.miaopai.com/show/eINtArQJmpUwonu3vMROag__.swf" type="application/x-shockwave-flash" wmode="transparent">
</div>

这是我们参观美的时所拍下的一段视频，其中显示屏幕是透明的，透过画面可以直接看到其后的实物模型，整个屏幕就像不存在一样。这种展示方式当下看来还是比较新颖的，但在不久的将来，肯定会成为一大趋势。那时，科技会让生活更美好。

_2015.9_
_作于佛山顺德_

<!-- d3读取csv测试 -->
<!-- <div id="csv"></div>

<script type="text/javascript" src="files/js/d3.min.js"></script>

<script type="text/javascript">
	d3.csv("store/tmall_js/data2.csv",function(error,csvdata){  
  
    if(error){  
        console.log(error);  
    }  
    console.log(csvdata);  
    d3.select("p#csv").append(csvdata[0])
});  
</script> -->
<!-- 测试结束 -->



<div id="quickLink">
  <ul>
  </ul>
</div>
<div id="backTop" data-toggle="tooltip" title="飞" ></div>
<script src="files/js/scrollTab.js"></script>

<script type="text/javascript">
  $(function() {
    $('body>#main #content a').not(".flow-img").tooltip({placement:"top",title:"不知道是什么，点我试一下吧"})
    $('body>#main #content div#backTop').tooltip({placement:"right"})
  })
</script>