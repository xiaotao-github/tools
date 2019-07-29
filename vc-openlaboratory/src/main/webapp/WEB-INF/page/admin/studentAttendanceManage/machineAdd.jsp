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
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
<style type="text/css">
	.hide_Validform{
			display: none !important;
		}
</style>
</head>
<body>
	<div class="page-container">
		<form action="/labClockInManageController/addMachine" method="post" enctype="multipart/form-data" class="form" id="machineAdd-form">
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属实验室：</label>
				<div class="formControls col-xs-8 col-sm-8"> 
					<div>
						<select name="labId" datatype="*" class="select select-box" id="labSelect" nullmsg="请选择所属实验室！" errormsg="请选择所属实验室！">
						</select> 
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>考勤机ID：</label>
				<div class="formControls col-xs-8 col-sm-8"> 
					<div>
						<select name="clockinId" datatype="*" class="select select-box" id="clockinIdSelect" nullmsg="请选择考勤机ID！" errormsg="请选择所考勤机ID！">
						</select> 
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			
			<!-- 
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>考勤机ID：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<div>
						<input type="text" class="input-text" value="" placeholder="请输入考勤机ID!" id="" name="clockinId"  datatype="*" nullmsg="请输入考勤机ID"
						errormsg="考勤机ID不可用！请重新输入" ajaxurl="${ctx }/labClockInManageController/vaildateID">
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			 -->
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>考勤机名称：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<div>
						<input type="text" class="input-text" value="" placeholder="请输入考勤机名称!" id="param" name="name" datatype="*" nullmsg="请输入考勤机名称!"
						errormsg="考勤机名称不可用！请重新输入" ajaxurl="${ctx }/labClockInManageController/vaildateName">
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<%-- <div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>课程介绍：</label>
				<div class="formControls col-xs-8 col-sm-8">
					<div>
						<textarea name="presentation" cols="" rows="" class="textarea"  placeholder="请输入课程介绍..." dragonfly="true"  onKeyUp="$.Huitextarealength(this,500)" ignore="ignore">${experimentCourse.presentation }</textarea>
						<p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div> --%>
			<div class="row cl">
				<div class="col-xs-12 col-sm-12 text-c">
					<button class="btn btn-primary radius" type="button" id="machineAddSub"><i class="Hui-iconfont">&#xe600;</i>添加</button>
					<button class="btn radius" type="button" id="machineAddReset">重置</button>
				</div>
			</div>
		</form>
	</div>
</body>

	<!--_footer 作为公共模版分离出去-->
	<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
	<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--/_footer 作为公共模版分离出去-->
	
	<!--请在下方写此页面业务相关的脚本-->
	<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/studentAttendanceManage/machineAdd.js"></script>
</html>