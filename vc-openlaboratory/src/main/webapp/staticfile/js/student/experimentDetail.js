//删除笔记
function delNote(id,obj){
    $.ajax({
        type:'POST',
        url:'/pexperiment/student/notes/delNoteById/'+id,
        success: function(sysresult){
            console.log(sysresult)
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


function initEditor(){
	var ue = UE.getEditor('reportEditor',{
		toolbars: [[
	    'fullscreen', 'source', '|', 'undo', 'redo', '|','bold', 'superscript', 'subscript', '|',  'insertorderedlist', 'insertunorderedlist','|', 'indent', '|','justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|','simpleupload', 'insertimage', 'emotion', '|','spechars', '|','inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol'
	    ]],
	    autoHeightEnabled: false,initialFrameHeight:200
	});
}

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
            var content =  sysresult.data.note.notesContent;
            var studentNotesId = sysresult.data.note.studentNotesId;
            var contentHtml = '<li class="note-each pd-5 mb-10 pos-r"><a href="javascript:void(0)" class="clearfix"><p class="date f-l"><span class="span1 fc-white fs-12">'+sysresult.data.yearMonth+'</span><span class="span2 fc-objBlue f-20">'+sysresult.data.date+'</span></p><p class="noteText fl mrl-5 fs-12">'+content+'</p></a><i class="stuEx-icon stuEx-icon-tianjia1 fs-16 fc-red" onclick="delNote('+studentNotesId+',this);"></i></li>';
            $("#experiment-note-ul").append(contentHtml);
            $('#notesContent').val("");
            //将最后一个li放到第一个
            var count = $('#experiment-note-ul li').length;
            for(var i = 0 ;i<count-1;i++){
                $('#experiment-note-ul').append($('#experiment-note-ul li:eq(0)'));
            }
            layer.closeAll();
        }else if(sysresult.status==202){
            $("#Validform_msg").css({'display':'none'});
            layer.msg(data.msg,{icon:2,time:1500});
        }
    }
});


$().ready(function(){
    $("#Validform_msg").addClass("hide_Validform");
})

$('.submitBtn').on('click',function(){
	var content = '';
	content = ue.getContent();
	$('#reportEditorText').val(content);
	$('#reportForm').submit();
})


$(function(){
	if(uploaded == 0){
		$('.reportUploaded').hide();
		initEditor();
	}else{
		$('#reportForm').hide();
	}
})