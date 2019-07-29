<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">

<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/skin/default/skin.css" id="skin" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/cover.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<style type="text/css">
	.hide_Validform{
		display: none !important;
	}
</style>
</head>
<body>
<div class="page-container">
	<form action="${ctx}/experimentLabController/addLabCourseByExcel" method="post" class="form form-horizontal" id="form-teacherManage-addlist" enctype="multipart/form-data">
		<div class="row cl">
			<label class="col-xs-3 col-sm-2 pn-0 text-r">附件：</label>
			<div class="formControls col-xs-9 col-sm-9"> 
				<span class="btn-upload form-group">
					<input class="input-text radius uploadUrl" type="text" name="uploadfile-1" id="uploadfile-1" readonly="">
					<a href="javascript:void();" class="btn btn-primary radius upload-btn"><i class="Hui-iconfont"></i> 浏览文件</a>
					<input type="file" style="font-size:12px;" name="courseFile" class="input-file" accept="" nullmsg="请上传文件!" errormsg="请上传文件!" datatype="*">
				</span>
				<div> 
					<p class="cl" style="font-size:12px;">请下载模板,按模板格式导入数据</p>
					<span class="Validform_checktip"></span>
				</div>
				
			</div>
		</div>
		<div class="row cl text-c">
			<a class="btn radius btn-primary size-L" href="${ctx}/experimentLabController/downloadModel">
			<i class="iconfont icon-xiazai"></i>
			下载模板</a>
			 <a class="btn radius btn-primary size-L" href="" id="teacherManage-addlist-sub">
			<!--  <i class="Hui-iconfont">&#xe642;</i>  -->
			 <i class="iconfont icon-shangchuan2"></i>
			 立即上传</a> 
		</div>
	</form> 

</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<!--/_footer 作为公共模版分离出去-->

<!--请在下方写此页面业务相关的脚本-->
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript">
	$(function(){
		$("#form-teacherManage-addlist").Validform({
			btnSubmit:"#teacherManage-addlist-sub", 
			btnReset:"#teacherManage-addlist-reset",
			tiptype:2, 
			ignoreHidden:false,
			dragonfly:false,
			tipSweep:false,
			label:".label",
			showAllError:false,
			postonce:true,
			ajaxPost:true,
			datatype:{
				"*0-2": /^[^\s]{0,2}$/,
				"*0-20": /^[^\s]{1,20}$/,
				"z2-4" : /^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/,
				"n-en" : /[0-9a-zA-Z]{1,20}/,
				"ch"   : /[\u4E00-\u9FA5]+$/,
				"mail" : /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
				"phone" :/^((1[3,5,7,8][0-9])|(14[5,7])|(17[0,1,6,7,8]))\d{8}$/,
				"ch-en" : /^([A-Za-z]|[\u4E00-\u9FA5]{2,7}$)+$/
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
				curform.ajaxSubmit({
					type:'post',
					url:'${ctx}/experimentLabController/addLabCourseByExcel',
					success:function(sysresult){
						if(sysresult.status=="202" ||sysresult.status=="400"){
							layer.msg(sysresult.msg,{icon:2,time:3000});
						}else{
							layer.msg('添加成功！',{icon:1,time:1500,area:['100px','60px']});
							var index = parent.layer.getFrameIndex(window.name);
							setTimeout(function(){window.parent.location.reload();parent.layer.close(index);},1500);
							
						}
					},
				});
				return false;
			}
		});
		$(".input-file").change(function(){
			var url = $(this).val();
			$(".uploadUrl").val(url);
		})
	})
$().ready(function(){
	$("#Validform_msg").addClass("hide_Validform");
})
</script>