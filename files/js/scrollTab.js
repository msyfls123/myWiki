$("#quickLink").prepend("<p>"+$("h1:eq(1)").text()+"</p>")    //获取文章标题将其加到quickLink中去
			
			$("h3,h4,h5").each(function(){        //获取每个标题将其加到quickLink中去
				if ($(this).is("h3")) {
					$("#quickLink ul").append("<li class='s'>"+$(this).text()+"</li>");
				}else if($(this).is("h4")) {
					$("#quickLink ul").append("<li class='ss'>"+$(this).text()+"</li>");
				}else{
					$("#quickLink ul").append("<li>"+$(this).text()+"</li>");
				}
			});
			$("#quickLink li").each(function(i){      //点击quickLink跳转页面位置
				$(this).click(function(){
					$('html, body').animate({scrollTop: $("h3,h4,h5").eq(i).offset().top-60}, 1000); return false;
				})
			})
			var quickH = 600;
			
			function scrollEvent4(){            //固定右侧quickLink
				var scroH = $(this).scrollTop();
				if(scroH>=quickH){
					$("#backTop").fadeIn(1000);
					$("#quickLink").addClass("on");
				}else if(scroH<quickH){
					$("#backTop").fadeOut(500);
					$("#quickLink").removeClass("on");
				}
			};

			function scrollEvent5(){            //滑动到对应位置在quickLink显示
				var scroH = $(this).scrollTop();
				for (var i = 0; i <= $("#quickLink li").length - 1; i++) {
					if (i==$("#quickLink li").length - 1) {
						if (scroH>$("h3,h4,h5").eq(i).offset().top-61) {$("#quickLink li:eq("+i+")").addClass("get");}
						else{$("#quickLink li:eq("+i+")").removeClass("get");}
					}else{
						if((scroH>$("h3,h4,h5").eq(i).offset().top-61)&&(scroH<$("h3,h4,h5").eq(i+1).offset().top-61)){
							$("#quickLink li:eq("+i+")").addClass("get");
						}else{
							$("#quickLink li:eq("+i+")").removeClass("get");
						}
					}	
				};
			};

			function scrollEvent6(){            //固定右侧quickLink
				var scroH = $(this).scrollTop();
				if(scroH>301){
					$("#header").addClass("scroll");
					$("#foobar").addClass("at");
					$('#header h1').tooltip({placement:"left"})
				}else {
					$("#header").removeClass("scroll");
					$("#foobar").removeClass("at");
					$('#header h1').tooltip({placement:"bottom"})
				}
			};

			$(window).scroll(function(){scrollEvent4();scrollEvent5();scrollEvent6()});   //注册固定导航栏事件

			$("#backTop").click(function(){ 
			$('body,html').animate({scrollTop:"0px"}, 1000); return false;
		});