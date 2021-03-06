function setCharts(chartName,data,title){	
	var chart = Highcharts.chart(chartName, {
		chart: {
				height: 260,
				backgroundColor: 'rgba(255,255,255,0)',
				spacing: [20,0,0,0],
				margin: [10, 10, 10, 10]
		},
		credits: {
				text: 'fengbiaoedu',
				href: 'http://www.fengbiaoedu.com'
		},
		title: {
				text: title,
				align: 'left',
				y: 40
		},
		tooltip: {
				headerFormat: '{series.name}<br>',
				pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
		},
		colors: ['#7cb5ec','#90ed7d'],
		plotOptions: {
			pie: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                color: '#000000',
	                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                connectorPadding: 0,
	                distance: 10,
	                style: {
							color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
					}
	            },
	            showInLegend: true
	        }
		},
		legend:{
            align: "left",
            layout: 'horizontal',
           /* width:80,*/
            verticalAlign: "bottom",
            x: 0,
            y:10,
            itemWidth: 80,
            itemDistance: 0
        },
		series: [{
				type: 'pie',
				name: title,
				data: data
		}]
	});
}

/*var chartData = {
		"chart1": [
			{"name":"整班上课","y":45.8},
			{"name":"小组协作","y":26.8},
			{"name":"自主预约","y":12.8}
		]
	}*/


/*$.ajax({
	type:'',
	url: '',
	dataType: '',
	data: '',
	success: function(sysresult){*/
		//setCharts('chart1',chartData.chart1,'课程类型统计');
/*	},
	error: function(sysresult){
		
	}
})*/

function initTable(){
	$('.table').dataTable({
		"aaSorting": [[ 0, "desc" ]],//默认第几个排序
		"bStateSave": true,//状态保存
		"aoColumnDefs": [
		  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
		  //{"orderable":false,"aTargets":[5]}// 制定列不参与排序
		]
	});
}

setCharts('chart1',chartData.chart1,'课程类型统计');
initTable();


$('.jump_btn_sel').on('click',function(){
	$('.body_shadow').show();
	$('.jump_btn').slideDown(300);
	$('.jump_btn_sel').hide(300);
})

$('.body_shadow').on('click',function(){
	$('.jump_btn').slideUp(300);
	$('.body_shadow').hide();
	$('.jump_btn_sel').show(300);
})