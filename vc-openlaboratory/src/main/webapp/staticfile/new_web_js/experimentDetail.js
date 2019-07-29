function wordlimit(cname,wordlength,isOpen){
	var cname=$("."+cname);
	for(var i=0;i<cname.length;i++){
		var nowLength=cname[i].innerHTML.length;
		var content = cname[i].innerHTML;
		if(nowLength>wordlength){
			if(isOpen==0){
				cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+' . . . ';
			}else if(isOpen==1){
				cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+'. . . . . . <a href="##" onClick="openMore(\''+content+'\');" style="color:#50a5be">[展开]</a>';
			}else if(isOpen==2){
				$(cname[i]).parent().append('<br/><span class="moreIntro"><a href="##" onClick="moreIntro(\''+content+'\');">查看更多+</a></span>');
				cname[i].innerHTML=(cname[i].innerHTML).substr(0,wordlength)+' . . . ';
			}
		}
	}
}

function delNote(id,obj){
	$.ajax({
		type:'POST',
		data:id,
		url:'${ctx}/StudentNotesWebController/deleteNoteById/'+id,
		success: function(sysresult){
			if(sysresult.status==200){
				$(obj).parent('li').remove();
				layer.msg('删除成功',{icon:1,time:1500});
			}else{
				layer.msg('删除失败',{icon:2,time:1500});
			}
		},
		error: function(data){
			
		}
	})
}


function showQRcode(){
	var index = layer.open({
		type:1,
		content:$(".QRCodeDetail"),
		title:false,
		area:['400px','400px']
	});
}

$(".chapterDetailQRCode").off().on('click',function(){showQRcode();})


function downLoad(id){
	//判断该文件是否存在
	$.ajax({
		type:'POST',
		dataType:'json',
		url:ctx+'/experimentWebController/fileExistsById/'+id,
		success: function(sysresult){
			if(sysresult.status==200){
				//下载资源
				    $('#fileId').val(id);
                   $('#downLoadFile').submit();
			}else{
				layer.msg(sysresult.msg,{icon:2,time:1500});
			}
		},
		error: function(data){
			console.log(data)
		}
	})
}

function newFlexPaper(cname,url) {
	var width = 757;
	var height = 400;
	$("#"+cname).css("width", width * 0.94 + "px");
	$("#"+cname).css("height", height + "px");
	$("#"+cname).css("padding-left", width * 0.03 + "px");
	$("#"+cname).css("display", "block");
	var fp = new FlexPaperViewer(ctx+'/staticfile/document/FlexPaperViewer',
		cname, {
			config : {
				SwfFile : url,//动态路径
				Scale : 1.0,
				ZoomTransition : 'easeOut',
				ZoomTime : 0.5,
				ZoomInterval : 0.2,
				FitPageOnLoad : false,
				FitWidthOnLoad : false,
				FullScreenAsMaxWindow : false,
				ProgressiveLoading : true,
				MinZoomSize : 0.2,
				MaxZoomSize : 5,
				SearchMatchAll : false,
				InitViewMode : 'Portrait',
				ViewModeToolsVisible : true,
				ZoomToolsVisible : true,
				NavToolsVisible : true,
				CursorToolsVisible : true,
				SearchToolsVisible : true,
				localeChain : 'zh_CN'
			}
		});
	$("#"+cname).children("object").append('<param name="wmode" value="opaque"><embed  wmode="opaque"></embed>');
}

function initInstructor(){
	var bgColor = '';
	if(isDownload==1){
		bgColor = '#1e6269';
	}else{
		bgColor = '#9aa9ab';
	}
	if(experimentInstructorFileFormatPath=='' && experimentInstructorFilePath==''){
		$("#instructor").append("该实验暂未分配实验指导书,请浏览其他资源。");
	}else{
		var content="";
		if(experimentInstructorFileFormatPath=='' || experimentInstructorFileFormatPath ==null){
			content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
			'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
			'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
			'<a onclick=downLoad('+experimentInstructorFileId+') class="btn mt-40" style="margin-top:100px;background:'+bgColor+';color:#fff;" title="下载资源 ">'+
	  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
		}else{
			//newFlexPaper('instructor',RESOURCE_WAY+experimentInstructorFileFormatPath);//url:实验指导书的路径
			//content='<li class="documentResoures-changeBox-content hide"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+RESOURCE_WAY+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div></li>';
			if(experimentInstructorFileFormatPath=='' || experimentInstructorFileFormatPath ==null){
				content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
				'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
				'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
				'<a onclick=downLoad('+experimentInstructorFileId+') class="btn mt-40" style="margin-top:100px;background:'+bgColor+';color:#fff;" title="下载资源 ">'+
		  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
			}else{
				//newFlexPaper('instructor',RESOURCE_WAY+experimentInstructorFileFormatPath);//url:实验指导书的路径
				//content='<li class="documentResoures-changeBox-content hide"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+RESOURCE_WAY+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div><>';
				var type = experimentInstructorFileFormatPath.substr(experimentInstructorFileFormatPath.lastIndexOf(".")+1);
				if(type=='html'){
					//html
					content='<li class="documentResoures-changeBox-content"><div style="width:720px;height:400px;margin: 0 auto;padding-bottom:10px"><iframe src="'+resource_way+'/'+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div></li>';
				}else if(type=='swf'){//swf
					newFlexPaper('instructor',resource_way+'/'+experimentInstructorFileFormatPath);//url:实验指导书的路径
				}else{
					content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
					'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
					'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
					'<a onclick=downLoad('+experimentInstructorFileId+')class="btn mt-40" style="margin-top:100px;background:'+bgColor+';color:#fff;" title="下载资源 ">'+
			  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
				}
			}
		}
		$("#instructor").append(content);
	}
}

$('.stepContain').eq(0).css('display','block');

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
	wordlimit('otherCourseTeacherList',10,0);
	initInstructor();
	$('.stepContain').each(function(index){
		if(index==0){
			$('.stepContain').eq(index).show();
		}
	})
})