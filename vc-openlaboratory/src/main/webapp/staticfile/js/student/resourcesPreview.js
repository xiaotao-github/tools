var fileId = '',
	filePath = '',
	fileType = '',
	isLink = 2;

function newFlexPaper(cname,url) {
	var width = 735;
	var height = 400;
	$("#"+cname).css("width", width * 0.94 + "px");
	$("#"+cname).css("height", height + "px");
	$("#"+cname).css("padding-left", width * 0.03 + "px");
	$("#"+cname).css("display", "block");
	var fp = new FlexPaperViewer(realPath+'/staticfile/document/FlexPaperViewer',
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

$(function(){
	$.getJSON(url,function(sysresult){
		if(sysresult.status == 200){
			//资源标题
			var fileName=sysresult.data.file.fileTitle;
			$('.resourceName').html(fileName);
			
			//上传作者
			var authorname=sysresult.data.file.author.name;
			$('.resourceAuthor').html(authorname);

			//所属资源库 **
			var libraryName="";
			if(sysresult.data.file.resourceLibrary != null)
				libraryName=sysresult.data.file.resourceLibrary.libraryName;
			else{
				libraryName="其他资源库";
			}
			$('#resource').html(libraryName);

			//资源路径
			if(sysresult.data.file.fileFormatPath != null){
				filePath=sysresult.data.file.fileFormatPath;//预览路径(转格式后的路径)
			}else if(sysresult.data.file.filePath != null){
				filePath=encodeURI(sysresult.data.file.filePath);//原文件路径
			}else if(sysresult.data.file.link != null){
				isLink=1;//资源类型 1:链接 2:资源
			}
			var url ='${cookie.RESOURCE_WAY.value}/'+filePath;//显示路径

			//所属学院 **
			if(sysresult.data.file.author.department != null){
				$('#college').html(sysresult.data.file.author.department.name);
			}

			//下载量
			if(sysresult.data.file.downloadNum == null || sysresult.data.file.downloadNum == ""){
				$('.downloadNum').html("0");
			}else{
				$('.downloadNum').html(sysresult.data.file.downloadNum);
			}

			//收藏量 **
			if(sysresult.data.collectedCount == null || sysresult.data.collectedCount == ""){
				$('#collection').html("0");
			}else{
				$('#collection').html(sysresult.data.collectedCount);
			}

			//资源格式
			if(filePath!=null){
		    	fileType=filePath.substr(filePath.lastIndexOf(".")+1);
		    	$('.resourceType').html(fileType);
		    }

		    //资源预览
		    var content = '';
		    if(isLink==2){//资源文件
		    	if(sysresult.data.file.isExist==1){//源文件是否存在
					if(fileType=='jpg' || fileType=='png' || fileType=='jpeg' || fileType=='bmp' || fileType=='gif'){
						//图片
						content='<div style="width:700px;"><img src="'+url+'" style="display: block;width: 100%;" /></div>';
						$(".resourceBox").html(content);
					}
					else if(fileType=='flv'|| fileType=='mp4' || fileType=='mov' ||fileType=='wmp'){
						//视频
						content='<div class="flv" style="margin: 0 auto;"><div id="a1"></div></div>';
						$(".resourceBox").html(content);
						url = encodeURI(encodeURI(url));
			   			var flashvars={
			       		    f:url,
			         		 c:0
			   				   };
			   			var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
		    			CKobject.embedSWF('${ctx}/staticfile/lib/ckplayer/ckplayer.swf','a1','ckplayer_a1','758','500',flashvars,params);
						$("#a1 object").css({'margin':'0 auto','display':'block'});
				 	}
				 	else if(fileType=='swf'){
				 		//swf
						var resourceFile=sysresult.data.file.filePath;//原文件路径
						var resourceFileType="";
						if(resourceFile!=null){
							resourceFileType=resourceFile.substr(resourceFile.lastIndexOf(".")+1);
					    } 
						if(resourceFileType == 'swf'){
							content='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="758" height="500" >'+
									' <param name="movie" value="'+url+'">'+  
									'<param name="quality" value="high">'+ 
									'<param name="play" value="true">'+ 
									'<param name="LOOP" value="false">'+ 
									'<embed style="margin-left:-10px;" src="'+url+'" width="758" height="500" play="true" loop="false" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">'+ 
									'</embed>'+
								'</object>';
							$(".resourceBox").html(content);
						}else{
							content='<div id="swf_id"></div>';
							$(".resourceBox").html(content);
							newFlexPaper("swf_id",url);
						}
					}
					else if(fileType == 'html'){
						content = '<div style="width:750px;height:500px;margin: 0 auto;padding-bottom:10px"><iframe src="'+url+'" style="width:100%;height:100%;"/><div>';
						$(".resourceBox").html(content);
					}
					else if(fileType=='pdf'){
				    	var explorer = window.navigator.userAgent.toLowerCase() ;
				    	if(explorer.indexOf("chrome") >= 0){
							content='<div style="width:758px;height:auto;margin-left:-10px;position:relative;margin:0 auto;"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="758px" height="500px" style=""><div style="width:662px;position:absolute;right:18px;top:0;height:55px;background:#525659;"></div></div>'; 
				    	}
				    	else if(explorer.indexOf("firefox") >= 0){
							content='<div style="width:758px;height:auto;margin-left:-10px;position:relative;margin:0 auto"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="758px" height="500px" style=""><div style="width:40px;position:absolute;right:0;top:0;height:30px;background:#454545;"></div></div>'; 
				    	}
				    	else{
		 			    	content='<object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" width="780" height="1050" border="0" style="margin-left:-10px;">'+ 
					    	'<param name="_Version" value="65539">'+  
					    	'<param name="_ExtentX" value="20108">'+  
					    	'<param name="_ExtentY" value="10866">'+  
					    	'<param name="_StockProps" value="0">'+  
					    	'<param name="SRC" value="'+url+'">'+  
					    	'</object>'; 
				    	}
						$(".resourceBox").html(content);
				    }
				    else{
				    	content='<div class="text-c" style="padding:100px 0px;width:80%;height:500px;background-color:#e6e6e6;">'+
							'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
							'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后观看..</h3>'+
							'<a href="${cookie.RESOURCE_URL.value}/fileController/downloadFile2/${param.id}" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="下载资源 " onClick="">'+
					  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
						$(".resourceBox").html(content);
				    }
		    	}else{//源文件不存在(可能被删除)
	    			content='<div class="text-c" style="padding:100px 0px;width:80%;height:500px;background-color:#e6e6e6;">'+
					'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
					'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后观看..</h3>'+
					'<a href="${cookie.RESOURCE_URL.value}/fileController/downloadFile2/${param.id}" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="下载资源 " onClick="">'+
			  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
					$(".resourceBox").html(content);
		    	}
		    }else{//资源路径
	    		var link = '';
				if(sysresult.data.file.link.indexOf("https://")!=-1 ||sysresult.data.file.link.indexOf("http://")!=-1 ){
					link = sysresult.data.file.link;
				}else{
					link = 'https://'+sysresult.data.file.link;
				}
				content='<div class="text-c" style="padding:100px 0px;width:80%;height:500px;background-color:#e6e6e6;">'+
				'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
				'<h3 class="lh-30 c-warning">该资源是链接资源！</br>请点击跳转..</h3>'+
				'<a  href="'+link+'" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="链接跳转" target="_blank">'+
				'<i class="iconfont icon-download1"></i>立即跳转</a>'+'</div>';
				$(".resourceBox").html(content);
		    }
		}else{
			layer.msg('找不到文件!');
		}
	});
})