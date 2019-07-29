var uploadMsg = function(){
	var noticeId = $('input[name=noticeId]').val();
	var teacherId = $('input[name=teacherId]').val();
	var title = $('input[name=title]').val();
	var labId = $('input[name=labId]').val();
	var content = $('textarea[name]').val();
	$.ajax({
		type:'POST',
		url:ctx+'/labNoticeController/save',
		data:{
			'noticeId':noticeId,
			'teacherId':teacherId,
			'title':title,
			'labId':labId,
			'content':content
		},
		dataType:'json',
		success:function(result){
			if(result.status==200){
				layer.msg('success',{'time':2000},function(){
					window.parent.location.reload();
				});
			}else{
				layer.msg(result.msg);
			}
		},
		error:function(result){
			console.log(result);
		}
	})
} 

$('.submitBtn').on('click',function(){
	uploadMsg();
})