<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
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
	.textarea{height: 250px;}
</style>

</head>
<body>
	<div class="page-container">
		<form class="form form-horizontal upLoadBanner">
			<input type="hidden" name="labId" value="${param.labId }"/>
			<input type="hidden" name="teacherId" value="${teacherInfo.id }"/>
			<div class="row cl">
				<label class="form-label col-xs-3 col-sm-2"><span class="c-red pr-5">*</span>标题：</label>
				<div class="formControls col-xs-9 col-sm-9">
					<input type="text" class="input-text" placeholder="" id="" name="title">
				</div>
			</div>
			<div class="row cl">
				<label class="form-label col-xs-3 col-sm-2"><span class="c-red pr-5">*</span>公告内容：</label>
				<div class="formControls col-xs-9 col-sm-9">
					<textarea name="content" cols="" rows="" class="textarea" placeholder="请输入公告内容.." datatype="*" dragonfly="true" onkeyup="$.Huitextarealength(this,500)"></textarea>
				</div>
			</div>
			<div class="row cl">
				<p class="col-xs-3 col-sm-2"></p>
				<p class="col-xs-9 col-sm-9 text-r"><span class="submitBtn btn btn-primary radius">提交</span></p>
			</div>
		</form>
	</div>
<script type="text/javascript">
var ctx = '${ctx}';
</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>

<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/js/uploadMsg.js"></script>
</body>
</html>