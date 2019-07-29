/**
 * 
 */

var recordData = new Array();

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

//3个参数的名字可以随便命名,但必须是3个参数,少一个都不行
function retrieveData( sSource,aoData, fnCallback) {
    $.ajax({
        url : sSource,//这个就是请求地址对应sAjaxSource
        data : {"aoData":JSON.stringify(aoData),"userId":userId,"clockinId":clockinId},//这个是把datatable的一些基本数据传给后台,比如起始位置,每页显示的行数
        type : 'post',
        dataType : 'json',
        async : false,
        success : function(result) {
            fnCallback(result);//把返回的数据传给这个方法就可以了,datatable会自动绑定数据的】
            reChecked();
            bindCheckBox();
        },
        error : function(msg) {
        	
        }
    });
}

/* 进行判断选中 */
function reChecked(){
	if(recordData.length != 0){
		for(var i=0;i<recordData.length;i++){
			$("input[name='recordId']").each(function(index){
				if($("input[name='recordId']").eq(index).val()==recordData[i]){
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
		$("input[name='recordId']").each(function(){
			str = $(this).val();
			//console.log(str)
			//只push那些没有checked，避免重复
			$(this).prop("checked",true);
			recordData.push(str);	
		});
	}else{
		//取消全选
		$("input[name='recordId']").each(function(){
			str = $(this).val();
			//console.log(str)
			$(this).prop("checked",false);
			for(var i=0;i<recordData.length;i++){
				if(recordData[i]==str){
					recordData.splice(i,1);
				}
			}
		});
	}
    //去重
	recordData=recordData.unique();
}

function bindCheckBox(){
	var strsingle = null;
	$("input[name='recordId']").each(function(index){
		$("input[name='recordId']").eq(index).off().on('change',function(){
			strsingle = $(this).val();
			if($(this).prop("checked")){
				recordData.push(strsingle);
			}else{
			   for(var i=0;i<recordData.length;i++){
					if(recordData[i]==strsingle){
						recordData.splice(i,1);
					}
				}
			}
			//console.log(recordData);
		});
	})
}

function exportUserRecord(){
	if(recordData.length != 0){
		layer.confirm('确认要导出所选的考勤记录吗？',{title:'导出已选中的考勤记录'},function(index){
			$('#ids').val(recordData+"");
 			$("#fas").submit();
 			layer.close(index)
		});
	}else{
		layer.msg('请选择需要导出的考勤记录!');
	}
}

function exportUserRecordAll(){
	if($("input[name='recordId']").length ==0){
		layer.msg('没有考勤机记录');
		return;
	}
	layer.confirm('确认要导出所有考勤记录吗？',{title:'导出该用户所有考勤记录'},function(index){
		$("#fal").submit();
		layer.close(index)
	});
}

function exportUserRecordByTime(){
	var index = layer.open({
		type: 1,
		title: false,
		content: $(".selTime"),
		area: ['600px','auto'],
		end:function(){
			clearTime();
		}
	});
}

function clearTime(){
	$('#startTime').val('');
	$('#endTime').val('');
}

$(function(){
	var url ='/labClockInManageController/selectClockinRecord';
	$(".table").dataTable({  
		"bProcessing": true, // 是否显示取数据时的那个等待提示
		"bServerSide": true,//这个用来指明是通过服务端来取数据
		"sAjaxSource": url,//这个是请求的地址
		"fnServerData": retrieveData, // 获取数据的处理函数
		"aaSorting": [[3, "desc" ]],//默认第几个排序
		"bStateSave": false,//状态保存
		"aoColumnDefs": [
		  {"orderable":false,"aTargets":[0]}// 制定列不参与排序
	  	], 
		"columns":[
			{"data":"checkBox"},
			{"data":"labName"},
			{"data":"machineName"},
			{"data":"clockingTime"}
//			{"data":"operation"}
		],
		"initComplete": function(settings, json) {
			bindCheckBox();
		}
	});
	
	$(".table").css('width','100%');
	
	$('.exportRecord').on('click',function(){
		if($('#startTime').val() != '' && $('#endTime').val() != ''){
			$.ajax({
			 	type: 'POST',
			 	url: '/labClockInManageController/countUserClockinRecordByTime',
			 	data:{
			 		"clockinId":clockinId,
			 		"startTime":$('#startTime').val(),
			 		"endTime":$('#endTime').val(),
			 		"userId":userId
			 	},
			 	dataType: 'json',
			 	success: function(data){
			 		if(data.status=="200"){
			 			
			 			$('#startTime1').val($('#startTime').val());
						$('#endTime1').val($('#endTime').val());
						$("#fatime").submit();
						layer.closeAll();
						
			 		}else{
			 			layer.msg(data.msg);
			 		}
		 		},
			 	error:function(data) {
			 		layer.msg('服务器连接失败!');
			 	},
			 });
//			$('#startTime1').val($('#startTime').val());
//			$('#endTime1').val($('#endTime').val());
//			$("#fatime").submit();
//			layer.closeAll();
			}else{
				layer.msg('请选择需要导出的考勤记录所在时间段');
			}
		})
})