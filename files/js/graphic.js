	$(function () { 
		var shopName=new Array();
		$.get("store/tmall_js/data.csv",function(csv){
			//读取csv的店铺名
			csvArr=csv.replace(/\n/g,",").split(",");
        	for (var i = 3; i <= csvArr.length-2; ) {
        		shopName[i/3-1]=csvArr[i];
        		i=i+3;
        	};

			$('#container').highcharts({
				chart: {
		            type: 'scatter',
		            zoomType: 'xy',
		        },
		        data: {
		        	name: '干衣机',
		            csv: csv,
		            startColumn:1,
		        },
		        plotOptions:{
		        	scatter:{
		        		// color: '#669',
		        		cropThreshold:300,
		        		marker:{
		        			radius:3		        			
		        		},
		        		dataLabels: {
				            enabled: true,
				            formatter: function() {
				            	var sum=this.x * this.y/1000;
				                return (sum>50)?(sum.toFixed(1)+'k'):'<50k';
			            	},
			            	style:{
			            		fontSize:"8px",
			            		fontWeight:"light",
			            		color: "#777"
			            	}
       					}
		        	}
		        },
		        legend:{
		        	labelFormatter:function(){
		        		return  ' 单款干衣机（销售总额）';
		        	},
		        	floating: true,
		            align: 'right',
		            verticalAlign: 'top',
		            x: 0,
		            y: 45,
		        },
		        title: {
		            text: '天猫干衣机销售情况'
		        },
				yAxis: {
					title: {
						text: '销量/件'
					},
					ceiling: 4000,
					gridLineColor:"#ddd"
				},
				xAxis: {
					title: {
						text: '价格/元'
					},
					gridLineWidth:1,
					gridLineColor:"#ddd"
				},
				tooltip: {
					// headerFormat: shopName[Number(this.point.index)],
					formatter:function(){
						return '<b>'+shopName[this.point.index]+'</b><br><span>价格： </span><span style="color:#39c">'+this.point.x+'</span><br><span>销量： </span><span style="color:#39c">'+this.point.y+'</span><br><span>总价： </span><span style="color:#c03;font-weight:bold">'+this.point.y*this.point.x+'</span>'
					},
					crosshairs: [{            // 设置准星线样式
					    width: 1.5,
					    color: '#f03030',
					}, {
					    width: 1.5,
					    color: "#f03030",
					}],
				},
				credits:{
					href: "http://msyfls123.github.io",
					text: "msyfls123.github.io"
				}
			});
		})
	});