function showTips(){
	layer.open({
		type: 1,
		title: false,
		content: $('.lab_text'),
		area: ['80%']
	})
}

function ajax_commands(commandType,wgId,code){
	$.ajax({
		type: 'POST',
		url: WISDOMLAB+'euqipment/typeControl'+'/'+commandType+'/'+wgId+'/'+code,
		dataType: 'JSON',
		async:false,
		success: function(sysresult){
			ajaxReturnType = 0;
			//返回该类型的设备为空
			if(sysresult.status==401){
				layer.msg(sysresult.msg);
			}
		},
		error: function(sysresult){
			ajaxReturnType = 0;
			layer.msg('发送请求失败!');
		}
	})
}

var prevType;
var ajaxReturnType = 0;
$('.btn_bar li').each(function(index){
	$('.btn_bar li').eq(index).off().on('click',function(){
		if(ajaxReturnType == 0){
			ajaxReturnType = 1;
			ajax_commands($(this).attr('commandType'),wgId,$(this).attr('openOrClose'));
		}else{
			//不作反应,上一条指令未发送成功走else;
		}
	})
})

$('.jump_btn_sel').on('click',function(){
	$('.body_shadow').show();
	$('.jump_btn').slideDown(300);
	$('.jump_btn_sel').hide(300);
})

$('.body_shadow').on('click',function(){
	$('.jump_btn').slideUp(300);
	$('.body_shadow').hide();
	$('.jump_btn_sel').show(300);
})