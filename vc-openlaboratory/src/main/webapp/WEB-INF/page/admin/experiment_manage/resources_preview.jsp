<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>
<![endif]-->
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css" />


<title>资源预览</title>
<style>
.bg-size{
	font-size:100px;
	color:#cccccc;
}
</style>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/ckplayer/ckplayer.js" charset="utf-8"></script>
<script type="text/javascript" src="${ctx}/staticfile/lib/flexpaper/flexpaper_flash.js"></script>
<script type="text/javascript" src="${ctx}/staticfile/lib/flexpaper/flexpaper_flash_debug.js"></script> 
</head>
<body>
<!-- <nav class="breadcrumb"> <i class="Hui-iconfont">&#xe67f;</i> 首页
	<span class="c-gray en">&gt;</span>资源预览 
	<a class="btn btn-success radius r"
		style="line-height: 1.6em; margin-top: 3px"
		href="javascript:location.replace(location.href);" title="刷新">
		<i class="iconfont icon-shuaxin"></i>
	</a>
</nav> -->
<div class="page-container clearfix" align="center">
	<div class="titles">
		<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
			<p>
				<b><img id="img" src=""></b>
				<span title="资源标题" class="f-24" id="resource-name"></span>
			</p>
			<p>
				<span title="作者"><i class="iconfont icon-yonghuming3 c-999" style="margin-right:5px;"></i><span id="name"></span></span>&nbsp;<span class="c-999">丨</span>
				<span title="所属院系"><i class="iconfont icon-denglu_suoshuyuanxi c-999" style="margin-right:5px;"></i><span id="college"></span></span>&nbsp;<span class="c-999">丨</span>
				<span title="所属资源库"><i class="iconfont icon-ziyuan3 c-999" style="margin-right:5px;"></i><span id="resource"></span></span>&nbsp;<span class="c-999">丨</span>
				<span title="收藏量"><i class="Hui-iconfont">&#xe680;</span><span id="collection"></i><span id="collection"></span></span>&nbsp;<span class="c-999">丨</span>
				<span title="下载量"><i class="iconfont icon-download1"></i><span id="download"></span></span>
			</p>
		</div>
	<div style="clear:both;"></div>
	<div class="contents cl">
		<!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
			
		</div> -->
		<div id="content" class="myContentDiv">
		</div>
		<!-- <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">
		
		</div> -->
	</div>
</div>
</div>



<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->

<script type="text/javascript">
	var fileId ="${param.id}";
	console.log("-------${param.id}")
	//文件路径
	var filePath="";
	var fileType;
	/* 根据文件类型打开 */
	var isLink=2;//1是链接，2不是链接
	//${cookie.RESOURCE_URL.value}/fileController/selectFileByFileId/
 	$.getJSON("${cookie.RESOURCE_URL.value}/fileController/selectFileByFileId/"+fileId+"?callback=?",function(sysresult){
 		console.log(1111111111);
 		
		if(sysresult.status == 200){
			var fileName=sysresult.data.file.fileTitle;
			var authorname=sysresult.data.file.author.name;
			//这个不一定有资源库，有可能是其他平台上传的资源
			var libraryName="";
			if(sysresult.data.file.resourceLibrary != null)
				libraryName=sysresult.data.file.resourceLibrary.libraryName;
			else{
				libraryName="其他资源库";
			}
			if(sysresult.data.file.fileFormatPath != null){
				 filePath=sysresult.data.file.fileFormatPath;
			 }else if(sysresult.data.file.filePath != null){
				 filePath=encodeURI(sysresult.data.file.filePath);
			 }else if(sysresult.data.file.link != null){
				 isLink=1;
			 }
				
			if(sysresult.data.file.author.department != null)
				$('#college').html(sysresult.data.file.author.department.name);
				
			//下载量
			if(sysresult.data.file.downloadNum == null || sysresult.data.file.downloadNum == "")
				$('#download').html("0");
			else
				$('#download').html(sysresult.data.file.downloadNum);
				
				
			//收藏量
			if(sysresult.data.collectedCount == null || sysresult.data.collectedCount == "")
				$('#collection').html("0");
			else
				$('#collection').html(sysresult.data.collectedCount);
				
				
				
		 	if(filePath!=null){
		    	fileType=filePath.substr(filePath.lastIndexOf(".")+1);
		    } 
		    var url ='${cookie.RESOURCE_WAY.value}/'+filePath;
				$('#resource-name').html(fileName);
			    $('#name').html(authorname); 
				$('#resource').html(libraryName);
		    var content="";
			if(isLink==2){
				if(sysresult.data.file.isExist==1){
			    	if(fileType=='jpg' || fileType=='png' || fileType=='jpeg' || fileType=='bmp' || fileType=='gif'){
						content='<div style="width:700px;margin-left:-10px;"><img src="'+url+'" style="display: block;width: 100%;" /></div>';
						$("#content").append(content);
					  }
					else if(fileType=='flv'){
						content='<div class="flv" style="margin: 0 auto;"><div id="a1"></div></div>';
						$("#content").append(content);
						url = encodeURI(encodeURI(url));
			   			var flashvars={
			       		    f:url,
			         		 c:0
			   				   };
			   			var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
			    			CKobject.embedSWF('${ctx}/staticfile/lib/ckplayer/ckplayer.swf','a1','ckplayer_a1','700','400',flashvars,params);
						$("#a1 object").css({'margin':'0 auto','display':'block'});
				 	}
					else if(fileType=='swf'){
						var resourceFile=sysresult.data.file.filePath;
						var resourceFileType="";
						if(resourceFile!=null){
							resourceFileType=resourceFile.substr(resourceFile.lastIndexOf(".")+1);
					    } 
						if(resourceFileType == 'swf'){
							content='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="700" height="400" >'+
							' <param name="movie" value="'+url+'">'+  
									'<param name="quality" value="high">'+ 
									'<param name="play" value="true">'+ 
									'<param name="LOOP" value="false">'+ 
									'<embed style="margin-left:-10px;" src="'+url+'" width="700" height="400" play="true" loop="false" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">'+ 
									'</embed>'+
									'</object>';
							$("#content").append(content);
						}else{
							content='<div id="swf_id"></div>';
							$("#content").append(content);
							newFlexPaper("swf_id",url);
						}		
					}else if(fileType == 'html'){
						content = '<li class="documentResoures-changeBox-content checked"><div style="width:670px;height:410px;margin: 0 auto;padding-bottom:10px"><iframe src="'+url+'" style="width:100%;height:100%;"/><div></li>';
						$("#content").append(content);
					}
					else if(fileType=='pdf'){
				    
				    	 var explorer = window.navigator.userAgent.toLowerCase() ;
				    	if(explorer.indexOf("chrome") >= 0){
				    		 content='<div style="width:700px;height:auto;margin-left:-10px;position:relative;margin:0 auto;"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="700px" height="400px" style=""><div style="width:682px;position:absolute;right:18px;top:0;height:55px;background:#525659;"></div></div>'; 
				    		 $("#content").append(content);
				    	}
				    	else if(explorer.indexOf("firefox") >= 0){
				    		 content='<div style="width:700px;height:auto;margin-left:-10px;position:relative;margin:0 auto"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="700px" height="400px" style=""><div style="width:40px;position:absolute;right:0;top:0;height:30px;background:#454545;"></div></div>'; 
				    		 $("#content").append(content);
				    	}
				    	else{
				    		
		 			    	content='<object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" width="800" height="1050" border="0" style="margin-left:-10px;">'+ 
					    	'<param name="_Version" value="65539">'+  
					    	'<param name="_ExtentX" value="20108">'+  
					    	'<param name="_ExtentY" value="10866">'+  
					    	'<param name="_StockProps" value="0">'+  
					    	'<param name="SRC" value="'+url+'">'+  
					    	'</object>'; 
		 			    	$("#content").append(content);
				    	}
				    }
				    else{
				    	content='<div class="text-c" style="padding:100px 0px;width:80%;height:400px;background-color:#e6e6e6;">'+
							'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
							'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后观看..</h3>'+
							'<a href="${cookie.RESOURCE_URL.value}/fileController/downloadFile2/${param.id}" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="下载资源 " onClick="">'+
					  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
						$("#content").append(content);
				    }
			    }else{
			    	content='<div class="text-c" style="padding:100px 0px;width:80%;height:400px;background-color:#e6e6e6;">'+
					'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
					'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后观看..</h3>'+
					'<a href="${cookie.RESOURCE_URL.value}/fileController/downloadFile2/${param.id}" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="下载资源 " onClick="">'+
			  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
					$("#content").append(content);
			    }
			}else{
				var link = '';
	    		 if(sysresult.data.file.link.indexOf("https://")!=-1 ||sysresult.data.file.link.indexOf("http://")!=-1 ){
	    			 link = sysresult.data.file.link;
	    		 }else{
	    			 link = 'https://'+sysresult.data.file.link;
	    		 }
	    		 content='<div class="text-c" style="padding:100px 0px;width:80%;height:400px;background-color:#e6e6e6;">'+
					'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
					'<h3 class="lh-30 c-warning">该资源是链接资源！</br>请点击跳转..</h3>'+
					'<a  href="'+link+'" class="btn radius btn-secondary size-XL mt-40" style="margin-top:100px;" title="链接跳转" target="_blank">'+
			  	    '<i class="iconfont icon-download1"></i>立即跳转</a>'+'</div>';
				$("#content").append(content);
			}
		}
 	}); 
	//选中灰色
	function a(obj,a,a){
		layer.msg('这是您的文件',{icon:1,time:1000});
	}

	
	function newFlexPaper(cname,url) {
		var width = 800;
		var height = 650;
		$("#"+cname).css("width", width * 0.94 + "px");
		$("#"+cname).css("height", height + "px");
		$("#"+cname).css("padding-left", width * 0.03 + "px");
		$("#"+cname).css("display", "block");
		var fp = new FlexPaperViewer('${ctx}/staticfile/document/FlexPaperViewer',
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
		}
	
</script>
</body>
</html>