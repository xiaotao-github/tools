var fileId = '',
	filePath = '',
	fileType = '',
	isLink = 2;
var ctxA=ctx;
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
	$.getJSON(ctx+"/studentController/previewList/"+resourcefileId+'/'+experimentId,function(sysresult){
		if(sysresult.status == 200){
			//资源标题
			var fileName=sysresult.data.resourceFileList[0].fileName;
			$('.resourceName').html(fileName);
			//所属实验
			var experimentName=sysresult.data.experimentList.experimentName;
			$('.experimentName').html(experimentName);
			//实验老师
			var author=sysresult.data.experimentList.author.name;
			$('.author').html(author);
			//资源介绍
			var filePresentation=sysresult.data.resourceFileList[0].filePresentation;
			$('.filePresentation').html(filePresentation);
			//上传时间
			var createTime=sysresult.data.resourceFileList[0].createTime;
			// 比如需要这样的格式 yyyy-MM-dd hh:mm:ss
			var date = new Date(createTime);
			Y = date.getFullYear() + '-';
			M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			D = date.getDate() + ' ';
			h = date.getHours() + ':';
			m = date.getMinutes() + ':';
			s = date.getSeconds(); 
			//console.log(Y+M+D+h+m+s); 
			var createTimeString = Y+M+D+h+m+s;
			$('.createTime').html(createTimeString);
			
			//上传作者
			var authorname=sysresult.data.thif.name;
			$('.resourceAuthor').html(authorname);
			//获取该资源是否能下载：1.允许下载；2.不允许下载
			var isDownload=sysresult.data.resourceFileList[0].isDownload;
			//所属资源库 **
			/*var libraryName="";
			if(sysresult.data.reslibrary.libraryName != null)
				libraryName=sysresult.data.reslibrary.libraryName;
			else{
				libraryName="其他资源库";
			}
			$('#resource').html(libraryName);*/

			//资源路径
			if(sysresult.data.resourceFileList[0].fileFormatPath != null){
				filePath=sysresult.data.resourceFileList[0].fileFormatPath;//预览路径(转格式后的路径)
			}else if(sysresult.data.resourceFileList[0].filePath != null){
				filePath=encodeURI(sysresult.data.resourceFileList[0].filePath);//原文件路径
			}else if(sysresult.data.resourceFileList[0].link != null){
				isLink=1;//资源类型 1:链接 2:资源
			}
			//var url ='${cookie.RESOURCE_WAY.value}/'+filePath;//显示路径
			var url =srcUrl+'/'+filePath;//显示路径
			
			//所属学院 **
			if(sysresult.data.dep.name != null){
				$('#college').html(sysresult.data.dep.name);
			}

			//下载量
			if(sysresult.data.resourceFileList[0].downloadNum == null || sysresult.data.resourceFileList[0].downloadNum == ""){
				$('.downloadNum').html("0");
			}else{
				$('.downloadNum').html(sysresult.data.resourceFileList[0].downloadNum);
			}

			//收藏量 **
			if(sysresult.data.rescount == null || sysresult.data.rescount == ""){
				$('#collection').html("0");
			}else{
				$('#collection').html(sysresult.data.rescount.collectedCount);
			}
			var fileType=sysresult.data.resourceFileList[0].fileType;
			//资源格式
			if(filePath!=null){
		    	fileType=filePath.substr(filePath.lastIndexOf(".")+1);
		    	$('.resourceType').html(fileType);
		    }
			//去掉下载按钮
			/*if(isDownload==1){
				${'#isDownload'}.html('');
			}*/
		    //资源预览
		    var content = '';
		    if(isLink==2){//资源文件
		    	if(sysresult.data.resourceFileList[0].isExist==1){//源文件是否存在
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
		    			CKobject.embedSWF(ctx+'/staticfile/lib/ckplayer/ckplayer.swf','a1','ckplayer_a1','758','500',flashvars,params);
						$("#a1 object").css({'margin':'0 auto','display':'block'});
				 	}
				 	else if(fileType=='swf'){
				 		//swf
						var resourceFile=sysresult.data.resourceFileList[0].filePath;//原文件路径
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
				    	var button = '';
				    	/*if(isDownload == 1){		*/		    		
				    		button = '<a onclick="downLoad('+resourcefileId+')" class="btn radius  size-XL mt-40" style="margin-top:100px;" title="下载资源 " >';
				    	/*}else{
				    		button = '<a onclick="layer.msg(\'暂时不开放下载!\')" class="btn btn-default radius  size-XL mt-40" style="margin-top:100px;" title="下载资源 " >';
				    	}*/
				    	content='<div class="text-c" style="padding:100px 0px;width:100%;height:300px;background-color:#e6e6e6;">'+
				    			'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
				    			'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后观看..</h3>'+
				    			button+
				    			'<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
							/*'<a href="${cookie.RESOURCE_URL.value}/fileController/downloadFile2/${param.id}" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="下载资源 " onClick="">'+*/
							/*'<a href="'+dwurl+'" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="下载资源 " onClick="">'+*/

						$(".resourceBox").html(content);
				    }
		    	}else{//源文件不存在(可能被删除)
		    		var button = '';
		    		/*if(isDownload == 1){*/
		    			button = '<a  onclick="downLoad('+resourcefileId+')" class="btn radius  size-XL mt-40" style="margin-top:100px;" title="下载资源 ">';
		    		/*}else{
		    			button = '<a onclick="layer.msg(\'暂时不开放下载!\')" class="btn btn-default radius  size-XL mt-40" style="margin-top:100px;" title="下载资源 " >';		    			
		    		}
	    			con*/tent='<div class="text-c" style="padding:100px 0px;width:100%;height:300px;background-color:#e6e6e6;">'+
	    					'<i class="iconfont icon-buzhichileixing bg-size"></i>'+ 
	    					'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后观看..</h3>'+
	    					button+
	    					'<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
					$(".resourceBox").html(content);
		    	}
		    }else{//资源路径
	    		var link = '';
				if(sysresult.data.resourceFileList[0].link.indexOf("https://")!=-1 ||sysresult.data.resourceFileList[0].link.indexOf("http://")!=-1 ){
					link = sysresult.data.resourceFileList[0].link;
				}else{
					link = 'https://'+sysresult.data.resourceFileList[0].link;
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


function downLoad(id){
    //判断该文件是否存在
    $.ajax({
        type:'GET',
        dataType:'json',
        url:ctx+'/studentController/fileExistsById/'+id,
        success: function(sysresult){
            if(sysresult.status==200){
                //下载资源
                $('#fileId').val(id);
                $('#downLoadFile').submit();
                //获取下载量
                var num =$('.downloadNum').html()/1;
                num+=1;
                $('.downloadNum').html(num);
            }else{
                layer.msg(sysresult.msg,{icon:2,time:1500});
            }
        },
        error: function(data){
            console.log(data)
        }
    })
    
    
}


