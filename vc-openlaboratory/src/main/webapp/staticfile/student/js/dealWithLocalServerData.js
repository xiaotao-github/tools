var dealWithData = {
	p_draw: function(loopData){
		console.log('进入Proteus波形的处理!');
		console.log(loopData);
		data1 = [];
		data2 = [];
		data3 = [];
		data4 = [];
		for(var i in loopData){
			data1.push(new Array(loopData[i].Time,loopData[i].Va/1+10));
			data2.push(new Array(loopData[i].Time,loopData[i].Vb/1+5));
			data3.push(new Array(loopData[i].Time,loopData[i].Vc/1));
			data4.push(new Array(loopData[i].Time,loopData[i].Vd/1-5));
		}
		chartRedraw();
	},
	p_data: function(loopData){
		console.log('进入Proteus数据的处理!')
		console.log(loopData);
		
		for(var p in loopData){
			$('.ch-hz').eq(p).html(loopData[p].Frequency.toFixed(2));
			$('.ch-max').eq(p).html(loopData[p].Max.toFixed(2));
			$('.ch-min').eq(p).html(loopData[p].Min.toFixed(2));
			$('.ch-maxMin').eq(p).html(loopData[p].MM.toFixed(2));
		}
	},
	p_other: function(otherData){
		console.log('There is deaWithData.p_other function! Maybe your datatype is undefined。');
	}
}

function scanDataType(data){
	var type = data.datatype;
	switch (type) {
		case 'proteus_draw':
			console.log('数据类型为: '+type);
			dealWithData.p_draw(data.data);
			break;
		case 'proteus_data':
			console.log('数据类型为: '+type);
			dealWithData.p_data(data.data);
			break;
		default:
			console.log('数据类型为: other');
			dealWithData.p_other(data);
			break;
	}
}

/*---------------------------------------proteus_draw图表------------------------------------------*/

var data1 = new Array(),
	data2 = new Array(),
	data3 = new Array(),
	data4 = new Array();

var chartWL = Highcharts.chart('demo3', {
	chart: {
		"type": 'spline',
		"zoomType": "xy",
		animation: false,
	},
	title: {
		text: '标题'
	},
	subtitle: {
		text: '非规律性时间内的变化'
	},
	xAxis: {
		title: {
			text: 'X轴'
		}
	},
	yAxis: {
		title: {
			text: 'Y轴'
		}
	},
	tooltip: {
		headerFormat: '<b>{series.name}</b><br>',
		pointFormat: 'Time: {point.x}/{series.name}:{point.y:.6f}'
	},
	plotOptions: {
		spline: {
			marker: {
				//enabled: true
			}
		}
	},
	series: [{
		name: 'Va',
		data: data1
	}, {
		name: 'Vb',
		data: data2
	}, {
		name: 'Vc',
		data: data3
	}, {
		name: 'Vd',
		data: data4
	}]
});

function chartRedraw(){
	chartWL.series[0].setData(data1);
	chartWL.series[1].setData(data2);
	chartWL.series[2].setData(data3);
	chartWL.series[3].setData(data4);
}

/*---------------------------------------proteus_draw图表------------------------------------------*/