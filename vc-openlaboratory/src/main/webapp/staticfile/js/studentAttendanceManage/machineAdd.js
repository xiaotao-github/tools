/**
 * 
 */
var loadingLayer;

function initSelectBar(){
	$.ajax({
		type:'GET',
		data:'',
		url:'/labClockInManageController/getAddMachineLabList',
		dataType: 'JSON',
		success: function(sysresult){
			if(sysresult.status == 200 ){
				if(sysresult.data !=null && sysresult.data != ''){
					var content = '<option value="">实验室名称</option>';
					for(var i in sysresult.data){
						content += '<option value="'+sysresult.data[i].labId+'">'+sysresult.data[i].labName+'</option>';
					}
					$('#labSelect').html(content);
				}else {
					$('#labSelect').attr("nullmsg","没有可以选择的实验室！");
					var content = '<option value="">实验室名称</option>';
					$('#labSelect').html(content);
				}
			}else{
				layer.msg('请求失败!');
			}
		},
		error: function(sysresult){
			layer.msg('连接服务器失败!');
		}
	})
	
	$.ajax({
		type:'GET',
		data:'',
		url:'/labClockInManageController/getAddMachineClockinIdList',
		dataType: 'JSON',
		success: function(sysresult){
			//console.log(sysresult);
			if(sysresult.status == 200){
				if(sysresult.data !=null && sysresult.data != ''){
					var content = '<option value="">考勤机ID</option>';
					for(var i in sysresult.data){
						content += '<option value="'+sysresult.data[i]+'">'+sysresult.data[i]+'</option>';
					}
					$('#clockinIdSelect').html(content);
				}else{
					$('#clockinIdSelect').attr("nullmsg","没有可以选择的考勤机，请在相应考勤机设置唯一的考勤机ID,并设置好服务器！");
					var content = '<option value="">考勤机ID</option>';
					$('#clockinIdSelect').html(content);
				}
				
			}else{
				layer.msg('请求失败!');
			}
		},
		error: function(sysresult){
			layer.msg('连接服务器失败!');
		}
	})
}

$("#machineAdd-form").Validform({
	btnSubmit:"#machineAddSub",
	btnReset:"#machineAddReset",
	tiptype:2, 
	ignoreHidden:false,
	dragonfly:false,
	tipSweep:false,
	label:".label",
	showAllError:true,
	postonce:true,
	ajaxPost:true,
	datatype:{
		"*6-20": /^[^\s]{6,20}$/,
		"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
		"n-en" : /[0-9a-zA-Z]{1,23}/,
		"ch"   : /[\u4E00-\u9FA5]+$/,
		"number":/^[0-9]{1,3}$/
	},
	usePlugin:{
		swfupload:{},
		datepicker:{},
		passwordstrength:{},
		jqtransform:{
			selector:"select,input"
		}
	},
	beforeCheck:function(curform){
		//在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话将不会继续执行验证操作;
	},
	beforeSubmit:function(curform){
		//在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
		//这里明确return false的话表单将不会提交;	
	},
	callback: function(sysresult){
		if(sysresult.status == 200){
			layer.msg('添加成功!',{icon:1,time:1500});
			loadingLayer = layer.load(1);
			layer.close(loadingLayer);
			//layer.closeAll('loading');
			setTimeout('window.parent.location.reload()',1800);
		}else{
			//layer.msg('请求失败!')
			layer.msg(sysresult.msg);
			setTimeout('window.parent.location.reload()',1800);
			//setTimeout('window.location',2000);
		}
	}
});


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
        var data = $.parseJSON( msg.data )
        //console.log(data);
        layer.close(loadingLayer);
        setTimeout('window.parent.location.reload()',1800);
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
   // webSocket.send(message);
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
    //initSocket();
    //发送消息给服务器
	initSelectBar();
})