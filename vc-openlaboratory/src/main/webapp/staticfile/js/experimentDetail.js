function delNote(id,obj){
	// $.ajax({
	// 	type:'POST',
	// 	data:id,
	// 	url:'${ctx}/StudentNotesWebController/deleteNoteById/'+id,
	// 	success: function(sysresult){
	// 		if(sysresult.status==200){
				$(obj).parent('li').remove();
				layer.msg('删除成功',{icon:1,time:1500});
	// 		}else{
	// 			layer.msg('删除失败',{icon:2,time:1500});
	// 		}
	// 	},
	// 	error: function(data){
			
	// 	}
	// })
}


function initInstructor(){
	if(experimentInstructorFileFormatPath=='' && experimentInstructorFilePath==''){
		$("#instructor").append("该实验暂未分配实验指导书,请浏览其他资源。");
	}else{
		var content="";
		if(experimentInstructorFileFormatPath=='' || experimentInstructorFileFormatPath ==null){
			content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
			'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
			'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
			'<a  onclick="downLoad('+experimentInstructorFileId+')" class="btn mt-40" style="margin-top:100px;background:#1e6269;color:#fff;" title="下载资源 ">'+
	  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
		}else{
			//newFlexPaper('instructor',RESOURCE_WAY+experimentInstructorFileFormatPath);//url:实验指导书的路径
			//content='<li class="documentResoures-changeBox-content hide"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+RESOURCE_WAY+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div></li>';
			if(experimentInstructorFileFormatPath=='' || experimentInstructorFileFormatPath ==null){
				content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
				'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
				'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
				'<a onclick="downLoad('+experimentInstructorFileId+')" class="btn mt-40" style="margin-top:100px;background:#1e6269;color:#fff;" title="下载资源 ">'+
		  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
			}else{
				//newFlexPaper('instructor',RESOURCE_WAY+experimentInstructorFileFormatPath);//url:实验指导书的路径
				//content='<li class="documentResoures-changeBox-content hide"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+RESOURCE_WAY+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div><>';
				var type = experimentInstructorFileFormatPath.substr(experimentInstructorFileFormatPath.lastIndexOf(".")+1);
				if(type=='html'){
					//html
					content='<li class="documentResoures-changeBox-content"><div style="width:720px;height:400px;margin: 0 auto;padding-bottom:10px"><iframe src="'+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div></li>';
				}else if(type=='swf'){//swf
					newFlexPaper('instructor',experimentInstructorFileFormatPath);//url:实验指导书的路径
				}else{
					content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
					'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
					'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
					'<a onclick="downLoad('+experimentInstructorFileId+')"class="btn mt-40" style="margin-top:100px;background:#1e6269;color:#fff;" title="下载资源 ">'+
			  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
				}
			}
		}
		$("#instructor").append(content);
	}
}

$('.stepOrder').each(function(index){
	$('.stepOrder').eq(index).off().on('click',function(){
		if($(this).siblings().find('.stepContain').is(':hidden')){
			$(this).siblings().find('.stepContain').slideDown();
			$(this).parent('li').siblings().find('.stepContain').slideUp();
		}else{
			$(this).siblings().find('.stepContain').slideUp();
		}
	})
})

$('.softwareList li').each(function(index){
	if((index+1)%2==0){
		$('.softwareList li').eq(index).css('margin-left','8px');
	}
})

$(function(){
	initInstructor();
	$('.stepContain').each(function(index){
		if(index==0){
			$('.stepContain').eq(index).show();
		}
	})
})