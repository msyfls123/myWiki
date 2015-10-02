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
					$('html, body').animate({scrollTop: $("h3,h4,h5").eq(i).offset().top-10}, 1000); return false;
				})
			})

			var quickH = $("#quickLink").offset().top;

			function scrollEvent4(){            //固定右侧quickLink
				var scroH = $(this).scrollTop();
				if(scroH>=quickH){
					$("#backTop").fadeIn(1000);
					$("#quickLink").css({"position":"fixed","top":"75px","left":"50%","margin-left":"-590px","visibility":"visible"});
				}else if(scroH<quickH){
					$("#backTop").fadeOut(500);
					$("#quickLink").css({"position":"absolute","top":"635px","left":"-200px","margin-left":"0px","visibility":"hidden"});
				}
			};

			function scrollEvent5(){            //滑动到对应位置在quickLink显示
				var scroH = $(this).scrollTop();
				for (var i = 0; i <= $("#quickLink li").length - 1; i++) {
					if((scroH>$("h3,h4,h5").eq(i).offset().top-30)&&(scroH<$("h3,h4,h5").eq(i+1).offset().top-30)){
						$("#quickLink li:eq("+i+")").addClass("get");
					}else{
						$("#quickLink li:eq("+i+")").removeClass("get");
					}
				};
			};
			$(window).scroll(function(){scrollEvent4();scrollEvent5()});   //注册固定导航栏事件

			$("#backTop").click(function(){ 
			$('body,html').animate({scrollTop:"0px"}, 1000); return false;
		});