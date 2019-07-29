function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}


$('.controlList li').each(function(index){
	$('.controlList li').eq(index).on('click',function(){
		var $o = $(this);
		if($o.hasClass('on')){
			$o.removeClass('on');
			$('.part3-2').removeClass('on')
		}else{
			$o.addClass('on').siblings('li').removeClass('on');
			if($('.part3-2').hasClass('on')){
				$('.part3-2').find('ul').eq(index).show().siblings().hide();
			}else{
				$('.part3-2').addClass('on').find('ul').eq(index).show().siblings().hide();
			}
		}
	})
})

$('.seatList li').each(function(index){
	$('.seatList li').eq(index).on('click',function(){
		$(this).toggleClass('on');
		var sign = $(this).attr("seatId");
		var arr = sign.split("_");
		console.log(arr);
		$.ajax({
			type: 'POST',
			url: ctx+'/equipment/controlEqu',
			dataType: 'JSON',
			data:{
				'devId':arr[0],
				'ep':arr[1],
				'gwId':gwId
			},
			success: function(sysresult){
				if(sysresult.status!=200){
					layer.msg(sysresult.msg);
				}
				//o.toggleClass('on');
			},
			error: function(sysyresult){
			}
		})
	})
})


function offAndOn(o){
	if(!o.hasClass('door')){
		var sign = o.attr("equipmentId");
		var arr = sign.split("_");
		$.ajax({
			type: 'POST',
			url: ctx+'/equipment/controlEqu',
			dataType: 'JSON',
			data:{
				'devId':arr[0],
				'ep':arr[1],
				'gwId':gwId
			},
			success: function(sysresult){
				if(sysresult.status!=200){
					layer.msg(sysresult.msg);
				}
				//o.toggleClass('on');
			},
			error: function(sysyresult){
			}
		})
	}else{
		if(!o.hasClass('on')){
			o.addClass('on');
			var sign = $(this).attr("equipmentId");
			/*$.ajax({
				type: 'GET',
				url: '',
				data: '',
				dataType: 'JSON',
				success: function(sysresult){
					
				},
				error: function(sysyresult){
					
				}
			})*/
		}
	}
}

function getMsg(id){
	var $o = $('#'+id);
//	offAndOn($o);
	/*有更新优先显示更新区域*/
	/*var index = $o.parent('ul').index();
	if(!$('.controlList li').eq(index).hasClass('on')){
		$('.controlList li').eq(index).click();
	}*/
}

getMsg('123');

$('.part3-2 li').each(function(index){
	$('.part3-2 li').eq(index).on('click',function(){
		offAndOn($(this));
	})
})

function changeEquipmentType(data){
	//console.log(data);
	switch (data.type){
		case "42":
			var epData = data.epData/1;
			if(epData<1000){
				$('.evn-num').eq(3).html('空气清新');
			}else if(epData>=1000 && epData<2000){
				$('.evn-num').eq(3).html('空气浑浊');
			}else if(epData>=2000){
				$('.evn-num').eq(3).html('严重污染');
			}
			break;
		case "17" :
			if(data.epData!=null && data.epData!=''){
				var split = data.epData.split(",");
				$('.evn-num').eq(0).html(split[0]+'℃');
				$('.evn-num').eq(1).html(split[1]+'%');
			}
			break;
		case "19":
			$('.evn-num').eq(2).html(data.epData+'Lux');
			break;
		default: 
			if(data.epData == '1'){
				if(!$('#'+data.devID).hasClass('on')){
					console.log($('#'+data.devID))
					$('#'+data.devID).addClass('on');
				}
			}else{
				if($('#'+data.devID).hasClass('on')){
					console.log($('#'+data.devID))
					$('#'+data.devID).removeClass('on');
				}
			}
			break;
	}
}

/*=============================================================================
 * ===========================                       ==========================
 * ===========================    web socket start   ==========================
 * ===========================                       ==========================
 * ============================================================================*/

var heartflag = false;
var webSocket = null;
var tryTime = 0;
$(function () {
	$.ajax({
		type:'GET',
		url: WISDOMLAB+'/euqipment/getEuqToCovertor/'+gwId+'/'+pwd,
		dataType: 'JSON',
		success: function(sysresult){
			if(sysresult.status == 200){
				var data = sysresult.data;
				for(var i in data){
					changeEquipmentType(data[i]);
				}
				//layer.msg('请求成功!');
			}else{
				
			}
		},
		error:function(sysresult){
			
		}
	})
    initSocket();
    window.onbeforeunload = function () {

    };
});

function initSocket() {
	//var url = 'ws://http://127.0.0.1:1906//websocketJS';
    if (!window.WebSocket) {
        layer.msg(getNowFormatDate()+"  您的浏览器不支持ws<br/>",{'time':3000});
        return false;
    }

    webSocket = new WebSocket("ws://"+window.location.host+"/websocket");//路径

    // 收到服务端消息
    webSocket.onmessage = function (msg) {
        var data = $.parseJSON( msg.data )
        console.log(data);
        changeEquipmentType(data);
    };

    // 异常
    webSocket.onerror = function (event) {
        heartflag = false;
        layer.msg(getNowFormatDate()+"  异常<br/>",{'time':3000});
    };

    // 建立连接
    webSocket.onopen = function (event) {
        heartflag = true;
        heart();
        layer.msg(getNowFormatDate()+"  建立连接成功<br/>");
        tryTime = 0;
    };

    // 断线重连
    webSocket.onclose = function () {
        heartflag = false;
        // 重试10次，每次之间间隔10秒
        if (tryTime < 10) {
            setTimeout(function () {
                webSocket = null;
                tryTime++;
                initSocket();
                layer.msg( getNowFormatDate()+"  第"+tryTime+"次重连<br/>");
            }, 3*1000);
        } else {
            layer.msg("重连失败.");
        }
    };
}

function send(){
    var message = '';
    webSocket.send(message);
}

function heart() {
    if (heartflag){
        webSocket.send("&");
    }
    setTimeout("heart()", 10*60*1000);

}