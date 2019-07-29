//test start

/*var testData = [
		{
			data:[
				{'CHAPOS': 0,'CHAVAL': 0.5},
				{'CHBPOS': 0,'CHBVAL': 0.5},
				{'CHCPOS': -40,'CHCVAL': 0.5},
				{'CHDPOS': -120,'CHDVAL': 5}
			],
			datatype: 'proteus_position'
		},
		{
			data:[
				{'Time': 0.00246,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00247,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00248,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00249,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00250,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00251,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00252,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00253,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00254,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00255,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00256,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00257,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00258,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00259,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00260,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00261,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00262,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00263,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00264,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00265,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00266,'Va':  0.1,'Vb': 20,'Vc': 30,'Vd': 40},
				{'Time': 0.00267,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00268,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00269,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00270,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00271,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00272,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00273,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00274,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40},
				{'Time': 0.00275,'Va': -0.1,'Vb':-20,'Vc':-30,'Vd':-40}
			],
			datatype: 'proteus_draw'
		},
		{
			data: [
				{Frequency:100,MM:20,Max:10,Min:-10},
				{Frequency:100,MM:40,Max:20,Min:-20},
				{Frequency:100,MM:60,Max:30,Min:-30},
				{Frequency:100,MM:80,Max:40,Min:-40}
			],
			datatype: 'proteus_data'
		},
		{
			data:[
				{name:'IAC AMMETER',value: 20,mark:'0'},
				{name:'IAC AMMETER',value: 20,mark:'1'},
				{name:'IAC AMMETER',value: 20,mark:'2'},
				{name:'IAC VOLTMETER',value: 20,mark:'0'},
				{name:'IDC AMMETER',value: 5,mark:'0'},
				{name:'IDC VOLTMETER',value: 6,mark:'0'},
				{name:'IWATTMETER',value: 100,mark:'0'}
			],
			datatype: 'vsm'
		}
];

for(var testloop in testData){
	scanDataType(testData[testloop]);
}*/

//test end

var heartflag_1 = false;
var webSocket_1 = null;
var tryTime_1 = 0;

function initWebsocket_1(){
	console.log('进入与本地web服务器的连接！');
	$('.reconnection').html('正在创建连接...');
	

	if (!window.WebSocket) {
	    layer.msg("您的浏览器不支持ws<br/>",{'time':3000});
	    return false;
	}
	
	var url = "ws://localhost:1234/";
	//sid 学生id
	webSocket_1 = new WebSocket(url);//路径
	   
	
	// 收到服务端消息
	webSocket_1.onmessage = function (msg) {
		var dataMsg = msg.data;
		var data = dataMsg;
		data = $.parseJSON(dataMsg);
		console.log('收到数据：');
		console.log(data);
		for(var i in data){
			scanDataType(data[i]);
		}
	};
	
	// 异常
	webSocket_1.onerror = function (event) {
	    heartflag_1 = false;
	    layer.msg("连接本地web服务器异常<br/>",{'time':3000});
	};
	
	// 建立连接
	webSocket_1.onopen = function (event) {
		console.log('开始创建连接！');
		heartflag_1 = true;
	    heart_1();
	    console.log('与本地web服务器建立连接成功!')
	    layer.msg("与本地web服务器建立连接成功<br/>");
	    $('.reconnection').off().html('已连接');
	    tryTime_1 = 0;
	};
	
	// 断线重连
	webSocket_1.onclose = function () {
		console.log(tryTime_1)
		heartflag_1 = false;
	    // 重试5次，每次之间间隔10秒
	    if (tryTime_1 < 5) {
	        setTimeout(function () {
	        	webSocket_1 = null;
	        	tryTime_1++;
	        	initWebsocket_1();
	            console.log('【error】与本地web服务器建立连接失败!')
	            layer.msg( "第"+tryTime_1+"次重连本地web服务器<br/>");
	        }, 3*1000);
	    } else {
	        layer.msg("本地web服务器重连失败.");
	        $('.reconnection').html('重新连接服务器');
	        $('.reconnection').off().on('click',function(){
	        	tryTime_1 = 0;
	        	webSocket_1 = null;
	        	initWebsocket_1();
	        	$(this).off();
	        })
	    }
	};
}

function send_1(msg){
    /*var message = [{
    	datatype : 'test',
    	dataTest:'idn？',
    	data: {
    		channel:{
	    		channel_1:{
	    			U: 1,
	    			I: 10
	    		},
	    		channel_2:{
	    			U: 2,
	    			I: 20
	    		},
	    		channel_3:{
	    			U: 3,
	    			I: 30
	    		},
	    		channel_4:{
	    			U: 4,
	    			I: 40
	    		}
    		},
    		switchs:{
    			'A': 0,
    			'B': 1,
    			'C': 0
    		},
    		instructions:'Request pulse and pin',
    		other: 123
    	}
    }];*/
    webSocket_1.send(msg);
}

function heart_1() {
    if (heartflag_1){
        webSocket_1.send("&");
    }
    setTimeout("heart_1()", 10*60*1000);

}

function closeSocket(){
	webSocket_1.close();
}

$(function(){
	var sendSocketBtn = $('<button type="button" onclick="send_1()">发送指令到本地web服务器</button>');
	$('.dataGetting').prepend(sendSocketBtn);
	
	//initWebsocket_1();
})
