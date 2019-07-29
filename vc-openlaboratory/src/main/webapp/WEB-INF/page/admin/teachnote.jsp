<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>

<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css"> 

<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script>

<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
<title>实验笔记</title>
<style>
        #wish {
            width: 100%;
            height: 710px;
            position: relative;
            background: #F4F4F4;
        }

        .wish {
            width: 185px;
            height: 166px;
            color: black;
            padding: 10px 20px 20px 20px;
             box-shadow: 0px 6px 0px #CFCFCF;
             cursor:move;
        }

        .wish span {
            width: 185px;
            height: 20px;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            display: block;
            border-bottom:2px dashed #FFFFFF;
        }

        .wish p {
            width: 185px;
            height: 126px;
            font-size: 14px;
            word-wrap: break-word;
            word-break: normal;
            overflow: hidden;
        }

        .wish .close {
            display: block;
            position: absolute;
            top: -5px;
            right: -5px;
            background: #e80e0e; 
            width: 17px;
            height: 17px;
            display: none;
            cursor: pointer;
            text-align:center;
            line-height: 10px;
        }

        /*随机选择的便签背景*/
        .s1 {
            background: #00ffff;
        }

        .s2 {
            background: #ccff99;
        }

        .s3 {
            background: #33ff99;
        }

        .s4 {
            background: #99ff99;
        }

        .s5 {
            background: #ffff99;
        }
    </style>
    
</head>
<body>
<div id="wish">
   <!-- <div class="wish s1 ui-draggable" style="position: absolute; left: 438px; top: 401px;">
        <a class="close" style="display: none;" href="javascript:;" title="删除">x</a>
        <span id="times">
        </span>
        <p id="fonts"></p>
    </div> -->

   
 </div>
<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<!--加载教务笔记-->
<script type="text/javascript" > 

 $(function(){ 
	  $.ajax({
		async: false,
		type: 'post',
		url: '${ctx}/teachNotesController/selectNotesByUserId',
		dataType: 'json' ,  
		success: function(sysresult){
			  if(sysresult.status=="200"){
				  for(var i=0;i<sysresult.data.length;i++){
					var times = sysresult.data[i].createTime;
					times=parseInt(times,10);//转为整形
					var date =new Date(times);//正确
					 var notesId=sysresult.data[i].id;
					var div = '<div  notesId="'+notesId+'" class="wish s1 ui-draggable" style="position: absolute; left: 438px; top: 401px;"><a class="close" style="display: none;"  href="javascript:;" title="删除">x</a><span id="times">'+date.toLocaleString()+'</span><p id="fonts">'+sysresult.data[i].notesContent+'</p></div>'
						$("#wish").append(div);
				  }
			  }
		 	
		 	},
		 error:function(data) {
		
		 },
 	});  
 	
 	
/* 	  for(var i=0;i<=20;i++){
			var times="11131";
			var div = '<div  notesId class="wish s1 ui-draggable" style="position: absolute; left: 438px; top: 401px;"><a class="close" style="display: none;" onClick="teachnote_del(this)" href="javascript:;" title="删除">x</a><span id="times">2017-04-26 10:49</span><p id="fonts">safdfafsafafdfsafasdfdsafsdaf</p></div>'
			$("#wish").append(div); 
		}  */
	
	//删除
	$(".close").on('click',function(){
		_this=$(this);
			console.log($(this));
			var noteid = $(this).parent().attr('notesId');
		layer.confirm('确认要删除吗？',{title:'删除笔记'},function(index){
			$.ajax({
			 	type: 'POST',
			 	url: '${ctx}/teachNotesController/deleteNotesByNotesId/'+noteid,
			 	dataType: 'json',
			 	success: function(data){
			 		if(data.status=="200"){
			 			_this.parent().remove();
				 		layer.msg('已删除!',{icon:1,time:1000});
				 	    
			 		}else{
			 			layer.msg(data.msg,{icon:1,time:1000});
			 		}
			 	},
			 	error:function(data) {
			 		
			 	},
			 });
		});
	});
}); 

</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-ui.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/wish.js"></script>
<script type="text/javascript">
        $(document).ready(function () {
            $('#wish').wish();
            $('.wish').draggable({
                containment: "#wish",
                scroll: true
            });
        });
    </script>

     


