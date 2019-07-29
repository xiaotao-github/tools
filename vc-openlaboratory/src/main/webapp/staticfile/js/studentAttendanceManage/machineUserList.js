/**
 * 
 */
var userData = []; //定义一个用于存放学生id的全局变量
function addUser(title,url){
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

//定义数组去重方法
Array.prototype.unique = function(){
	var res = [];
	var json = {};
	for(var i = 0; i < this.length; i++){
		if(!json[this[i]]){
			res.push(this[i]);
			json[this[i]] = 1;
		}
	}
	return res;
}

/* 进行判断选中 */
function reChecked(){
	if(userData.length != 0){
		for(var i=0;i<userData.length;i++){
			$("input[name='userId']").each(function(index){
				if($("input[name='userId']").eq(index).val()==userData[i]){
					$(this).prop('checked',true);
				}
			})
		}
	}
}
function checkOrUncheck(obj){
	var str;
	/* 是否选中状态 */
	if($(obj).prop("checked")){
		//全选
		$("input[name='userId']").each(function(){
			str = $(this).val();
			//console.log(str)
			//只push那些没有checked，避免重复
			$(this).prop("checked",true);
			userData.push(str);	
		});
	}else{
		//取消全选
		$("input[name='userId']").each(function(){
			str = $(this).val();
			//console.log(str)
			$(this).prop("checked",false);
			for(var i=0;i<userData.length;i++){
				if(userData[i]==str){
					userData.splice(i,1);
				}
			}
		});
	}
       //去重
	userData=userData.unique();
}

function delAllUser(){
	if(userData.length !=0 ){
		var url =WISDOMLAB+'/clockInManage/deleteUserByMachine';
		layer.confirm('确认要移除选中的学生用户吗？',{title:'移除选中的学生用户'},function(index){
			/*********向websocket发送信息，发送相应的指令信息*************/
			if (heartflag){
				 	var message =DELETE_USER_BY_MACHINE +','+operatorId+','+vcoocUserId;
			        webSocket.send(message);
		    }
			$.ajax({
			 	type: 'POST',
			 	url: url,
			 	dataType: 'json',
			 	data: {"userIdList":userData+'','operatorId':operatorId,"vcoocUserId":vcoocUserId,
			 		"clockinId":clockinId,"labId":labId+''},
			 	success: function(data){
			 		if(data.status==200){
		        		 layer.msg(data.msg);
		        		 loadingLayer =layer.load(1);
		        	}
			 		if(data.status ==301){ //要删除的用户没有在考勤机中，直接删除，直接返回结果，不用异步回调
		        		layer.msg(data.msg,{'time':3000},layer.closeAll());
		                setTimeout('window.location.reload()',500);
		        	}else{
		        		layer.msg(data.msg);
		        	}
		 		},
			 	error:function(data) {
			 		layer.msg('服务器连接失败!');
			 	},
			 });
		});
	}else{		
		layer.msg('请选择需要移除的学生!');
	}
}

function delUser(id){
	layer.confirm('确认要移除该学生用户吗？',{title:'移除该学生用户'},function(index){
		var url =WISDOMLAB+'/clockInManage/deleteUserByMachine';
		/*********向websocket发送信息，发送相应的指令信息*************/
		if (heartflag){
			 	var message =DELETE_USER_BY_MACHINE +','+operatorId+','+vcoocUserId;
		        webSocket.send(message);
	    }
		$.ajax({
		 	type: 'POST',
		 	url: url,
		 	dataType: 'json',
		 	data: {"userIdList":id+'','operatorId':operatorId,"vcoocUserId":vcoocUserId,
		 		"clockinId":clockinId,"labId":labId+''},
		 	success: function(data){
		 		if(data.status==200){
	        		 layer.msg(data.msg);
	        		 loadingLayer =layer.load(1);
	        	}
		 		if(data.status ==301){ //要删除的用户没有在考勤机中，直接删除，直接返回结果，不用异步回调
	        		layer.msg(data.msg,{'time':3000},layer.closeAll());
	                setTimeout('window.location.reload()',500);
	        	}else{
	        		layer.msg(data.msg);
	        	}
	 		},
		 	error:function(data) {
		 		layer.msg('服务器连接失败!');
		 	},
		 });
	});
}

function retrieveData( sSource,aoData, fnCallback) {
    $.ajax({
        url : sSource,//这个就是请求地址对应sAjaxSource
        data : {"aoData":JSON.stringify(aoData),"clockinId":clockinId},//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
        type : 'post',
        dataType : 'json',
        async : false,
        success : function(result) {
        	//console.log(result);
            fnCallback(result);//把返回的数据传给这个方法就可以了,datatable会自动绑定数据的】
            reChecked();
            bindCheckBox();
        },
        error : function(msg) {
        	
        }
    });
}
function bindCheckBox(){
	var strsingle = null;
	$("input[name='userId']").each(function(index){
		$("input[name='userId']").eq(index).off().on('change',function(){
			strsingle = $(this).val();
			//console.log(strsingle);
			if($(this).prop("checked")){
				userData.push(strsingle);
			}else{
			   for(var i=0;i<userData.length;i++){
					if(userData[i]==strsingle){
						userData.splice(i,1);
					}
				}
			}
			console.log(userData);
		});
	})
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

var table;

$(function(){
	initSocket();
	var url ='/labClockInManageController/selectMachineUserList';
	table = $(".table").dataTable({
		"bProcessing": true, // 是否显示取数据时的那个等待提示
		"bServerSide": true,//这个用来指明是通过服务端来取数据
		"sAjaxSource": url,//这个是请求的地址
		"fnServerData": retrieveData, // 获取数据的处理函数
		"aaSorting": [[0, "desc" ]],//默认第几个排序
		"bStateSave": false,//状态保存
		"aoColumnDefs": [
		  {"orderable":false,"aTargets":[0]}// 制定列不参与排序
	  	], 
	  	"columns":[
			{"data":"checkBox"},
			{"data":"username"},
			{"data":"name"},
			{"data":"type"},
			{"data":"departName"},
			{"data":"majorName"},
			{"data":"gradeName"},
			{"data":"className"},
			{"data":"operateName"},
			{"data":"createTime"},
			{"data":"operation"}
			],
		"initComplete": function(settings, json) {
			bindCheckBox();
			reChecked();
		}
	});
	
	$(".table").css('width','100%');
})