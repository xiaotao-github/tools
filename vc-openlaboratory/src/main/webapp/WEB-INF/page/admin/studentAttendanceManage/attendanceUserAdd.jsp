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
		<form action="${ctx }/labClockInManageController/inputUserInfo" method="post" enctype="multipart/form-data" class="form" id="attendanceUserAdd-form">
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属院系：</label>
				<div class="formControls col-xs-8 col-sm-8"> 
					<div>
						<select name="departmentId" datatype="*" class="select select-box" id="departmentSelect" nullmsg="请选择院系！" errormsg="请选择院系！">
							<option value="">- 请选择院系 -</option>
						</select> 
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属专业：</label>
				<div class="formControls col-xs-8 col-sm-8"> 
					<div>
						<select name="majorId" datatype="*" class="select select-box" id="majorSelect" nullmsg="请选择专业！" errormsg="请选择专业！">
							<option value="">- 请选择专业 -</option>
						</select> 
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>所属年级：</label>
				<div class="formControls col-xs-8 col-sm-8"> 
					<div>
						<select name="gradeId" datatype="*" class="select select-box" id="gradeSelect" nullmsg="请选择年级！" errormsg="请选择年级！">
							<option value="">- 请选择年级 -</option>
						</select> 
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<div class="row cl">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>挑选班级导入：</label>
				<div class="col-xs-8 col-sm-8"> 
					<div class="bk-gray pd-5 cl" id="classesCheck">
						<!--  
						<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="1" datatype="*" nullmsg="请选择需要导入的班级！"><span>电子信息工程1班</span></label>
						<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="2"><span>电子信息工程2班</span></label>
						<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="3"><span>电子信息工程3班</span></label>
						<label class="col-xs-6 col-sm-6"><input type="checkbox" name="classId" value="4"><span>电子信息工程4班</span></label>
						-->
					</div>
					<div class="cl">
						<span class="Validform_checktip"></span>
					</div>
				</div>
			</div>
			<input type="hidden" name="id" value="${teacherInfo.id}" datatype="*">
			<div class="row cl mt-20">
				<label class="col-xs-3 col-sm-3 pn-0 text-r"></label>
				<div class="col-xs-8 col-sm-8">
					<button class="btn btn-primary radius"  type="button" id="attendanceUserAddSub"><i class="Hui-iconfont">&#xe600;</i>添加</button>
					<button class="btn radius" type="button" id="attendanceUserReset">重置</button>
				</div>
			</div>
		</form>
	</div>
</body>
	<script type="text/javascript">
		var userId = '${teacherInfo.id}';
		var manageUrl = '${sessionScope.MANAGE_URL }';
	</script>
	<!--_footer 作为公共模版分离出去-->
	<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
	<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--/_footer 作为公共模版分离出去-->
	
	<!--请在下方写此页面业务相关的脚本-->
	<script type="text/javascript" src="${ctx }/staticfile/lib/Validform/Validform_v5.3.2_min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/js/studentAttendanceManage/attendanceUserAdd.js"></script>
</html>