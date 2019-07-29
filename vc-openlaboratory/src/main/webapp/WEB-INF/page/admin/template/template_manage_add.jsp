<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<c:set var="ueditFilePath" value="${FILE_PATH }/${experimentFilePath}" scope="session"/>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
	<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/public.css">
	<link href="${ctx }/staticfile/lib/webuploader/0.1.5/webuploader.css" rel="stylesheet" type="text/css" />
	<title>添加实验步骤</title>
</head>
<body>
	<div style="display:none;" class="AOE" pagestyle="0"></div>
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		模板添加 <span class="c-gray en">&gt;</span> 
		<span class="c-gray en">&gt;</span> 
		添加所属：${exName}的实验模板
	</div>
	<form  action="${ctx }/templateController/addTemplate" method="post" enctype="multipart/form-data" class="form form-horizontal" id="form-experimentManage-add">
		<input type="hidden" name="teacherInfoId" value="${teacherInfo.id }"/>
		<input type="hidden" name="experimentalId" value="${experimentId }">
		<div class="page-container">
			<div class="row cl">
				<label class="col-xs-12 col-sm-12 pn-0 text-r"><span class="c-red pr-5">*</span>模板要求/内容：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<script id="experimentEditor"  name="content" class="experimentEditor" style="width: 100%;"></script>
				</div>
			</div>

			<div class="row cl">
				 <div class="col-xs-12 col-sm-12 cl">
					<button type="button" class="submitBtn btn btn-primary radius">保存模板</button>
					<button onClick="" class="btn radius" type="button"><i class="Hui-iconfont pr-10">&#xe6dd;</i>取消</button>
				</div> 
			</div>
		</div>
	</form>
</body>

<script type="text/javascript" src="${ctx }/staticfile/js/jquery-1.8.3.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript">
var realPath='${ctx}';
//编辑器，图片上传展示需要的参数
var RESOURCE_WAY ='${RESOURCE_WAY}';
var ueditFilePath = '${experimentFilePath}';
</script>

<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.config.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/utf8-jsp/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx }/staticfile/utf8-jsp/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/templatet_manage_add.js"></script>
</html>