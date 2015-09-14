price=document.getElementsByTagName('strong')
var list=new Array()
for(i=2;i<=price.length-1;i++){list.push(price[i].innerHTML)}
//console.log(list.join(",\n"))

shop=document.getElementsByClassName('shopname J_MouseEneterLeave J_ShopInfo')
var list2=new Array()
for(k=0;k<=shop.length-1;k++){list2[k]=shop[k].childNodes[3].innerHTML}
//console.log(list2.join(",\n"))

nameP=document.getElementsByClassName('row row-2 title')
var list3=new Array()
for(k=0;k<=nameP.length-1;k++){list3[k]=nameP[k].textContent.replace(/\s+/g, "")}
//console.log(list3.join(",\n"))

URL=document.getElementsByClassName('J_U2IStat')
var list4=new Array()
for(i=0;i<=URL.length/2-1;i++){list4[i]=URL[2*i].href}
//console.log(URL)


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