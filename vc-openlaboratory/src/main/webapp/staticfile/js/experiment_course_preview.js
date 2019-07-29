var imgArr = new Array(),
	swfArr = new Array(),
	flvArr = new Array(),
	otherArr = new Array();
//initInstructor();
imgPartInit();
swfPartInit();
flvPartInit();
otherPartInit();
//wordlimit
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

function cutUrl(str){
	var a;
	if(str.length!=0){
		var str = str.substring(1,str.length-1);
		a = str.split(', ');
		for(var i=0;i<a.length; i++){
			if(a[i].substring(0,1) == " "){
				a[i]=a[i].substring(1,a[i].length);
			}
			if(a[i].substring(a[i].length-1,a[i].length)==" "){
				a[i]=a[i].substring(0,a[i].length-1);
			}
		}
	}else{
		a = '';
	}
	return a;
}

function cutFileName(arr){
	var a = new Array();
	for(var i=0;i<arr.length;i++){
		var s = arr[i].lastIndexOf('/');
		var e = arr[i].lastIndexOf('.');
		a.push(RESOURCE_WAY+arr[i].substring(s+1,e));
		
	}
	return a;
}

/*function initInstructor(){
	if(experimentInstructorFileFormatPath=='' && experimentInstructorFilePath==''){
		$("#instructor").append("该实验暂未分配实验指导书,请浏览其他资源。");
	}else{
		var content="";
		if(experimentInstructorFileFormatPath=='' || experimentInstructorFileFormatPath ==null){
			content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
			'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
			'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
			'<a href="'+RESOURCE_WAY+'/'+experimentInstructorFilePath+'" class="btn mt-40" style="margin-top:100px;background:#1e6269;color:#fff;" title="下载资源 ">'+
	  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
		}else{
			//newFlexPaper('instructor',RESOURCE_WAY+experimentInstructorFileFormatPath);//url:实验指导书的路径
			content='<li class="documentResoures-changeBox-content checked"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+RESOURCE_WAY+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div></li>';
		}
		$("#instructor").append(content);
	}
}*/

function otherPartInit(){
	var a = cutUrl(others);
	var content='';
	if(a!=''){
		for(var i=0;i<a.length;i++){
			if(a[i]!=''){
				/*不明白所有？有知道告知？xls 干嘛去掉 s 成为 xl 导致不能下载
				 * otherArr.push(RESOURCE_WAY+a[i].replace(/(^s*)|(s*$)/g,""));*/
				otherArr.push(RESOURCE_WAY+a[i]);
			}
		}
		for(var i = 0;i<otherArr.length;i++){
			content += '<li class="otherResourceEach"><a href="'+otherArr[i]+'">点击下载</a></li>';
		}
	}else{
		content ='<li class="otherResourceEach">暂无其他资源可供下载!</li>'; 
	}
	$(".otherResourcePart").append(content);
}

function imgPartInit(){
	var a = cutUrl(img);
	var content='';
	if(a!=''){
		for(var i=0;i<a.length;i++){
			if(a[i]!=''){
				imgArr.push(RESOURCE_WAY+a[i].replace(/(^s*)|(s*$)/g, ""));
			}
		}
		for(var i = 0;i<imgArr.length;i++){
			if(i==0){
				content += '<li class="imgResourceNavsEach imgResourceHover"><img src="'+imgArr[i]+'" alt=""></li>';
			}else{
				content += '<li class="imgResourceNavsEach"><img src="'+imgArr[i]+'" alt=""></li>';
			}
		}
	}else{
		content ='<p class="fs-14 pd-20">暂无图片资源可供预览,请添加图片资源!</p>'; 
		$('.imgBox').html(content);
		return false;
	}
	$(".imgResourceNav").append(content);
}
function newFlexPaper(cname,url) {
	var width = 680;
	var height = 450;
	$("#"+cname).css("width", width+width*(1/32)+ "px");
	$("#"+cname).css("height", height + "px");
	//$("#"+cname).css("padding-left", width * 0.03 + "px");
	$("#"+cname).css({"display":"block","margin":"10px auto 0"});
	var fp = new FlexPaperViewer(realPath+'/staticfile/document/FlexPaperViewer',
		cname,{
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
//js 去除所有空格，若需要去除所有空格 设置第二个参数为g
function Trim(str){ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

function swfPartInit(){
	var a = cutUrl(swf);
	// var b = cutFileName(a);
	var content='';
	var content1='';
	var idPathList = [];
	if(a==''){
		content='<p class="fs-14  pd-20">暂无文档资源可供预览，请添加文档资源!</p>'
		$(".documentResources").html(content);
	}else{
		for(var i=0;i<a.length;i++){
			swfArr.push(Trim(a[i]));
		}
		var b = new Array();
		for(var i = 0;i<swfArr.length;i++){
			b.push(i+1);
			//判断后缀
		    var fileType=swfArr[i].substr(swfArr[i].lastIndexOf(".")+1);
		    var url = RESOURCE_WAY+"/"+swfArr[i].substr(0,swfArr[i].length-1);
			if(fileType == 'swf1'){
				//原先是swf文件
				content += '<li class="documentResoures-changeBox-content';
				if(i!=0){
					content+=' hide ';
				}
				content += '"><div style="z-index:1px;margin-top:10px;"><object style="display:block;margin:0 auto;" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="650" height="400" >'+
				' <param name="movie" value="'+url+'">'+  
						'<param name="quality" value="high">'+ 
						'<param name="play" value="true">'+ 
						'<param name="LOOP" value="false">'+ 
						'<embed wmode="transparent" src="'+url+'" width="650" height="400" play="true" loop="false" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">'+ 
						'</embed>'+
						'</object></div></li>';
			}else if(fileType == 'swf2'){
				//office类型
				if(i==0){
					content+='<li class="documentResoures-changeBox-content checked"><div class="resourceContent" id="swf_'+i+'"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="650" height="400" ><param name="movie" value="'+url+'"><param name="quality" value="high"><param name="play" value="true"><param name="LOOP" value="false"><embed ></embed></object></div><p></p></li>';
				}else{
					content+='<li class="documentResoures-changeBox-content hide"><div  class="resourceContent" id="swf_'+i+'"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="650" height="400" ><param name="movie" value="'+url+'"><param name="quality" value="high"><param name="play" value="true"><param name="LOOP" value="false"><embed></embed></object></div><p></p></li>';
				}
				var idPath = new Object();
				idPath.id = 'swf_'+i;
				idPath.path = url;
				idPathList.push(idPath);
			}else if(fileType == 'html4'){
				if(i==0){
					content+='<li class="documentResoures-changeBox-content checked"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+url+'" style="width:100%;height:100%;"/><div></li>';
				}else{
					content+='<li class="documentResoures-changeBox-content hide"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+url+'" style="width:100%;height:100%;"/></div></li>';
				}	
			}else if(fileType == 'pdf3'){
				//html
				var explorer = window.navigator.userAgent.toLowerCase() ;
		    	if(explorer.indexOf("chrome") >= 0){
		    		if(i!=0){
		    			content+='<li class="documentResoures-changeBox-content hide"><div style="width:700px;height:auto;position:relative;margin:0 auto;"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="700px" height="400px" style=""><div style="width:682px;position:absolute;right:18px;top:0;height:55px;background:#525659;"></div></div></li>'; 
					}else{
						content+='<li class="documentResoures-changeBox-content checked"><div style="width:700px;height:auto;position:relative;margin:0 auto;"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="700px" height="400px" style=""><div style="width:682px;position:absolute;right:18px;top:0;height:55px;background:#525659;"></div></div></li>'; 
					}
		    	}
		    	else if(explorer.indexOf("firefox") >= 0){
		    		if(i!=0){
		    			content+='<li class="documentResoures-changeBox-content hide"><div style="width:700px;height:auto;margin-left:-10px;position:relative;margin:0 auto"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="700px" height="400px" style=""><div style="width:40px;position:absolute;right:0;top:0;height:30px;background:#454545;"></div></div></li>'; 
		    		}else{
		    			content+='<li class="documentResoures-changeBox-content checked"><div style="display:none;width:700px;height:auto;margin-left:-10px;position:relative;margin:0 auto"><embed id="pdfPlayer" src="'+url+'" type="application/pdf" width="700px" height="400px" style=""><div style="width:40px;position:absolute;right:0;top:0;height:30px;background:#454545;"></div></div></li>'; 
		    		}
		    	}
		    	else{
		    		content+='<li class="documentResoures-changeBox-content ';
		    		if(i!=0){
						content+=' hide" ';
					}else{
						content+=' checked"';
					}
		    		content+='><object classid="clsid:CA8A9780-280D-11CF-A24D-444553540000" width="800" height="1050" border="0" style="margin-left:-10px;margin: 0 auto;">'+ 
			    	'<param name="_Version" value="65539">'+  
			    	'<param name="_ExtentX" value="20108">'+  
			    	'<param name="_ExtentY" value="10866">'+  
			    	'<param name="_StockProps" value="0">'+  
			    	'<param name="SRC" value="'+url+'">'+  
			    	'</object></li>'; 
		    	}
			}
			if(i==0){
				content1 += '<li class="docResourceNavEach  checked"><span class="resourceOrderNavEachP">文档'+b[i]+'</span></li>';
			}else{
				content1 += '<li class="docResourceNavEach "><span class="resourceOrderNavEachP">文档'+b[i]+'</span></li>';
			}
		}
	}
	$(".docResourceShow").append(content);
	$('.docResourceNav').append(content1);
	for(var i = 0 ;i<idPathList.length;i++){
		newFlexPaper(idPathList[i].id,idPathList[i].path);
	}
	//绑定监听事件
	$(".docResourceNav  li span").each(function(i){
		$(this).click(function(){
			$(".documentResoures-changeBox-content:eq(" + i + ")").show().siblings(".documentResoures-changeBox-content").hide();
		})
	});
}

function flvPartInit(){
	var a = cutUrl(flv);
	var b = cutFileName(a);
	var content='';
	var content1='';
	var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
	if(a!=''){
		for(var i=0;i<a.length;i++){
			if(a[i]!=''){
				flvArr.push(RESOURCE_WAY+a[i]);
			}
		}
		for(var i = 0;i<flvArr.length;i++){
			var flashvars = {f:encodeURI(encodeURI(flvArr[i])),c:0,s:0};
			if(i==0){
				content='<li class="eachVideoResourceShow checked"><div class="resourceContent"><div id="videoBox'+i+'" style="padding:10px 15px 0;"></div></div><p></p></li>';
				content1 = '<li class="videoResourceNavEach checked"><span class="resourceOrderNavEachP">视频'+(i+1)+'</span></li>';
			}else{
				content='<li class="eachVideoResourceShow"><div class="resourceContent"><div id="videoBox'+i+'" style="padding:10px 15px 0;"></div></div><p></p></li>';
				content1 = '<li class="videoResourceNavEach"><span class="resourceOrderNavEachP">视频'+(i+1)+'</span></li>';
			}
			$(".videoResourceShowPart").append(content);
			$('.videoResourceNav').append(content1);
			var box = 'videoBox'+i,
				player = 'ckplayer_a'+i;
			CKobject.embedSWF(realPath+'/staticfile/js/ckplayer/ckplayer.swf',box,player,'738','450',flashvars,params);
		}
	}else{
		content ='<p class="fs-14 pd-20">暂无视频资源可供预览,请添加视频资源!</p>'; 
		$('.videoResourceShowPart').append(content);
	}
}

function showPic(){
	var src = $(".imgResourceHover").children('img').attr('src');
	$(".showPic").children('img').attr('src',src);
}

showPic();

//图册
var unit,size,bw;
unit = "px";
size =80;
bw = 8;
var k = 0;
var le=0;

$(".imgDetailPrevBtn").off().on('click',function(){
	if($('.imgResourceNavsEach').length>bw){
		casepre();
		k--;
	}
});

$(".imgDetailNextBtn").off().on('click',function(){
	if($('.imgResourceNavsEach').length>bw){
		casenext();
		k++;
	}
});

function casepre(){	
	var z=k;
	if(z<=1){
		z=0;
		le=0;
		k=0;
	}
	else{
		le = le+size;
	}
	// $(".casePic").css('margin-top',le+unit);
	$(".imgResourceNav").stop(true,true).animate({marginLeft:le+unit});
}

function casenext(){		
	var j=k;
	if(j>=$(".imgResourceNavsEach").length-(bw+1)){
		le = -($(".imgResourceNavsEach").length-bw)*size;
		k=$(".imgResourceNavsEach").length-(bw+1);
	}
	else{
		le = le -size;
	}
	// $(".casePic").css('margin-top',le+unit);
	$(".imgResourceNav").animate({marginLeft:le+unit});
}


$(".imgResourceNavsEach").each(function(index){
	$('.imgResourceNavsEach').eq(index).on('click',function(){
		$(this).css('border','5px solid #0569a2').addClass('imgResourceHover');
		$(this).siblings().css('border','5px solid #ccc').removeClass('imgResourceHover');
		showPic();
	});

	$('.imgResourceNavsEach').eq(index).hover(function(){
		$(this).css('border','5px solid #0569a2').addClass('imgResourceHover');
		$(this).siblings().css('border','5px solid #ccc').removeClass('imgResourceHover');
		showPic();
	})
});

$('.resourceChangeNav li').each(function(index){
	var i = index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$('.resourceChangeBox').eq(i).addClass('checked');
		$('.resourceChangeBox').eq(i).siblings().removeClass('checked');
	})
})

$('.questionNav1 li').each(function(index){
	var i =index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$(this).parent().siblings().children('li').eq(index).addClass('checked');
		$(this).parent().siblings().children('li').eq(index).siblings().removeClass('checked');
	})
})

$('.questionNav2 li').each(function(index){
	var i =index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$(this).parent().siblings().children('li').eq(index).addClass('checked');
		$(this).parent().siblings().children('li').eq(index).siblings().removeClass('checked');
	})
})

$('.videoResourceNavEach').each(function(index){
	var i = index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$('.eachVideoResourceShow').eq(i).addClass('checked');
		$('.eachVideoResourceShow').eq(i).siblings().removeClass('checked');
	})
})

$('.docResourceNavEach').each(function(index){
	var i = index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$('.eachDocResourceShow').eq(i).addClass('checked');
		$('.eachDocResourceShow').eq(i).siblings().removeClass('checked');
	})
})
