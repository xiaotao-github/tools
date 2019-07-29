var proteusDrawData = null;
var theseMachine = new Array();

var data1 = new Array(),
	data2 = new Array(),
	data3 = new Array(),
	data4 = new Array();

var ch = {
	ch1:{
		position: 0,
		sizeTimes: 0.005,
		upTimes: 0
	},
	ch2:{
		position: 0,
		sizeTimes: 0.005,
		upTimes: 0
	},
	ch3:{
		position: 0,
		sizeTimes: 0.005,
		upTimes: 0
	},
	ch4:{
		position: 0,
		sizeTimes: 0.005,
		upTimes: 0
	},
}


/*----------------------------------------数据处理 START---------------------------------------------------*/
var dealWithData = {
	p_draw: function(loopData){
		console.log('进入Proteus波形的处理!');
		console.log(loopData);
		data1 = [];
		data2 = [];
		data3 = [];
		data4 = [];
		for(var i in loopData){
			data1.push(new Array(loopData[i].Time,((loopData[i].Va/ch.ch1.sizeTimes)*20+(ch.ch1.upTimes/1))));
			data2.push(new Array(loopData[i].Time,((loopData[i].Vb/ch.ch2.sizeTimes)*20+(ch.ch2.upTimes/1))));
			data3.push(new Array(loopData[i].Time,((loopData[i].Vc/ch.ch3.sizeTimes)*20+(ch.ch3.upTimes/1))));
			data4.push(new Array(loopData[i].Time,((loopData[i].Vd/ch.ch4.sizeTimes)*20+(ch.ch4.upTimes/1))));
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
	p_vsm: function(loopData){
		console.log('进入Proteus测量数据的处理');
		console.log(loopData);
		
		$('.eachMachineType').html('');
		theseMachine = [];
		var elementParent,unit,machineName;
		
		for(var v in loopData){
			switch(loopData[v].name){
				case 'IAC AMMETER':
					elementParent = $('.eachMachineType').eq(0);
					unit = 'A';
					machineName = 'IAC_A';
					break;
				case 'IAC VOLTMETER':
					elementParent = $('.eachMachineType').eq(1);
					unit = 'V';
					machineName = 'IAC_V';
					break;
				case 'IDC AMMETER':
					elementParent = $('.eachMachineType').eq(2);
					unit = 'A';
					machineName = 'IDC_A';
					break;
				case 'IDC VOLTMETER':
					elementParent = $('.eachMachineType').eq(3);
					unit = 'V';
					machineName = 'IDC_V';
					break;
				case 'IWATTMETER':
					elementParent = $('.eachMachineType').eq(4);
					unit = 'W';
					machineName = 'IWATTMETER';
					break;
				default:
					elementParent = $('.eachMachineType').eq(5);
					unit = ' ';
					machineName = '未知仪器设备';
					console.log('unknow machine!');
					break;
			}
			
			var tm,
				isHad = null;
			
			for(var m in theseMachine){
				if((machineName+'_'+loopData[v].mark) == theseMachine[m]){
					tm = theseMachine[m];
					isHad = 1;
					//break;
				}
			}
			console.log('是否已存在仪器:'+isHad)
			if(isHad == 1){
				$('#'+tm).siblings('p').children('.settingData').html(loopData[v].value);
			}else{
				theseMachine.push(machineName+'_'+loopData[v].mark);
				var machineEle = createMachine(loopData[v].value,loopData[v].mark,unit,machineName);
				console.log(elementParent)
				elementParent.append(machineEle);
			}
		}
		putMsgToReportBinding();
		
	},
	p_position: function(thisData){
		ch.ch1.sizeTimes = thisData[0].CHAVAL;
		ch.ch1.upTimes = thisData[0].CHAPOS;
		ch.ch2.sizeTimes = thisData[1].CHBVAL;
		ch.ch2.upTimes = thisData[1].CHBPOS;
		ch.ch3.sizeTimes = thisData[2].CHCVAL;
		ch.ch3.upTimes = thisData[2].CHCPOS;
		ch.ch4.sizeTimes = thisData[3].CHDVAL;
		ch.ch4.upTimes = thisData[3].CHDPOS;
		setFirstTimeAngel(thisData);
	},
	p_other: function(otherData){
		console.log('There is deaWithData.p_other function! Maybe your datatype is undefined。');
	}
}

function scanDataType(data){
	var type = data.datatype;
	switch (type) {
		case 'proteus_position':
			console.log('数据类型为: '+type);
			dealWithData.p_position(data.data);
			break;
		case 'proteus_draw':
			console.log('数据类型为: '+type);
			dealWithData.p_draw(data.data);
			proteusDrawData = data.data;
			break;
		case 'proteus_data':
			console.log('数据类型为: '+type);
			dealWithData.p_data(data.data);
			break;
		case 'vsm':
			console.log('数据类型为: '+type);
			dealWithData.p_vsm(data.data);
			break;
		default:
			console.log('数据类型为: other');
			dealWithData.p_other(data);
			break;
	}
}
/*----------------------------------------数据处理 END---------------------------------------------------*/


/*---------------------------------------proteus_draw图表 START------------------------------------------*/

var chartWL = Highcharts.chart('demo3', {
	chart: {
		"type": 'spline',
		"zoomType": "xy",
		animation: false,
		width: 500,
		height: 500,
		plotBackgroundImage: ctx+'/staticfile/student/images/grid.png'
	},
	legend: {
		align: 'right',
		verticalAlign: 'top',
		x: -10,
		y: 10,
		floating: true
	},
	title: null,
	subtitle: false,
	xAxis: {
		title: false,
	},
	yAxis: {
		title: false,
		tickPositioner: function(){
			var positions = [];
			for(var i = -200;i<=200;i = i+20){
				positions.push(i);
			}
			return positions;
		}
	},
	tooltip: {
		formatter: function () {
			var resVal,ut,st;
			switch(this.point.series.index){
				case 0:
					ut = ch.ch1.upTimes;
					st = ch.ch1.sizeTimes;
					break;
				case 1:
					ut = ch.ch2.upTimes;
					st = ch.ch2.sizeTimes;
					break;
				case 2:
					ut = ch.ch3.upTimes;
					st = ch.ch3.sizeTimes;
					break;
				case 3:
					ut = ch.ch4.upTimes;
					st = ch.ch4.sizeTimes;
					break;
				default:
					console.log('Index is undefind');
					break;
			}
			resVal = ((this.y - ut)/20)*st;
			if(resVal>1 || resVal <-1){
				resVal = '<b>'+resVal+'</b> V';
			}else{
				resVal = '<b>'+(resVal*1000)+'</b> mV';
			}
			return '<b>'+this.x+'</b>'+' s'+'<br/>'+resVal;
		}
	},
	exporting: { enabled: false },//隐藏导出图片
	credits: {
		text: '风标教育',
		href: 'http://www.fengbiaoedu.com'
	},
	series: [{
		name: 'CH1',
		data: data1
	}, {
		name: 'CH2',
		data: data2
	}, {
		name: 'CH3',
		data: data3
	}, {
		name: 'CH4',
		data: data4
	}]
});

function chartRedraw(){
	chartWL.series[0].setData(data1);
	chartWL.series[1].setData(data2);
	chartWL.series[2].setData(data3);
	chartWL.series[3].setData(data4);
}

function sizeNumChange(chNum,obj){
	switch(chNum){
		case 1:
			ch.ch1.sizeTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		case 2:
			ch.ch2.sizeTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		case 3:
			ch.ch3.sizeTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		case 4:
			ch.ch4.sizeTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		default:
			break;
	}
	waveformBeChanged(chNum,obj);
}

function upNumChange(chNum,obj){
	switch(chNum){
		case 1:
			ch.ch1.upTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		case 2:
			ch.ch2.upTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		case 3:
			ch.ch3.upTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		case 4:
			ch.ch4.upTimes = $(obj).val();
			p_ctrRedraw(proteusDrawData,chNum);
			break;
		default:
			break;
	}
}

/*
*对现有数据进行处理重绘对应波形,达到波形放大缩小以及上下移动的功能。
*/
function p_ctrRedraw(loopData,chNum){
	switch(chNum){
		case 1:
			data1 = [];
			for(var i in loopData){
				data1.push(new Array(loopData[i].Time,((loopData[i].Va/ch.ch1.sizeTimes)*20+(ch.ch1.upTimes/1)/*+ch.ch1.position*/)));
			}
			chartWL.series[chNum-1].setData(data1);
			break;
		case 2:
			data2 = [];
			for(var i in loopData){
				data2.push(new Array(loopData[i].Time,((loopData[i].Vb/ch.ch2.sizeTimes)*20+(ch.ch2.upTimes/1)/*+ch.ch2.position*/)));
			}
			chartWL.series[chNum-1].setData(data2);
			break;
		case 3:
			data3 = [];
			for(var i in loopData){
				data3.push(new Array(loopData[i].Time,((loopData[i].Vc/ch.ch3.sizeTimes)*20+(ch.ch3.upTimes/1)/*+ch.ch3.position*/)));
			}
			chartWL.series[chNum-1].setData(data3);
			break;
		case 4:
			data4 = [];
			for(var i in loopData){
				data4.push(new Array(loopData[i].Time,((loopData[i].Vd/ch.ch4.sizeTimes)*20+(ch.ch4.upTimes/1)/*+ch.ch4.position*/)));
			}
			chartWL.series[chNum-1].setData(data4);
			break;
		default:
			break;
	}
}
/*---------------------------------------proteus_draw图表 END------------------------------------------*/


/*---------------------------------------创建电流/电压表 START------------------------------------------*/

function createMachine(val,mark,unit,machineName){
	var machine = $('<li></li>').addClass('col-3 text-c f-l mt-10');
	var p1 = $('<p></p>').addClass('bg-1 boxBorder pd-10').html('<span class="settingData">'+val+'</span> '+unit);
	var p2 = $('<p></p>').addClass('pt-5').attr('id',machineName+'_'+mark).html(mark);
	machine = machine.append(p1).append(p2);
	return machine;
}

/*---------------------------------------创建电流/电压表 END------------------------------------------*/


/*---------------------------------------往父级报告页写入当前数据 START------------------------------------------*/

function putMsgToReportBinding(){
	$('.settingData').each(function(index){
		$('.settingData').eq(index).off().on('click',function(){
			var thisTextMsg = $(this).text();
			window.parent.selectorPush(thisTextMsg);
			$('.settingData').removeClass('checked');
			$(this).addClass('checked');
		})
	})
}

putMsgToReportBinding();


function createCanvg(){
	var svgStr = chartWL.getSVG()/*.replace(/</g, '\n<').replace(/>/g, '>')*/;
	var canvasId = document.getElementById('canvasId');
	canvg(canvasId, svgStr);
	layer.load(1);
	setTimeout(function(){
		var imgData = canvasId.toDataURL("image/png");
		/*$.ajax({
			type: 'POST',
			url: ctx+'/IndexController/reciverImg',
			dataType: 'JSON',
			data: {
				userId: window.parent.Id,
				experimentId: window.parent.experimentId,
				imgData: imgData
			},
			success: function(result){
				if(result.status = 200){
					layer.msg('生成图片成功!')
				}else{
					layer.msg('生成图片失败!')
				}
			},
			error: function(){
				layer.msg('连接服务器失败!请联系维护人员!');
			}
		})*/
		console.log(imgData);
		window.parent.getImgData('<img src="'+imgData+'">');
		window.parent.imgBindClickEvent();
		layer.closeAll('loading');
		$('.defaultBtn').hide();
		$('.createSvg').show();
	},1000)
}

$('.createSvg').on('click',function(){
	$(this).hide();
	$(this).siblings('.defaultBtn').show();
	createCanvg();
})

/*---------------------------------------往父级报告页写入当前数据 END------------------------------------------*/