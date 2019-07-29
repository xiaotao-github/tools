var ue;

if(uploaded == 0){
	$('.reportUploaded').hide();
	initEditor();
}else{
	$('#reportForm').hide();
}

//删除笔记
function delNote(id,obj){
	layer.confirm('确定删除笔记？', {
	  btn: ['确定','取消'] //按钮
	}, function(index){
	  $.ajax({
		  type:'POST',
		  url:ctxUrl+'/studentController/delNoteById/'+id,
		  dataType:'JSON',
		  success: function(sysresult){
			  if(sysresult.status==200){
				  $(obj).parent('li').remove();
				  layer.msg('删除成功',{icon:1,time:1500});
				  var count = $('#experiment-note-ul').children('li').length;
				  if(count==0){
					  $('#experiment-note-ul').html('<li style="height:300px;"><img style="display:block;width:100%;height:100%;" src="'+ctx+'/staticfile/images/null.png"></li>');
				  }
			  }else{
				  layer.msg('删除失败',{icon:2,time:1500});
			  }
		  },
		  error: function(data){
			  
		  }
	  })
	});
}



function download(id){
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


function open_experimentNote(){
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        content: $('.experimentNote'),
        area: ['600px','auto']
    })
}


function showQRCode(){
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        content: $('.QRCode'),
        area: ['400px','auto']
    })
}

function showUploadGif_QR(){
    layer.open({
        type: 1,
        shade: false,
        title: false, //不显示标题
        content: $('.uploadGif_QR'),
        area: ['400px','auto']
    })
}

function showGif(){
	layer.open({
		type: 1,
		shade: false,
		title: false, //不显示标题
		content: $('.showImg'),
		area: ['400px','auto']
	})	
}

function showStudentReport(url,title){
	url = RESOURCE_WAY+url;
	layer.open({
		type:2,
		shade: false,
		title: title,
		content:url,
		area: ['800px','600px'],
		maxmin: true
	})	
}

function initEditor(){
		ue = UE.getEditor('reportEditor',{
		toolbars: [[
	    'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
	    ]],
	    autoHeightEnabled: false,initialFrameHeight:300,autoFloatEnabled:false
	});
}

$('.uploadGif-btn').children('input[name = subGifFile]').change(function(){
	var val = $(this).val();
	$('.uploadGif-path').children('input').val(val);
})

$('.uploadReport-btn').children('input[name = subProjectFile]').change(function(){
	var val = $(this).val();
	$('.uploadReport-path').children('#subProjectFile').val(val);
})

$('.resources-nav li').each(function(index){
	$('.resources-nav li').eq(index).on('click',function(){
		$(this).addClass('on').siblings('li').removeClass('on');
		$('.resources-list-each').eq(index).addClass('on').siblings('.resources-list-each').removeClass('on');
	})
})

$("#noteForm").Validform({
    btnSubmit:"#noteAddSubBtn",
    tiptype:2,
    ignoreHidden:false,
    dragonfly:false,
    tipSweep:false,
    label:".label",
    showAllError:false,
    postonce:true,
    ajaxPost:true,
    datatype:{

    },
    usePlugin:{
        swfupload:{},
        datepicker:{},
        passwordstrength:{},
        jqtransform:{
            selector:"select,input"
        }
    },
    beforeCheck:function(curform){
        //在表单提交执行验证之前执行的函数，curform参数是当前表单对象。
        //这里明确return false的话将不会继续执行验证操作;
    },
    beforeSubmit:function(curform){
        //在验证成功后，表单提交前执行的函数，curform参数是当前表单对象。
        //这里明确return false的话表单将不会提交;
    },
    callback:function(sysresult){
        if(sysresult.status==200){
        	layer.msg('保存成功!',{icon:1,time:1500});
        	$("#Validform_msg").css({'display':'none'});            
            var content =  sysresult.data.note.notesContent;
            var studentNotesId = sysresult.data.note.studentNotesId;
            var contentHtml = '<li class="note-each pd-5 mb-10 pos-r"><a href="javascript:void(0)" class="clearfix"><p class="date f-l"><span class="span1 c-white f-12">'+sysresult.data.yearMonth+'</span><span class="span2 fc-objBlue f-20">'+sysresult.data.date+'</span></p><p class="noteText">'+content+'</p></a><i class="Hui-iconfont Hui-iconfont-close2 f-16 c-red" onclick="delNote('+studentNotesId+',this);"></i></li>';
            var count = $('#experiment-note-ul').children('li').length;
            if(count==1 && !$('#experiment-note-ul li:eq(0)').hasClass('note-each')){
            	$("#experiment-note-ul").html('');
            }
            $("#experiment-note-ul").prepend(contentHtml);
            $('#notesContent').val("");
            //将最后一个li放到第一个
            /*var count = $('#experiment-note-ul li').length;
            for(var i = 0 ;i<count-1;i++){
                $('#experiment-note-ul').prepend($('#experiment-note-ul li:eq(0)'));
            }
           */
            layer.closeAll();
        }else if(sysresult.status==202){
            $("#Validform_msg").css({'display':'none'});
            layer.msg(data.msg,{icon:2,time:1500});
        }
    }
});

$('.submitBtn').on('click',function(){
	layer.confirm('是否确定提交实验报告？（报告提交你将不能修改，需更改请找任课老师）', {
	  btn: ['确定提交','暂不提交'] //按钮
	}, function(index){
		var content = '',
			contentText = '';
		content = ue.getContent();
		contentText = ue.getContentTxt();
		$('#reportEditorText').val(content);
		if(contentText.length != 0){
			var eleBox = $('.dataGetting').clone();
			eleBox.children('td').removeClass('selDefault');
			$('#templateContent').val(eleBox.html());
			$('#reportForm').submit();
			$(this).css('display','none');
		}else{
			layer.msg('请填写实验过程！');
		}
	});
})

$('.saveBtn').on('click',function(){
	layer.confirm('是否确定保存实验报告？）', {
		btn: ['确定保存','暂不保存'] //按钮
	}, function(index){
		var content = '';
		content = ue.getContent();
		$('#reportEditorText').val(content);
		var eleBox = $('.dataGetting').clone();
		eleBox.children('td').removeClass('selDefault');
		$('#submitStatus').val(6);
		$('#templateContent').val(eleBox.html());
		$('#reportForm').submit();
		$(this).css('display','none');
	});
})

$('.selImg-btn').on('click',function(){
	layer.open({
		type: 1,
		title: false, //不显示标题
		content: $('.dataGetting-img'),
		area: ['70%','600px']
	})
})

$('.labDetail-btn').on('click',function(){
	if($('.float-part').is(':hidden')){
		$('.float-part').slideDown();
	}else{
		$('.float-part').slideUp();
	}
})

$(function(){
	$("#Validform_msg").addClass("hide_Validform");
	
	var frameType = 1; //1关    0开
	$('.frameSlideBtn').on('click',function(){
		if(frameType == 1){
			frameType = 0;
			$('.uploadPart').css({'width':'50%','left':'50%'});
			$(this).css({'left':'49%'});
			$('#toolIframe').css({'left': '0'});
			$('#toolIframe')[0].contentWindow.tryTime_1 = 0;
			$('#toolIframe')[0].contentWindow.webSocket_1 = null;
			$('#toolIframe')[0].contentWindow.initWebsocket_1();
		}else{
			frameType = 1;
			$('.uploadPart').css({'width':'100%','left':'0'});
			$(this).css({'left':'-1%'});
			$('#toolIframe').css({'left': '-50%'});
			$('#toolIframe')[0].contentWindow.tryTime_1 = 6;
			$('#toolIframe')[0].contentWindow.closeSocket();
		}
	})
})