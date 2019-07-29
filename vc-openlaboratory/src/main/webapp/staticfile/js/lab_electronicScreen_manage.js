
function initVideoTable(){
	$('.videoTable').dataTable({
		"aaSorting": [[ 0, "desc" ]],//默认第几个排序
		"bStateSave": true,//状态保存
		"aoColumnDefs": [
		  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
		  {"orderable":false,"aTargets":[1,2]}// 制定列不参与排序
		]
	});
}

function initMsgTable(){
	$('.msgTable').dataTable({
		"aaSorting": [[ 0, "desc" ]],//默认第几个排序
		"bStateSave": true,//状态保存
		"aoColumnDefs": [
		  //{"bVisible": false, "aTargets": [ 3 ]} //控制列的隐藏显示
		  {"orderable":false,"aTargets":[5]}// 制定列不参与排序
		]
	});
}

function showBanner(obj){
	var id = $(obj).parent('p').attr('thisId'),
		isShow = $(obj).attr('isShow');
	$.ajax({
		type:'POST',
		url:ctx+'/labClassCardPicWebController/updata/'+id+'/'+isShow,
		dataType:'JSON',
		data: '',
		success: function(sysresult){
			if(isShow == 0){
				$(obj).attr('isShow',1)
				$(obj).html('&#xe64e;').addClass('c-success');
			}else{
				$(obj).attr('isShow',0)
				$(obj).html('&#xe610;').removeClass('c-success');
			}
			layer.msg('修改成功!')
			window.location.reload();
		},
		error:function(sysresult){
			
		}
	})
}

function delBanner(obj){
	layer.confirm('确认要删除吗？',{title:'删除轮播图'},function(index) {
		var id = $(obj).parent('p').attr('thisId');
		$.ajax({
			type:'POST',
		 	url: ctx+'/labClassCardPicWebController/delete/'+id,
			dataType:'JSON',
			data: '',
			success: function(sysresult){
				$(obj).parents('li').remove();
				layer.msg('删除成功!');
				window.location.reload();

			},
			error:function(sysresult){

			}
		})
	})
}

function delVideo(obj){
	layer.confirm('确认要删除吗？',{title:'删除视频'},function(index) {
		var id = $(obj).parent('td').attr('videoId');
		$.ajax({
			type:'POST',
			url:ctx+'/labClassCardWebVideoController/delete/'+id,
			dataType:'JSON',
			data: '',
			success: function(sysresult){
				$(obj).parents('tr').remove();
				layer.msg('删除成功!');
				window.location.reload();
			},
			error:function(sysresult){
				
			}
		})
	})
}

function delMsg(obj){
	layer.confirm('确认要删除吗？',{title:'删除公告'},function(index) {
		var id = $(obj).parent('td').attr('msgId');
		$.ajax({
			type:'POST',
			url:ctx+'/labNoticeController/delete/'+id,
			dataType:'JSON',
			data: '',
			success: function(sysresult){
				$(obj).parents('tr').remove();
				layer.msg('删除成功!');
				window.location.reload();
			},
			error:function(sysresult){
				
			}
		})
	})
}

function selVideo(obj){
	var id = $(obj).parent('td').attr('videoId'),
		isPlay = $(obj).attr('isPlay'),
		labId = $(obj).attr('labId');
	$.ajax({
		type:'POST',
		url:ctx+'/labClassCardWebVideoController/updata/'+id+'/'+isPlay+'/'+labId,
		dataType:'JSON',
		data: '',
		success: function(sysresult){
			if(sysresult.status!=200){
				layer.msg("只能显示一条视频！");
				//window.location.reload();
			}else{
				
				layer.msg("修改成功");
				window.location.reload();

			}
		},
		error:function(sysresult){
			
		}
	})
}



function showMsg(obj){
	var id = $(obj).parent('td').attr('msgId'),
		isShow = $(obj).attr('isShow');
	console.log(isShow)
	$.ajax({
		type:'POST',
		url:ctx+'/labNoticeController/updateShowStatus/'+id+'/'+(~isShow+2),
		dataType:'JSON',
		data: '',
		success: function(sysresult){
			if(isShow == 0){
				$(obj).attr('isShow',1)
				$(obj).children('i').html('&#xe610;').removeClass('c-success').addClass('c-999');
				console.log(1)
			}else{
				$(obj).attr('isShow',0)
				$(obj).children('i').html('&#xe64e;').removeClass('c-999').addClass('c-success');
				console.log(2)
			}
			layer.msg('修改成功!')
		},
		error:function(sysresult){
			
		}
	})
}

function changeMsgBoundary(obj){
	var id = $(obj).parent('td').attr('msgId'),
	isOpen = $(obj).attr('isOpen');
	$.ajax({
		type:'POST',
		url:ctx+'/labNoticeController/changeMsgBoundary/'+id+'/'+(~isOpen+2),
		dataType:'JSON',
		data: '',
		success: function(sysresult){
			if(isOpen == 0){
				$(obj).attr('isOpen',1)
				$(obj).html('是').removeClass('btn-primary').addClass('btn-success');
			}else{
				$(obj).attr('isOpen',0)
				$(obj).html('否').removeClass('btn-success').addClass('btn-primary');
			}
			layer.msg('修改成功!')
		},
		error:function(sysresult){
			console.log(sysresult);
		}
	})
}

 /*=====================================================
 * ==================  public start  ==================
 * ====================================================
 */

//选择管理项目
function openAddPage(url,title,labIds){
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url+'/'+labIds,
		area : [ '650px', '500px' ],
		maxmin:true,
		scrollbar: false,
		resize: true,
		end:function(){
			
		}
	});
}

//公告
function openAddPageMsg(url,title){
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url,
		area : [ '600px', '450px' ],
		maxmin:true,
		scrollbar: false,
		resize: true,
		end:function(){
			
		}
	});
}

//修改视频
function openUpdateVideo(url,title,labIds){
	var index = layer.open({
		type : 2,
		scrollbar : false,
		title : title,
		content : url+'/'+labIds,
		area : [ '800px', '300px' ],
		maxmin:true,
		scrollbar: false,
		resize: true,
		end:function(){
			
		}
	});
}


//选择中间区域播放类型
function screen_center_play(obj,labId,pvStatus){
	var $obj = $(obj);
	$.ajax({
		type:'POST',
		url:ctx+'/labClassCardPicWebController/updateStatus/'+labId+'/'+pvStatus,
		dataType:'JSON',
		data: '',
		success: function(sysresult){
			change_center_play($obj)
		},
		error:function(sysresult){
			
		}
	})
}

function change_center_play($obj){
	if($obj.attr('sign')==1){
		$obj.attr('sign',0);
		$obj.children('.line').css({'border-color':'#4cacea','background':'#d1fcff'});
		$obj.children('.circle').css({'border-color':'#4cacea','left':'26px'});
	}else{
		$obj.attr('sign',1);
		$obj.children('.line').css({'border-color':'#eee','background':'#fff'});
		$obj.children('.circle').css({'border-color':'#ddd','left':'0'});
	}
}

//打开备注信息
function openMsg(){
	layer.open({
		type: 1,
		title: false,
		content: $('.span_msg')
	})
}

$(function(){
	change_center_play($('.activeBtn'));
})