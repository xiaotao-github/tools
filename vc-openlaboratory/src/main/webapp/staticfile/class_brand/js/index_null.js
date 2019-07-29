var count;
function setClock(){
	clearInterval(count);
	var clock = document.getElementById("clo");
	var ph = $('#clo').parent('.col').height();
	var ch = $('#clo').height();
	var zoom = 1+(ph-ch)/ch;
	//$('#clo').css('zoom',zoom);
    var h = 0, m = 0 , s =0, ms = 0;
    count = setInterval(function() {
        var date = new Date();
        ms = date.getMilliseconds();
        s = date.getSeconds()+ms/1000;
        m = date.getMinutes()+s/60;
        h = date.getHours() % 12+m/60;
        
        clock.children[0].style.WebkitTransform = "rotate("+h*30+"deg)";
        clock.children[1].style.WebkitTransform = "rotate("+m*6+"deg)";
        clock.children[2].style.WebkitTransform = "rotate("+s*6+"deg)";
    },1000);
}

var count1;
function set_elClock(){
	clearInterval(count1);
	var clock = $('.el_clock');
	var Week = ['日','一','二','三','四','五','六'];  
	count1 = setInterval(function() {
		var d = new Date();
		var date = d.getFullYear()+' 年 '+((d.getMonth()+1)*1 < 10 ? '0'+(d.getMonth()+1)*1 : (d.getMonth()+1)*1)+' 月 '+(d.getDate() < 10 ? '0'+d.getDate() : d.getDate())+' 日 ',
			day = '星期'+Week[d.getDay()],
			time = (d.getHours() < 10 ? '0'+d.getHours() : d.getHours())+' : '+(d.getMinutes() < 10 ? '0' +d.getMinutes() : d.getMinutes())+' : '+(d.getSeconds() < 10 ? '0'+d.getSeconds() : d.getSeconds());
		clock.children('.date').html(date);
		clock.children('.day').html(day);
		clock.children('.time').html(time);
	},1000)
}

setClock();
set_elClock();

$(window).resize(function(){
	setClock();
	setLogoSize();
})


var order = -1 ;
function getMessage(){
	if(messageData.messages.length>0){
		if(order<messageData.messages.length-1){
			order = (order+1)*1;
		}else{
			order = 0;
		}
		setMessageLoop(messageData.messages[order])
	}else{
		setMessageLoop('<span style="color:#ccc;">暂无通知公告!</span>');
	}
}

function setLogoSize(){
	var b_h = $('.logo').parent('.cell3').height();
	var b_w = $('.logo').parent('.cell3').width();
	if(b_h>=b_w){
		$('.logo').css({'height': b_w-100,'width': 'auto'})
	}else{
		$('.logo').css({'height': 'auto','width': b_h-100})
	}
}
setLogoSize();

function setMessageLoop(data){
	$('#message').html(data.content+'&emsp;&emsp;&emsp;&emsp;<span style="color:#4cacea;">——'+data.updateTimeToString+'  '+data.teacherName+'</span>').css('margin-left',0);
	var m_h = $('#message').width()+40;
	if(m_h>$('.cell.cell1 .p2').width()){
		/*$('#message').css({'margin-left': $('.cell.cell1 .p2').width()-m_h,'transition': (m_h - $('.cell.cell1 .p2').width())*0.05+'s','transition-timing-function': 'linear','transition-delay': '2s'})*/
		$('#message').animate({marginLeft: $('.cell.cell1 .p2').width()-m_h},(m_h - $('.cell.cell1 .p2').width())*50,'linear',function(){
			setTimeout('getMessage()',2000);
		})
	}else{
		$('#message').animate({marginLeft: 0 },m_h*10,'linear',function(){
			setTimeout('getMessage()',2000);
		})
	}
}

function initSchedule(classMsg){
	$('.schedule-row').children('.schedule-col').html('').css('background-color','none');
	for(var i in classMsg){
		var dateArray = classMsg[i].schooltimeString.split("-");
		var date = new Date(dateArray[0], parseInt(dateArray[1] - 1), dateArray[2]);
		var row_num = date.getDay()-1;
		if(row_num<0){
			row_num = 6;
		}
		var col_Str = ['A','B','C','D','E','F'];
		var col_num;
		for(j in col_Str){
			if(col_Str[j] == classMsg[i].slice){
				col_num = j;
			}
		}
		var colColor;
		switch (classMsg[i].type){
			case 1 :
				colColor = '#f5f5f5';
				break;
			case 2 :
				colColor = '#fffce0';
				break;
			case 3 :
				colColor = '#e5fff3';
				break;
			default :
				break;

		}
		var content = '<p style="font-weight:bold;font-size:14px;">'+classMsg[i].courseName+'</p><p>'+classMsg[i].experimentName+'</p><p>'+classMsg[i].teacherName+'</p>';
		$('.schedule-row').eq(row_num).children('.schedule-col').eq(col_num).html(content).css('background-color',colColor);
	}
}

$(function(){
	//initSchedule();
	getMessage();
})