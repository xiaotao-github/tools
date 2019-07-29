var imgArr = new Array(),
	swfArr = new Array(),
	flvArr = new Array(),
	otherArr = new Array();
initInstructor();//初始化实验指导书
imgPartInit();
swfPartInit();
flvPartInit();
otherPartInit();

wordlimit('noteText',75,0);
//newFlexPaper('instructor','document/swf.swf');


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
	
	function Trim(str){ 
	    return str.replace(/(^\s*)|(\s*$)/g, ""); 
	}
	
	function cutUrl(str){
		if(str!=null && str!='' && str.length!=0){
			var str = str.substring(1,str.length-1);
			if(str!=''){
				if(str.indexOf(',')!=-1){
					var a = str.split(',');
				}else{
					var a = new Array(str);
				}
			}else{
				a = '';
			}
			return a;
		}else{
			return '';
		}
	}

	function cutFileName(arr){
		var a = new Array();
		for(var i=0;i<arr.length;i++){
			var s = arr[i].lastIndexOf('/');
			var e = arr[i].lastIndexOf('.');
			a.push(arr[i].substring(s+1,e));
		}
		return a;
	}
	
	
	function newFlexPaper(cname,url) {
		var width = 757;
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

	function initInstructor(){
		if(experimentInstructorFileFormatPath=='' && experimentInstructorFilePath==''){
			$("#instructor").append("该实验暂未分配实验指导书,请浏览其他资源。");
		}else{
			if(experimentInstructorFileFormatPath=='' || experimentInstructorFileFormatPath ==null){
				var content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
				'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
				'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后观看..</h3>'+
				'<a href="'+RESOURCE_WAY+experimentInstructorFilePath+'" class="btn mt-40" style="margin-top:100px;background:#1e6269;color:#fff;" title="下载资源 ">'+
		  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
				$("#instructor").append(content);
			}else{
				//newFlexPaper('instructor',RESOURCE_WAY+experimentInstructorFileFormatPath);//url:实验指导书的路径
				var type = experimentInstructorFileFormatPath.substr(experimentInstructorFileFormatPath.lastIndexOf(".")+1);
				if(type=='html'){
					//html
					content='<li class="documentResoures-changeBox-content"><div style="width:700px;height:450px;margin: 0 auto;padding-bottom:10px"><iframe src="'+RESOURCE_WAY+experimentInstructorFileFormatPath+'" style="width:100%;height:100%;"/></div></li>';
				}else if(type=='swf'){//swf
					newFlexPaper('instructor',RESOURCE_WAY+experimentInstructorFileFormatPath);//url:实验指导书的路径
				}else{
					content='<div style="padding:100px 0px;height:200px;background-color:#e6e6e6;margin:0 auto;text-align:center;">'+
					'<i class="iconfont icon-buzhichileixing bg-size"></i>'+
					'<h3 class="lh-30 c-warning">该文件暂不支持在线预览！</br>请下载后浏览..</h3>'+
					'<a href="'+RESOURCE_WAY+experimentInstructorFilePath+'" class="btn mt-40" style="margin-top:100px;background:#1e6269;color:#fff;" title="下载资源 ">'+
			  	    '<i class="iconfont icon-download1"></i>立即下载</a>'+'</div>';
				}
			}
		}
	}

function imgPartInit(){
	var content='';
	var a = cutUrl(img);
	if(a==''){
		content='<p class="fs-20 fc-gray" style="display:table-cell;height:300px;vertical-align:middle;text-align:center;width:757px;">该实验未分配图片资源,请浏览其他资源。</p>'
		$(".imageResources").html(content);
	}else{
		for(var i=0;i<a.length;i++){
			imgArr.push(Trim(a[i]));
		}
		for(var i = 0;i<imgArr.length;i++){
			if(i==0){
				content += '<li class="casePicNav chapterDetailHover"><img src="'+RESOURCE_WAY+"/"+imgArr[i]+'" alt=""></li>';
			}else{
				content += '<li class="casePicNav"><img src="'+RESOURCE_WAY+"/"+imgArr[i]+'" alt=""></li>';
			}
		}
		$(".imgResources-nav").append(content);
	}
}

function swfPartInit(){
	var a = cutUrl(swf);
	// var b = cutFileName(a);
	var content='';
	var content1='';
	var idPathList = [];
	if(a==''){
		content='<p class="fs-20 fc-gray" style="display:table-cell;height:300px;vertical-align:middle;text-align:center;width:757px;">该实验下暂未分配知识点,请浏览其他资源。</p>'
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
		    var url = RESOURCE_WAY+swfArr[i].substr(0,swfArr[i].length-1);
			if(fileType == 'swf1'){
				//原先是swf文件
				content += '<li class="documentResoures-changeBox-content';
				if(i!=0){
					content+=' hide" ';
				}else{
					content+=' checked"';
				}
				content += '><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="700" height="400" >'+
				' <param name="movie" value="'+url+'">'+  
						'<param name="quality" value="high">'+ 
						'<param name="play" value="true">'+ 
						'<param name="LOOP" value="false">'+ 
						'<embed style="margin-left:-10px;" src="'+url+'" width="700" height="400" play="true" loop="false" quality="high" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash">'+ 
						'</embed>'+
						'</object></li>';
			}else if(fileType == 'swf2'){
				//office类型
				if(i==0){
					content+='<li class="documentResoures-changeBox-content checked"><div class="resourceContent" id="swf_'+i+'"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="700" height="400" ><param name="movie" value="'+url+'"><param name="quality" value="high"><param name="play" value="true"><param name="LOOP" value="false"><embed ></embed></object></div><p></p></li>';
				}else{
					content+='<li class="documentResoures-changeBox-content hide"><div  class="resourceContent" id="swf_'+i+'"><object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,16,0" width="700" height="400" ><param name="movie" value="'+url+'"><param name="quality" value="high"><param name="play" value="true"><param name="LOOP" value="false"><embed></embed></object></div><p></p></li>';
				}
				var idPath = new Object();
				idPath.id = 'swf_'+i;
				idPath.path = url;
				idPathList.push(idPath);
			}else if(fileType == 'html4'){
				if(i==0){
					content+='<li class="documentResoures-changeBox-content checked"><div style="width:670px;height:410px;margin: 0 auto;padding-bottom:10px"><iframe src="'+url+'" style="width:100%;height:100%;"/><div></li>';
				}else{
					content+='<li class="documentResoures-changeBox-content hide"><div style="width:670px;height:410px;margin: 0 auto;padding-bottom:10px"><iframe src="'+url+'" style="width:100%;height:100%;"/></div></li>';
				}	
			}else if(fileType == 'pdf3'){
				//pdf
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
				content1 = '<li class="resourceOrderNavEach checked"><p class="resourceOrderNavEachP">文档'+b[i]+'</p></li>';
			}else{
				content1 = '<li class="resourceOrderNavEach"><p class="resourceOrderNavEachP">文档'+b[i]+'</p></li>';
			}
			$('.documentResoures-changeBox').siblings(".documentResources-nav").append(content1);
		}
	}
	$(".documentResoures-changeBox").append(content);
	//绑定监听事件
	$(".documentResources-nav li p").each(function(i){
		$(this).click(function(){
			$(".documentResoures-changeBox-content:eq(" + i + ")").show().siblings(".documentResoures-changeBox-content").hide();
		})
	});
	for(var i = 0 ;i<idPathList.length;i++){
		newFlexPaper(idPathList[i].id,idPathList[i].path);
	}
}

function flvPartInit(){
	var a = cutUrl(flv);
	// var b = cutFileName(a);
	var content='';
	if(a==''){
		content='<p class="fs-20 fc-gray" style="display:table-cell;height:300px;vertical-align:middle;text-align:center;width:757px;">该实验暂未分配微视频,请浏览其他资源。</p>'
		$(".videoResources").html(content);
	}else{
		var content1='';
		var params={bgcolor:'#FFF',allowFullScreen:true,allowScriptAccess:'always',wmode:'transparent'};
		//var flashvars = new Array();
		for(var i=0;i<a.length;i++){
			flvArr.push(Trim(a[i]));
		}
		var b = new Array();
		for(var i = 0;i<flvArr.length;i++){
			var url = RESOURCE_WAY+"/"+flvArr[i];
			url = encodeURI(encodeURI(url));
			var a = {f:url,c:0};
			b.push(i+1);
			//flashvars.push(a);
			if(i==0){
				content='<dd class="eachVideo checked"><div id="videoBox'+i+'"></div><p></p></dd>';
				content1 = '<li class="resourceOrderNavEach checked"><p class="resourceOrderNavEachP">视频'+b[i]+'</p></li>';
			}else{
				content='<dd class="eachVideo"><div id="videoBox'+i+'"></div><p></p></dd>';
				content1 = '<li class="resourceOrderNavEach"><p class="resourceOrderNavEachP">视频'+b[i]+'</p></li>';
			}
			$(".videoResources-changeBox").append(content);
			$('.videoResources-changeBox').siblings(".videoResources-nav").append(content1);
			var box = 'videoBox'+i,
				player = 'ckplayer_a'+i;
			CKobject.embedSWF(realPath+'/staticfile/js/ckplayer/ckplayer.swf',box,player,'650','400',a,params);
		}
	}
}

function otherPartInit(){
	var content='';
	var a = cutUrl(other);
	if(a==''){
		content='<dd class="fs-20 fc-gray" style="display:table-cell;height:300px;vertical-align:middle;text-align:center;width:757px;">该实验暂无其他资源。</dd>'
		$(".otherResourcesBox").html(content);
	}else{
		for(var i=0;i<a.length;i++){
			otherArr.push(Trim(a[i]));
		}
		for(var i = 0;i<otherArr.length;i++){
			content += '<dd class=""><a href="'+RESOURCE_WAY+otherArr[i]+'">其他文件'+(i+1)+'</a></dd>';
		}
		$(".otherResourcesBox").append(content);
	}
}

function showPic(){
	var src = $(".chapterDetailHover").children('img').attr('src');
	$(".showPicDetail").children('img').attr('src',src);
}

showPic();

//图册
var unit,size,bw;
unit = "px";
size =90;
bw = 7;
var k = 0;
var le=0;

$(".imgDetailPrevBtn").off().on('click',function(){
	if($('.casePicNav').length>bw){
		casepre();
		k--;
	}
});

$(".imgDetailNextBtn").off().on('click',function(){
	if($('.casePicNav').length>bw){
		casenext();
		k++;
	}
});

function casepre(){	
	$('.imgDetailNextBtn').removeClass('stop');
	var z=k;
	if(z<=1){
		z=0;
		le=0;
		k=0;
		$('.imgDetailPrevBtn').addClass('stop');
	}
	else{
		le = le+size;
	}
	// $(".casePic").css('margin-top',le+unit);
	$(".imgResources-nav").stop(true,true).animate({marginLeft:le+unit});
}

function casenext(){
	$('.imgDetailPrevBtn').removeClass('stop');	
	var j=k;
	if(j>=$(".casePicNav").length-(bw+1)){
		le = -($(".casePicNav").length-bw)*size;
		k=$(".casePicNav").length-(bw+1);
		$(".imgDetailNextBtn").addClass('stop');
	}
	else{
		le = le -size;
	}
	// $(".casePic").css('margin-top',le+unit);
	$(".imgResources-nav").animate({marginLeft:le+unit});
}


$(".casePicNav").each(function(index){
	$('.casePicNav').eq(index).on('click',function(){
		$(this).css('border','5px solid #0569a2').addClass('chapterDetailHover');
		$(this).siblings().css('border','5px solid #eee').removeClass('chapterDetailHover');
		showPic();
	});

	$('.casePicNav').eq(index).hover(function(){
		$(this).css('border','5px solid #0569a2').addClass('chapterDetailHover');
		$(this).siblings().css('border','5px solid #eee').removeClass('chapterDetailHover');
		showPic();
	})
});


/*--------------------------------------多文件上传------------------------------------------*/ 


function plusFile(obj){
	var $obj = $(obj);
	var name = $obj.siblings('input').attr('name');
	var content = '<li class="pd-20 pdt-5 pdb-5 mrb-5"><input type="file" name ="'+name+'"/><span class="plus iconfont icon-plus fc-green" style="font-size:16px;" onclick="plusFile(this);"></span><span class="subtract iconfont icon-cut fc-red" style="font-size:16px;" onclick="subtractFile(this);"></span></li>';
	$obj.parents('.fileuploadPart').children('ul').append(content);
}

function subtractFile(obj){
	var $obj = $(obj);
	$obj.parent('li').remove();
}

function delFile(obj){
	var $obj = $(obj);
	var objId = $obj.parent('li').attr('fileId');
	// $.ajax({
	// 	url:'',
	// 	data: objId,
	// 	dataType:'json',
	// 	type:'POST',
	// 	success :function(data){
			$obj.parent('li').remove();
	// 	},
	// 	errror : function(data){

	// 	}
	// })
}

function previewFile(obj){
	var $obj = $(obj);
	var objurl = $obj.attr('url');
	if(objurl=='' || objurl == null){
		return ;
	}
	// $.ajax({
	// 	url:'',
	// 	data: objId,
	// 	dataType:'json',
	// 	type:'POST',
	// 	success :function(data){
			var a = objurl.indexOf('gif');
			var type = '';
			if(a!=-1){
				type = 'img';
			}else{
				type="other";
			}
			var previewContent;
			if(type=="img"){
				previewContent='<p style="width:100%;height:100%;"><img src="'+objurl+'" style="width:550px; height:400px;display:block;margin:25px auto"/></p>';
				$(".preViewDetail").html(previewContent);
			}else{
				previewContent='<div><p class="fs-24 " style="text-align:center;color:#999;padding-top:200px;"><i class="iconfont icon-diffcult fc-red pdr-10 fs-24" style="font-size:16px;"></i>该文件无法预览</p><p><a href="'+objurl+'" class="fs-16 fw-bold fc-darkGreen pdt-10" style="text-align:center;display:block;">下载</a></p></div>';
				$(".preViewDetail").html(previewContent);
			}
			var index = layer.open({
				type:1,
				content:$(".preViewDetail"),
				title:false,
				area:['600px','450px']
			});
	// 	},
	// 	errror : function(data){

	// 	}
	// })
}

$(".resourceNav li").each(function(index){
	var i = index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$(".resourceBoxList").children(".eachResourceBox").eq(i).show();
		$(".resourceBoxList").children(".eachResourceBox").eq(i).siblings().hide();
	})
})

$(".videoResources-nav li").each(function(index){
	var i = index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$(this).parent().siblings(".videoResources-changeBox").children("dd").eq(i).addClass('checked');
		$(this).parent().siblings(".videoResources-changeBox").children("dd").eq(i).siblings().removeClass('checked');
	})
})

$(".documentResources-nav li").each(function(index){
	var i = index;
	$(this).off().on('click',function(){
		$(this).addClass('checked');
		$(this).siblings().removeClass('checked');
		$(this).parent().siblings(".documentResoures-changeBox").children("dd").eq(i).addClass('checked');
		$(this).parent().siblings(".documentResoures-changeBox").children("dd").eq(i).siblings().removeClass('checked');
	})
})
//初始化实验报告
$('.fileuploadPart').hide();
$('.filecontrolPart').css({'margin':0,'border':'1px solid #ccc','width':'100%'});
$('.filecontrolPart').find('.icon-del').remove();
$('.report-submitPart').remove();

function report2World(experimentName,submitStatus){
	if(submitStatus==1||submitStatus==4){
		var ue = UE.getEditor('report-editor',{
			toolbars: [[
            'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', 'attachment', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', 'mergecells', 'mergeright', 'mergedown', '|', 'preview'
	        ]],
	        autoHeightEnabled: false,initialFrameHeight:550,initialFrameWidth:780
		});
		var invitationContent = $('.stuInfo').html()+ue.getContent()+'<div style="border:1px solid #ddd; margin-top:10px;padding:20px;"><p><span style="display:block;">教师评语：</span><span style="display:block;margin-top:10px;text-indent: 1em;">这里是教师评语的内容！这里是教师评语的内容！这里是教师评语的内容！这里是教师评语的内容！这里是教师评语的内容！</span></p></div>';
		$(".getReportDoc").html(invitationContent);
		$('.getReportDoc').find('.stuInfoTable').css({'text-align':'center','width':'100%','border':'1px solid #ddd','border-right':'none','border-bottom':'none','border-collapse':'collapse'}).children('tbody').children('tr').css({'height':'35px','padding':'0','border':'none'}).children('td').css({'text-align':'cneter','border':'1px solid #ddd','border-left':'none','border-top':'none','font-size':'14px'});
		$('.getReportDoc').find('.stuInfoTable').children('thead').remove();
		//$('.getReportDoc').find('.stuInfoTable').children('thead').css({'display':'none','height':'0','border':'none'}).children('th').css({'display':'none','height':'0','border':'none'});
		invitationContent = $('.getReportDoc').html();
		var form = $("<form>");   //定义一个form表单
		form.attr('style', 'display:none');   //在form表单中添加查询参数
		form.attr('target', '');
		form.attr('method', 'post');
		form.attr('action', realPath+'/submitExperimentFileWebController/report2World');
		/*实验报告  */
		var input1 = $('<input>');
		input1.attr('type', 'hidden');
		input1.attr('name', 'report');
		input1.attr('value', invitationContent);
		/*文件名称*/
		var input2 = $('<input>');
		input2.attr('type', 'hidden');
		input2.attr('name', 'fileName');
		input2.attr('value', '《'+experimentName+'》实验报告');
		$('body').append(form);  //将表单放置在web中
		form.append(input1);   //将查询参数控件提交到表单上
		form.append(input2);
		form.submit();
	}else{
		var invitationContent = $('.stuInfo').html()+$('.testCtrPart').html();
		$(".getReportDoc").html(invitationContent);
		$('.getReportDoc').find('.stuInfoTable').css({'text-align':'center','width':'100%','border':'1px solid #ddd','border-right':'none','border-bottom':'none','border-collapse':'collapse'}).children('tbody').children('tr').css({'height':'35px','padding':'0','border':'none'}).children('td').css({'text-align':'cneter','border':'1px solid #ddd','border-left':'none','border-top':'none','font-size':'14px'});
		$('.getReportDoc').find('.stuInfoTable').children('thead').remove();
		invitationContent = $('.getReportDoc').html();
		var form = $("<form>");   //定义一个form表单
		form.attr('style', 'display:none');   //在form表单中添加查询参数
		form.attr('target', '');
		form.attr('method', 'post');
		form.attr('action', realPath+'/submitExperimentFileWebController/report2World');
		/*实验报告  */
		var input1 = $('<input>');
		input1.attr('type', 'hidden');
		input1.attr('name', 'report');
		input1.attr('value', invitationContent);
		/*文件名称*/
		var input2 = $('<input>');
		input2.attr('type', 'hidden');
		input2.attr('name', 'fileName');
		input2.attr('value', '《'+experimentName+'》实验报告');
		$('body').append(form);  //将表单放置在web中
		form.append(input1);   //将查询参数控件提交到表单上
		form.append(input2);
		form.submit();
	}
}
