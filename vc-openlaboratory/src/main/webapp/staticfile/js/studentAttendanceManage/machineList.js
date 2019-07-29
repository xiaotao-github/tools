/**
 * 
 */
function addMachine(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url,
		area: ['600px','450px'],
		maxmin:true,
	    scrollbar: false,
		resize: true
	});
}

function editMachine(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url,
		area: ['600px','450px'],
		maxmin:true,
	    scrollbar: false,
		resize: true
	});
}

function delMachine(clockId,labId){
	
	var formUrl =WISDOMLAB+'/clockInManage/delMachine';
	/*********向websocket发送信息，发送相应的指令信息*************/
	 if (heartflag){
		 	var message =DELETE_MACHINE +','+operatorId+','+vcoocUserId;
	        webSocket.send(message);
    }
	
	layer.confirm('确认要移除该考勤机吗？',{title:'移除考勤机'},function(index){
		
		$.ajax({
	        url : formUrl,
	        data : {'operatorId':operatorId,"clockId":clockId,"vcoocUserId":vcoocUserId,"labId":labId},//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
	        type : 'post',
	        dataType : 'json',
	        async : false,
	        success : function(result) {
	        	if(result.status==200){
	        		 layer.msg(result.msg);
	        		 loadingLayer =layer.load(1);
	        	}else{
	        		layer.msg(result.msg);
	        	}
	        },
	        error : function(msg) {
	        	layer.msg('服务器连接失败!');
	        }
	    });
		
	});
}
/* ============================================================================
 * ===========================                       ==========================
 * ===========================    web socket start   ==========================
 * ===========================                       ==========================
 * ============================================================================*/

var heartflag = false;
var webSocket = null;
var tryTime = 0;

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
function initSocket() {
	//var url = 'ws://http://127.0.0.1:1906//websocketJS';
    if (!window.WebSocket) {
        layer.msg(getNowFormatDate()+"  您的浏览器不支持ws<br/>",{'time':3000});
        return false;
    }

    webSocket = new WebSocket("ws://"+window.location.host+"/websocket");//路径

    // 收到服务端消息
    webSocket.onmessage = function (msg) {
    	layer.msg(msg.data,{'time':3000},layer.closeAll());
    	setTimeout('window.location.reload()',1800);
    	//window.location.reload();
    	//layer.closeAll();
    	//alert(msg.data);
    	//layer.close(msg);
    	//var data = $.parseJSON( msg.data )
        //console.log(data);
    	//layer.closeAll();
        //setTimeout('window.parent.location.reload()',1800);
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
    var message = '/writeInfo';
    webSocket.send(message);
}

function heart() {
    if (heartflag){
        webSocket.send("&");
    }
    setTimeout("heart()", 10*60*1000);

}

/* ============================================================================
 * ===========================                       ==========================
 * ===========================     web socket end    ==========================
 * ===========================                       ==========================
 * ============================================================================*/

$(function(){
	initSocket();
	$('.table').dataTable({
		"aaSorting": [[0, "desc" ]],//默认第几个排序
		"bStateSave": false,//状态保存
		"aoColumnDefs": [
		  {"orderable":false,"aTargets":[3]}// 制定列不参与排序
		  ]
	});
})