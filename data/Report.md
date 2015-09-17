![广州白云万达广场雕塑](imgs/title.jpg)

实习报告
===

>咏到老树婆娑叶茂枝繁根牢固，春来桃李璀璨红嫣姹紫绿晶莹
>
><span style="font-size:12px;float:right;margin-top: -5px;">———— 叶问堂</span>



###使用Javascript抓取[天猫商城](http://www.tmall.com)的商品数据

#####__主要特点:__

1. 将天猫上搜索得到的商品数据快速汇总，无需重复复制粘贴
2. 绕开了阿里巴巴的反爬虫程序……在页面加载完成后对页面数据进行提取，一次可提取40条信息，比直接抓取略费时一点
3. 所得数据可以直接保存为csv文件在Excel中打开

#####__代码文件：__[所得数据文件](store/tmall_js/data.csv) / [Javascript代码文件](store/tmall_js/test.js)

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

<ul id="flow-box">
    <li><a title="尚致设计示意图——采用线稿描绘，填充颜色的方法进行创作" href="imgs/repo/1.jpg"><img alt="尚致设计示意图" src="imgs/repo/1.jpg"/></a>
        <h6>Img 1</h6>
    </li>
    <li><a href="imgs/repo/2.jpg"><img src="imgs/repo/2.jpg"></a>
        <h6>Img 2</h6>
    </li>
    <li><a href="imgs/repo/3.jpg"><img src="imgs/repo/3.jpg"></a>
        <h6>Img 3</h6>
    </li>
    <li><a href="imgs/repo/4.jpg"><img src="imgs/repo/4.jpg"></a>
        <h6>Img 4</h6>
    </li>
    <li><a href="imgs/repo/5.jpg"><img src="imgs/repo/5.jpg"></a>
        <h6>Img 5</h6>
    </li>
    <li><a href="imgs/repo/6.jpg"><img src="imgs/repo/6.jpg"></a>
        <h6>Img 6</h6>
    </li>
    <li><a href="imgs/repo/7.jpg"><img src="imgs/repo/7.jpg"></a>
        <h6>Img 7</h6>
    </li>
    <li><a href="imgs/repo/8.jpg"><img src="imgs/repo/8.jpg"></a>
        <h6>Img 8</h6>
    </li>
    <li><a href="imgs/repo/9.jpg"><img src="imgs/repo/9.jpg"></a>
        <h6>Img 9</h6>
    </li>
    <li><a href="imgs/repo/10.jpg"><img src="imgs/repo/10.jpg"></a>
        <h6>Img 0</h6>
    </li>
    <li><a href="imgs/repo/11.jpg"><img src="imgs/repo/11.jpg"></a>
        <h6>Img 5</h6>
    </li>
    <li><a href="imgs/repo/12.jpg"><img src="imgs/repo/12.jpg"></a>
        <h6>Img 6</h6>
    </li>
    <li><a href="imgs/repo/13.jpg"><img src="imgs/repo/13.jpg"></a>
        <h6>Img 4</h6>
    </li>
    <li><a href="imgs/repo/14.jpg"><img src="imgs/repo/14.jpg"></a>
        <h6>Img 5</h6>
    </li>
    <li><a href="imgs/repo/15.jpg"><img src="imgs/repo/15.jpg"></a>
        <h6>Img 6</h6>
    </li>
    <li><a href="imgs/repo/16.jpg"><img src="imgs/repo/16.jpg"></a>
        <h6>Img 7</h6>
    </li>
</ul>
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

###网站首页banner展示

<iframe src="store/banner/demo.html" style="transform:scale(0.5,0.5);width:1308px;height:625px;display;block;margin:-157px -340px;border: 1px solid #aaa;border-radius: 10px;" scrolling="no"></iframe>

###鼠标悬浮切换背景

<iframe src="store/quarter/quarter.html" width=628 height=300 frameBorder="0" style="padding:20px 0px;background:#EFEFEF;border: 1px solid #ccc;border-radius: 4px;"></iframe>



###尚致设计-易企秀

<iframe width="628px" frameborder = "0" height="680px" src="http://eqxiu.com/s/xhJv1aEi" style="padding:20px 153px;background-color: #0EB7DC;
    background-image: linear-gradient(135deg, #34DCAD, #0EB7DC);"></iframe>

###尚致设计-微官网
<iframe width="628px" frameborder = "0" height="568px" src="http://wx.budray.com/index.php?g=Wap&m=Index&a=index&token=rnfzfk1423274632" style="padding:20px 140px;background-color: #0EB7DC;background-image: linear-gradient(135deg, #34DCAD, #0EB7DC);"></iframe>

###美的透明展示屏
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