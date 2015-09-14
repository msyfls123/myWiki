实习报告
===

>咏到老树婆娑叶茂枝繁根牢固，春来桃李璀璨红嫣姹紫绿晶莹

###使用Javascript抓取[天猫商城](http://www.tmall.com)的商品数据

__主要特点：__

1. 将天猫上搜索得到的商品数据快速汇总，无需重复复制粘贴
2. 绕开了阿里巴巴的反爬虫程序……在页面加载完成后对页面数据进行提取，一次可提取40条信息，比直接抓取略费时一点
3. 所得数据可以直接保存为csv文件在excel中打开

__代码文件：__[所得数据文件](store/tmall_js/data.csv)
[Javascript代码文件](store/tmall_js/test.js)

**代码如下：**
	
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
	console.log(list5.join(",\n"))


	var listTotal=new Array()
	for (var i = 0; i <= list.length-1; i++) {
		listTotal.push("\n"+list3[i])
		listTotal.push(list[i])
		listTotal.push(list5[i])
		listTotal.push(list2[i])
		listTotal.push(list4[i])
	}
	console.log(listTotal.join(","))
	//输出成数据

<iframe src="store/banner/demo.html" style="transform:scale(0.5,0.5);width:1308px;height:729px;display;block;margin:-190px -340px" frameBorder="0"></iframe>

<center>网站首页banner展示</center>

<iframe src="store/quarter/quarter.html" width=628 height=255 frameBorder="0" style="background:#ececec"></iframe>

<center>悬浮切换背景</center>