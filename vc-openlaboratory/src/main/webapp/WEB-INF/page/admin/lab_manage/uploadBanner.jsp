<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE HTML>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<link href="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验室管理</title>
<style>
	.uploader-list-container .placeholder{padding-top:50px;background:#f5f5f5;min-height:200px;}
	/* .uploader-list-container .statusBar .btns .uploadBtn{display:none;} */
</style>

</head>
<body>
	<div class="page-container clearfix">
	<form  action="${ctx}/labClassCardPicWebController/addPicFiles" 
			method="post" class="form form-horizontal" class="form form-horizontal upLoadBanner" id="form-myself-upload-resource-edit" enctype="multipart/form-data">
			<div class="row cl">
				<label class="form-label col-xs-3 col-sm-2"><span class="c-red pr-5">*</span>标题：</label>
				<div class="formControls col-xs-9 col-sm-9">
					<input type="text" class="input-text" placeholder="" id="" name="title" dataType="*"/>
					<input type="hidden" name="labId" value = "${labId}"/>
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-3 col-sm-2"><span class="c-red pr-5">*</span>图片上传：</label>
				<div class="formControls col-xs-9 col-sm-9">
					<div class="uploader-list-container"> 
						<div class="queueList">
							<div id="dndArea" class="placeholder">
								<div id="filePicker-2"></div>
								<p>或将照片拖到这里，单次最多可选300张，只能上传gif,jpg,jpeg,bmp,png格式的图片</p>
							</div>
						</div>
						<div class="statusBar" style="display:none;">
							<div class="progress"> <span class="text">0%</span> <span class="percentage"></span> </div>
							<div class="info"></div>
							<div class="btns">
								<div id="filePicker2"></div>
								<!-- <div class="uploadBtn">开始上传</div> -->
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="row cl">
				<p class="col-xs-3 col-sm-2"></p>
				<p class="col-xs-9 col-sm-9 text-r"><span class="uploadBtn btn btn-primary radius">提交</span></p>
			</div>
		</form>
	</div>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.min.js"></script>
<script>
var ctx = "${ctx}";
</script>
<script type="text/javascript" src="${ctx }/staticfile/js/uploadBanner.js"></script>
<script type="text/javascript">
$("#form-myself-upload-resource-edit").Validform({
	btnSubmit:".uploadBtn", 
	tiptype:2, 
	ignoreHidden:false,
	dragonfly:false,
	tipSweep:false,
	label:".label",
	showAllError:true,
	postonce:true,
	ajaxPost:false,
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
		var fileTitle = $("input[name='title']").val();
		var filelabId = $("input[name='labId']").val();
			
		uploader.options.formData = {
				'labId':filelabId,
				'title':fileTitle,
		}
		
		if($(".filelist li").length == 0){
			if(link==null || link.trim()=='' ){
				layer.msg('没有上传资源文件,不能新增',{
					icon:1,
					time:2000
				});
				return false;
			}else{
				return true;
			}
		}else{
			uploader.upload();
			return false;
		}
	}
});

</script>
</body>
</html>