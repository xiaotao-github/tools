/*--- public js ---*/

function classTableSlide(obj){
	var $o = $(obj).parent();
	if($o.siblings('.classTable').is(':hidden')){
		$o.siblings('.classTable').slideDown();
		$o.children('span').children('i').html('▲');
	}else{
		$o.siblings('.classTable').slideUp();
		$o.children('span').children('i').html('▼');
	}
}

function removeClass(obj,classId,scheduleId){
	var $o = $(obj);
	var ids = $o.attr('ids');
	var index = layer.confirm('是否确定在此安排中移除该班级(该班级下学生成绩也会被删除)?',{
		btn: ['确定','取消']
	},function(){
		$.ajax({
			type: 'post',
			dataType : 'json',
			url : ctx+'/courseScheduleController/removeAutonomyClass/'+scheduleId+'/'+classId+'/'+experimentCourseName+'/'+schooltime+'/'+slice+'/'+type,
			success: function(sysresult){
				$o.parents('.eachClassMemberList').remove();
				layer.msg('删除成功!',{icon:2,time : 1000});
			},
			error: function(sysresult){
				layer.msg('删除失败!');			
			}
		})
	},function(){
		layer.close(index);
	})
}


//成绩详情
function openScoreDetail(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url,
		area: ['600px','450px'],
		maxmin:true,
		scrollbar: false,
		resize: true
	});
	layer.full(index);
}

/*--- eventDetail1 js ---*/
$(function(){
	$('table.eventTable1').dataTable({
		"aaSorting": [[1, "desc" ]],//默认第几个排序
		"bStateSave": false,//状态保存
		"aoColumnDefs": [
		  {"orderable":false,"aTargets":[0]}// 制定列不参与排序
		]
	});
})



/*--- eventDetail3 js---*/
$('.eachGroupMemberList').each(function(index){
	var obj = $('.eachGroupMemberList').eq(index);
	resizeDlHeigth(obj);
})

$('.eachGroupMemberList dt p').off().on('click',function(){
	var obj = $(this).parents('.eachGroupMemberList');
	if($(this).parent().siblings('dd').children('table').is(':hidden')){
		$(this).parent().siblings('dd').children('table').show();
		$(this).parent().siblings('dd').children('.hp').hide();
	}else{
		$(this).parent().siblings('dd').children('table').hide();
		$(this).parent().siblings('dd').children('.hp').show();
	}
	resizeDlHeigth(obj);
})

function resizeDlHeigth(obj){
	var $obj = $(obj);
	var h = $obj.children('dd').height();
	$obj.css('height',h);
}

function removeGroup(obj,id){
	var $obj = $(obj);
	var index = layer.confirm('是否确定在此安排中移除该班级(该班级下学生成绩也会被删除)?',{
		btn: ['确定','取消']
	},function(){
		$.ajax({
			url: ctx+'/courseScheduleController/deleteGroup/'+scheduleId+"/"+id,
			type: 'POST',
			dataType : 'json',
			success: function(sysresult){
				if(sysresult.status == 200){
					$obj.parent().parent().remove();
					layer.msg('删除小组成功!');
				}
			},
			error : function(sysresult){
				layer.msg('删除小组失败!');
			}
		})
	},function(){
		layer.close(index);
	})
}

//修改小组
function editGroup(id){
	layer.open({
		type : 2,    //1、是div，2、是链接
		content : ctx+'/courseScheduleController/toEditGroupPage/'+id,
		area : ['600px','450px'],
		resize : true,
		maxmin:true,//放大放小
        resize: false,
        title:'修改小组'
	})
}