![广州白云万达广场雕塑](imgs/title.jpg)

#实习报告

>咏到老树婆娑叶茂枝繁根牢固，春来桃李璀璨红嫣姹紫绿晶莹
>
><span style="font-size:12px;float:right;margin-top: -17px;">———— 叶问堂</span>

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

####Javascript抓取天猫商城内干衣机的商品数据

1. 在淘宝首页搜索关键词`干衣机`，在打开页面内选择`天猫`标签页,进入列表页后按`F12`进入到`Console`内
2. 复制<a href="javascript:$('html,body').animate({scrollTop: $('#codeT').offset().top}, 1000);">代码</a>并粘贴到`Console`内，单击`Enter`
3. 如果顺利的话（不顺利的话就算了吧），可以看到商品信息（包括商品名、店铺名，销量和价格）都会显示在`Console`内，只需要`Ctrl+C``Ctrl+V`到记事本里，并保存为`*.csv`文件，就可以在Excel里进行各种<a href="javascript:$('html,body').animate({scrollTop: $('#csvId').offset().top}, 1000);">数据处理</a>。

__代码文件：__[所得数据文件](store/tmall_js/data.csv) / [Javascript代码文件](store/tmall_js/test.js)

#####主要特点:

1. 将天猫上搜索得到的商品数据快速汇总，无需重复手工复制粘贴
2. 绕开了阿里巴巴的反爬虫程序……在页面加载完成后对页面数据进行提取，一次可提取40条信息，比直接抓取略费时一点
3. 所得数据可以直接保存为csv文件在Excel中打开

####数据分析
有了数据之后我们可以做很多事，比如分析商品价格和销量的关系，商品颜色的差异性，色调风格与价格销量的关系等等。现在也有很多种工具帮助实现数据的可视化，这将是我在接下来的实习工作中重点研究的方向。这里是<a href="javascript:$('html,body').animate({scrollTop: $('#imgAna').offset().top}, 1000);">在PPT内完成的简单分析</a>。

#####干衣机市场概况
1. 价格区间位于100至200间的产品占总量的90%以上
2. 大多数产品选择冷色系浅蓝色
3. 在色系图中大部分产品位于浅色调和亮色调上，少部分位于暗色调和暗灰色调
4. 纯色、条纹和简单图案的销量均很高，体现大众对于简洁图案的喜爱，但不可忽视的是复杂图案和场景有着丰富的种类很多，可以满足不同消费者的需要
5. 简单图案，条纹和纯色销量差异性较大，可以针对特殊群体进行优化以达到高销量，而复杂图案销量不一，说明其受众较为普遍

有了比较详细的市场喜好数据后，设计就变得有目标，有方向了很多，可以针对不同目标群体来优化<a href="javascript:$('html,body').animate({scrollTop: $('#flow-box').offset().top}, 1000);">其后的设计</a>。

<span id="imgAna"></span>
#####色彩趋势分析
![色彩趋势](imgs/survey1.jpg)
#####价格与销量趋势分析
![价格与销量趋势](imgs/survey2.jpg)

<span id="csvId"></span>
####天猫商城干衣机销量前20名：
#####数据已经过Excel整理，各项信息为笔者采集时所录，不保证其时效性
<table id="csvText">
    <th>商品名</th>
    <th>价格</th>
    <th>销量</th>
    <th>店铺名</th>
    <th>网址</th>
</table>

<!-- 调用csv文件生成表格 -->
<script type="text/javascript" src="files/js/d3.min.js"></script>
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

<span id="codeT"></span>
#####__代码如下：__
	
	//读取商品价格
	price=document.getElementsByTagName('strong')
	var list=new Array()
	for(i=2;i<=price.length-1;i++){list.push(price[i].innerHTML)}
	//console.log(list.join(",\n"))

	//读取店铺名称
	shop=document.getElementsByClassName('shopname J_MouseEneterLeave J_ShopInfo')
	var list2=new Array()
	for(k=0;k<=shop.length-1;k++){list2[k]=shop[k].childNodes[3].innerHTML}
	//console.log(list2.join(",\n"))

	//读取商品名称
	nameP=document.getElementsByClassName('row row-2 title')
	var list3=new Array()
	for(k=0;k<=nameP.length-1;k++){list3[k]=nameP[k].textContent.replace(/\s+/g, "")}
	//console.log(list3.join(",\n"))

	//读取商品页面地址
	URL=document.getElementsByClassName('J_U2IStat')
	var list4=new Array()
	for(i=0;i<=URL.length/2-1;i++){list4[i]=URL[2*i].href}
	//console.log(URL)

	//读取购买人数
	buyer=document.getElementsByClassName('deal-cnt')
	var list5=new Array()
	for(i=0;i<=buyer.length-1;i++){list5[i]=buyer[i].textContent.slice(0,-3) }
	//console.log(list5.join(",\n"))

	//输出成数据
	var listTotal=new Array()
	for (var i = 0; i <= list.length-1; i++) {
		listTotal.push("\n"+list3[i])
		listTotal.push(list[i])
		listTotal.push(list5[i])
		listTotal.push(list2[i])
		listTotal.push(list4[i])
	}
	console.log(listTotal.join(","))
	
###设计案例展示
<ul id="flow-box">

</ul>

<!-- 添加图片 -->
<script type="text/javascript">
  for (var i = 1; i <= 28; i++) {
      var imgLi=document.createElement("li");
      var imgA=document.createElement("a");
      var imgNode=document.createElement("img");
      var imgH=document.createElement("h6");
      imgH.innerHTML="Img "+i;
      imgNode.setAttribute("src","imgs/repo/"+i+".jpg")
      imgA.setAttribute("href","imgs/repo/"+i+".jpg")
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
        var n = /*document.documentElement.offsetWidth*/628/li_W|0;//窗口的宽度除以区块宽度就是一行能放几个区块
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
<script type="text/javascript" src="files/js/jquery.imgbox.js"></script>
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


####网站首页banner展示

<iframe src="store/banner/demo.html" style="width:628px;height:310px;display:block;border: 1px solid #aaa;border-radius: 10px;" scrolling="no"></iframe>

####鼠标悬浮切换背景

<iframe src="store/quarter/quarter.html" width=628 height=300 frameBorder="0" style="padding:20px 0px;background:#EFEFEF;border: 1px solid #ccc;border-radius: 4px" scrolling="no"></iframe>



####尚致设计-易企秀

<iframe width="628px" frameborder = "0" height="680px" src="http://eqxiu.com/s/xhJv1aEi" style="padding:20px 153px;background-color: #0EB7DC;
    background-image: linear-gradient(135deg, #34DCAD, #0EB7DC);"></iframe>

####尚致设计-微官网
<iframe width="628px" frameborder = "0" height="568px" src="http://wx.budray.com/index.php?g=Wap&m=Index&a=index&token=rnfzfk1423274632" style="padding:20px 140px;background-color: #0EB7DC;background-image: linear-gradient(135deg, #34DCAD, #0EB7DC);"></iframe>

####美的透明展示屏
<div style="margin:0 62px;padding:10px 10px;background:#EFEFEF;border: 1px solid #ccc;border-radius: 4px;">
	<embed id="" height="482" allowscriptaccess="never" style="visibility:visible;" pluginspage="http://get.adobe.com/cn/flashplayer/" flashvars="playMovie=true&amp;auto=1&amp;autostart=true" width="482" allowfullscreen="true" quality="high" src="http://www.miaopai.com/show/eINtArQJmpUwonu3vMROag__.swf" type="application/x-shockwave-flash" wmode="transparent">
</div>

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