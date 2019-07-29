//----------------统计表-----------------------
function setCharts(chartName,data,title){	
	var chart = Highcharts.chart(chartName, {
		chart: {
				height: 250,
				width:400,
				backgroundColor: 'rgba(255,255,255,0)'
		},
		credits: {
				text: 'fengbiaoedu',
				href: 'http://www.fengbiaoedu.com'
		},
		title: {
				text: title
		},
		tooltip: {
				headerFormat: '{series.name}<br>',
				pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
		},
		plotOptions: {
				pie: {
					allowPointSelect: true,  // 可以被选择
					cursor: 'pointer',       // 鼠标样式
					dataLabels: {
							distance: 10,
							enabled: true,
							format: '<b>{point.name}</b>: {point.percentage:.1f} %',
							style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
							}
					}
				}
		},
		series: [{
				type: 'pie',
				name: title,
				data: data
		}]
	});
}
//setCharts('chart1',chartData.chart1,'出勤情况统计图');


//------------------------时钟----------------------------
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

function set_elClock(){
	clearInterval();
	var clock = $('.el_clock');
	var Week = ['日','一','二','三','四','五','六'];  
	setInterval(function() {
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

//----------------公告------------------------
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

//---------------------logo大小-----------------
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
getMessage();

//-------------------------考勤表内容滚动-----------------------------

var scrollList = null;
var scrollTime = 3000;
var srcollTop = 0;
var li_height = 57; //每一个li的高度;
function autoScrolling(){
	clearInterval(scrollList);
	var b_h = $('.attendance-list').height();
	var u_h = $('.attendance-list ul').height();
	li_height = $('.attendance-list ul li').eq(0).height()+11;
	if(b_h < u_h){
		scrollDown(b_h,u_h);	
	}
}

function scrollDown(b_h,u_h){
	scrollList = setInterval(function(){
		if(srcollTop <= (b_h-u_h)){
			clearInterval(scrollList);
			scrollUp(b_h,u_h);
		}else{
			srcollTop = srcollTop - li_height;
			$('.attendance-list ul').animate({marginTop:srcollTop},1000,'linear');
		}
	},scrollTime);
}

function scrollUp(b_h,u_h){
	scrollList = setInterval(function(){
		if(srcollTop >= 0){
			clearInterval(scrollList);
			scrollDown(b_h,u_h);
		}else{
			srcollTop = srcollTop + li_height;
			$('.attendance-list ul').animate({marginTop:srcollTop},1000,'linear');
		}
	},scrollTime);
}

//---------------简介内容超出滚动------------------
var description_clock = null;
var description_content = '';
function descriptionScroll(){
	clearInterval(description_clock);
	$('#nowExperimentDescription').css('margin-top',0);
	var b_h = $('.experiment-description').height()-20;
	var s_h = $('#nowExperimentDescription').height();
	if(s_h>b_h){
		description_clock = setInterval(function(){
			$('#nowExperimentDescription').animate({marginTop:(b_h-s_h)},(s_h-b_h)*250,'linear',function(){
				descriptionScroll();
			})
		})
	}
}

//------------------图片轮播-----------------
function getImages(classImagesData){
	//console.log(classImagesData);
	var content = '',
		list = '';
	for(var i in classImagesData){
		content += '<div class="classRoom-post" style="background:url(\''+resourceway+'/'+classImagesData[i].filePath+'\') center no-repeat;background-size: 100% auto;"></div>';
		if(i==0){
			list += '<li class="on"></li>';
		}else{
			list += '<li></li>';
		}
	}
	$('.postWrapper').html(content+'<div class="post-button"><ul>'+list+'</ul></div>');
	$('.classRoom-post').css('background-size', '100% auto');
	slider();
}

var play_count=1;
var play_setInterval=null;
function slider(){
	$(".classRoom-post").eq(0).css({"z-index":1,"opacity":1});
	//当鼠标划上去的时候
	$(".post-button").find("li").mouseover(function(){
		$(this).addClass("on").siblings().removeClass("on");
		$(".classRoom-post").css({"z-index":0,"opacity":0});
		$(".classRoom-post").eq($(this).index()).css({"z-index":1}).fadeTo(1200,1);
		play_count = $(this).index()+1;
		//鼠标划上去时，setInterval停止；
		clearInterval(play_setInterval);
	}).mouseout(function(){
	    auto_banner($(".classRoom-post").length-1);
	});		
	auto_banner($(".classRoom-post").length-1);
}

//自定义方法：自动切换
function auto_banner(num){
    play_setInterval=setInterval(function(){
	    if(play_count > num){
		   play_count = num;   //索引的下标最大值
		}
		$(".classRoom-post").css({"z-index":0,"opacity":0});
		$(".classRoom-post").eq(play_count).css({"z-index":1}).fadeTo(1200,1);
		$(".post-button").find("li").removeClass("on");
		$(".post-button").find("li").eq(play_count).addClass("on");
		if(play_count == num){
		   play_count = 0;
		}else{
		   play_count ++;
		}
	},4000);
}

function initVideo(url){
	content='<div id="a1" style="width:100%;height:100%;"></div>';
	$(".video").html(content);
	var isPhone = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent) ?0 :1;
	if(isPhone==0){
		url = resourceway+'/'+url;
	}else{
		url =resourceway+'/'+ encodeURI(encodeURI(url));
		//console.log(url);

	}
	
	var flashvars={
	        f:url,
	        c:0,
	        p:1,
	        t: 0,
	        e:1,
	    };
    var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
    var video=[url+'->video/mp4'];
    var vh = 400;
    if(isPhone==0){
    	CKobject.embed(ctx+'/staticfile/class_brand/js/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%',vh,true,flashvars,video,params);
    }else{
		CKobject.embedSWF(ctx+'/staticfile/class_brand/js/ckplayer/ckplayer.swf','a1','ckplayer_a1','100%',vh,flashvars,params);
    }
}


$(window).resize(function(){
	setClock();
	setLogoSize();
	autoScrolling();
})


$(function(){
	descriptionScroll();
	getLabCode(labId);//获取状态码！
	//getImages(); //图片轮播
	//initVideo('images/four.mp4'); //播放视频
	autoScrolling();//当非整班上课时调用
})