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
					renderTo: "int",
		            type: 'scatter',
		            zoomType: 'xy',
		            backgroundColor:'#012',
		            spacing:[10,10,0,0]
		        },
		        data: {
		        	name: '干衣机',
		            csv: csv,
		            startColumn:1,
		        },
		        plotOptions:{
		        	scatter:{
		        		cropThreshold:300,
		        		marker:{
		        			radius:2,
		        			fillColor: '#f00',		        			
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
			            		color: "#abc"
			            	}
       					}
		        	}
		        },
		        legend:{
		        	enabled:true,
		        	labelFormatter:function(){
		        		return  ' 单款干衣机（销售总额）';
		        	},
		        	floating: true,
		            align: 'right',
		            verticalAlign: 'top',
		            x: 0,
		            y: 45,
		            itemStyle:{
		            	'fontSize':"9px",
		            	color:'#aaa'
		            }
		        },
		        title: {
		            text: 'Dryer Sales on Tmall',
		            style:{
		            	fontSize:'9px',
		            	color:'#efefef'
		            }
		        },
				yAxis: {
					title: {
						text: 'Sales',
						margin: 10
					},
					ceiling: 4000,
					gridLineColor:"#345"
				},
				xAxis: {
					title: {
						text: 'Price',
						margin: 0
					},
					gridLineWidth:1,
					gridLineColor:"#345"
				},
				tooltip: {
					// headerFormat: shopName[Number(this.point.index)],
					formatter:function(){
						return '<b>'+shopName[this.point.index]+'</b><br><span>价格： </span><span style="color:#17a">'+this.point.x+'</span><br><span>销量： </span><span style="color:#17a">'+this.point.y+'</span><br><span>总价： </span><span style="color:#c03;font-weight:bold">'+this.point.y*this.point.x/10000+'万'+'</span>'
					},
					crosshairs: [{            // 设置准星线样式
					    width: 1.5,
					    color: '#0ff',
					}, {
					    width: 1.5,
					    color: "#0ff",
					}],
				},
				credits:{
					enabled:false
				}
			});
		})
	});