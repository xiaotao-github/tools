var circleR = 30,
	scaleValue = [
		{scale:0.002,angle:150},
		{scale:0.005,angle:125},
		{scale:0.01,angle:100},
		{scale:0.02,angle:75},
		{scale:0.05,angle:50},
		{scale:0.1,angle:25},
		{scale:0.2,angle:0},
		{scale:0.5,angle:-25},
		{scale:1,angle:-50},
		{scale:2,angle:-75},
		{scale:5,angle:260},
		{scale:10,angle:235},
		{scale:20,angle:210},
	];
ch.ch1.ctrData = {
	oldY : 0,
	oldX : 0,
	Y : 0,
	X : 0,
	a : 125,
	v : 0.005,
	oldAngle : null,
	transferAngle : null
}
ch.ch2.ctrData = {
	oldY : 0,
	oldX : 0,
	Y : 0,
	X : 0,
	a : 125,
	v : 0.005,
	oldAngle : null,
	transferAngle : null
}
ch.ch3.ctrData = {
	oldY : 0,
	oldX : 0,
	Y : 0,
	X : 0,
	a : 125,
	v : 0.005,
	oldAngle : null,
	transferAngle : null
}
ch.ch4.ctrData = {
	oldY : 0,
	oldX : 0,
	Y : 0,
	X : 0,
	a : 125,
	v : 0.005,
	oldAngle : null,
	transferAngle : null
}

/*
function countDeg(){
	var res = (Math.cos(((2*circleR*circleR)-(X*X+Y*Y))/(2*circleR*circleR)))/(Math.PI / 180);
	console.log(res);
	return res;
}*/

function setFirstTimeAngel(data){
	if(data[0]){
		if(data[0].CHAVAL != 50){
			for(var i = 0;i<scaleValue.length;i++){
				if(scaleValue[i].scale == data[0].CHAVAL){
					$('.rotateP').eq(0).find('.rotateBtn').css('transform','rotate('+scaleValue[i].angle+'deg)');
				}
			}
		}else{
			$('.rotateP').eq(0).find('.rotateBtn').css('transform','rotate('+scaleValue[scaleValue.length-1].angle+'deg)');
		}
		$('.rotateP').eq(0).find('select').val(data[0].CHAVAL);
		$('.positionP').eq(0).find('input').val(data[0].CHAPOS);
	}
	if(data[1]){
		if(data[1].CHBVAL != 50){
			for(var i = 0;i<scaleValue.length;i++){
				if(scaleValue[i].scale == data[1].CHBVAL){
					$('.rotateP').eq(1).find('.rotateBtn').css('transform','rotate('+scaleValue[i].angle+'deg)');
				}
			}
		}else{
			$('.rotateP').eq(1).find('.rotateBtn').css('transform','rotate('+scaleValue[scaleValue.length-1].angle+'deg)');
		}
		$('.rotateP').eq(1).find('select').val(data[1].CHBVAL);
		$('.positionP').eq(1).find('input').val(data[1].CHBPOS);
	}
	if(data[2]){
		if(data[2].CHCVAL != 50){
			for(var i = 0;i<scaleValue.length;i++){
				if(scaleValue[i].scale == data[2].CHCVAL){
					$('.rotateP').eq(2).find('.rotateBtn').css('transform','rotate('+scaleValue[i].angle+'deg)');
				}
			}
		}else{
			$('.rotateP').eq(2).find('.rotateBtn').css('transform','rotate('+scaleValue[scaleValue.length-1].angle+'deg)');
		}
		$('.rotateP').eq(2).find('select').val(data[2].CHCVAL);
		$('.positionP').eq(2).find('input').val(data[2].CHCPOS);
	}
	if(data[3]){
		if(data[3].CHDVAL != 50){
			for(var i = 0;i<scaleValue.length;i++){
				if(scaleValue[i].scale == data[3].CHDVAL){
					$('.rotateP').eq(3).find('.rotateBtn').css('transform','rotate('+scaleValue[i].angle+'deg)');
				}
			}
		}else{
			$('.rotateP').eq(3).find('.rotateBtn').css('transform','rotate('+scaleValue[scaleValue.length-1].angle+'deg)');
		}
		$('.rotateP').eq(3).find('select').val(data[3].CHDVAL);
		$('.positionP').eq(3).find('input').val(data[3].CHDPOS);
	}
}


function waveformCtr(event,obj){
	var eleData;
	obj = $(obj);
	switch(obj.attr('thisChannel')/1){
		case 1:
			eleData = ch.ch1.ctrData;
			break;
		case 2:
			eleData = ch.ch2.ctrData;
			break;
		case 3:
			eleData = ch.ch3.ctrData;
			break;
		case 4:
			eleData = ch.ch4.ctrData;
			break;
		default:
			console.log('attr thisChannel is undefind!');
			break;
	}
	eleData.oldX = event.clientX-obj.offset().left;
	eleData.oldY = event.clientY-(obj.offset().top-$(document).scrollTop());
	//计算当前点击的点与圆心的X轴的夹角(弧度) --> 上半圆为负, 下半圆未正
	eleData.oldAngle = Math.atan2(eleData.oldY - circleR, eleData.oldX - circleR);
	//移动事件
	$("html").mousemove(function(event){
		eleData.X = event.clientX-obj.offset().left;
		eleData.Y = event.clientY-(obj.offset().top-$(document).scrollTop());

		//计算当前点击的点与圆心的X轴的夹角(弧度) --> 上半圆为负, 下半圆未正
		var angle = Math.atan2(eleData.Y - circleR, eleData.X - circleR);
		eleData.transferAngle = angle - eleData.oldAngle;
		var b = eleData.a;
		eleData.a += (eleData.transferAngle * 180 / Math.PI);
		
		if(eleData.a<=150 && eleData.a>137.5){
			eleData.a = 150;
			eleData.v = 0.002;
		}else if(eleData.a<=137.5 && eleData.a>112.5){
			eleData.a = 125;
			eleData.v = 0.005;
		}else if(eleData.a<=112.5 && eleData.a>87.5){
			eleData.a = 100;
			eleData.v = 0.01;
		}else if(eleData.a<=87.5 && eleData.a>62.5){
			eleData.a = 75;
			eleData.v = 0.02;
		}else if(eleData.a<=62.5 && eleData.a>37.5){
			eleData.a = 50;
			eleData.v = 0.05;
		}else if(eleData.a<=37.5 && eleData.a>12.5){
			eleData.a = 25;
			eleData.v = 0.1;
		}else if(eleData.a<=12.5 && eleData.a>-12.5){
			eleData.a = 0;
			eleData.v = 0.2;
		}else if(eleData.a<=-12.5 && eleData.a>-37.5){
			eleData.a = -25;
			eleData.v = 0.5;
		}else if(eleData.a<=-37.5 && eleData.a>-62.5){
			eleData.a = -50;
			eleData.v = 1;
		}else if(eleData.a<=-62.5 && eleData.a>-87.5){
			eleData.a = -75;
			eleData.v = 2;
		}else if((eleData.a<=-87.5 && eleData.a>=-90) || (eleData.a<=270&&eleData.a>247.5)){
			eleData.a = 260;
			eleData.v = 5;
		}else if(eleData.a<=247.5 && eleData.a>222.5){
			eleData.a = 235;
			eleData.v = 10;
		}else if(eleData.a<=222.5 && eleData.a>=210){
			eleData.a = 210;
			eleData.v = 20;
		}else{
			eleData.a = ((225 - eleData.a)>45)?135:225;
			eleData.a = b;
		}
		
		if (eleData.a!=b){
			obj.css("transform","rotate("+eleData.a+"deg)");
			obj.parent().siblings('p').children('select').val(eleData.v);
			sizeNumChange(obj.attr('thisChannel')/1,obj.parent().siblings('p').children('select'));
			eleData.oldX = eleData.X;
			eleData.oldY = eleData.Y;
			eleData.oldAngle = angle;
		}
	});
	//释放事件
	$("html").mouseup(function(event){
		$("html").unbind("mousemove");
	});
}

function waveformBeChanged(chNum,obj){
	var thetaAngel,r;
	if($(obj).val()/1 != 50){
		for(var i = 0;i<scaleValue.length;i++){
			if(scaleValue[i].scale == $(obj).val()){
				thetaAngel = scaleValue[i].angle;
			}
		}
	}else{
		thetaAngel = scaleValue[scaleValue.length-1].angle;
	}

	switch(chNum){
		case 1:
			ch.ch1.ctrData.a = thetaAngel;
			ch.ch1.ctrData.v = $(obj).val()/1;
			r = Math.sqrt(((ch.ch1.ctrData.oldX-circleR)*(ch.ch1.ctrData.oldX-circleR))+((ch.ch1.ctrData.oldY-circleR)*(ch.ch1.ctrData.oldY-circleR)));
			ch.ch1.ctrData.oldX = r*Math.cos(thetaAngel);
			ch.ch1.ctrData.oldY = r*Math.sin(thetaAngel);
			break;
		case 2:
			ch.ch2.ctrData.a = thetaAngel;
			ch.ch2.ctrData.v = $(obj).val();
			r = Math.sqrt(((ch.ch2.ctrData.oldX-circleR)*(ch.ch2.ctrData.oldX-circleR))+((ch.ch2.ctrData.oldY-circleR)*(ch.ch2.ctrData.oldY-circleR)));
			ch.ch2.ctrData.oldX = r*Math.cos(thetaAngel);
			ch.ch2.ctrData.oldY = r*Math.sin(thetaAngel);
			break;
		case 3:
			ch.ch3.ctrData.a = thetaAngel;
			ch.ch3.ctrData.v = $(obj).val();
			r = Math.sqrt(((ch.ch3.ctrData.oldX-circleR)*(ch.ch3.ctrData.oldX-circleR))+((ch.ch3.ctrData.oldY-circleR)*(ch.ch3.ctrData.oldY-circleR)));
			ch.ch3.ctrData.oldX = r*Math.cos(thetaAngel);
			ch.ch3.ctrData.oldY = r*Math.sin(thetaAngel);
			break;
		case 4:
			ch.ch4.ctrData.a = thetaAngel;
			ch.ch3.ctrData.v = $(obj).val();
			r = Math.sqrt(((ch.ch4.ctrData.oldX-circleR)*(ch.ch4.ctrData.oldX-circleR))+((ch.ch4.ctrData.oldY-circleR)*(ch.ch4.ctrData.oldY-circleR)));
			ch.ch4.ctrData.oldX = r*Math.cos(thetaAngel);
			ch.ch4.ctrData.oldY = r*Math.sin(thetaAngel);
			break;
		default:
			break;
	}
	$(obj).parent('p').siblings('div').children('.rotateBtn').css("transform","rotate("+thetaAngel+"deg)");
	//console.log(ch.ch1.ctrData)
}

$(function(){
	$('.rotateBtn').each(function(index){
		$('.rotateBtn').eq(index).mousedown(function(event){
			waveformCtr(event,this);
		})
	})
})