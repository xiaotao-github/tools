<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/changingCourse.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!--/meta 作为公共模版分离出去-->
</head>
<body>
<div class="page-container">
	<div class="tipsBox bk-gray mb-15">
		<p style="margin-bottom: 0;padding: 5px 15px;" class="c-red"><span class="c-red pr-5">*</span>考虑到教学过程中的课时临时调整情况及学生因课程需要增加机时的需要，系统提供实验室临时调课的的功能、方便用户使用实验室，也使得管理员可以更加科学有效的制定课表，安排机时。</p>
	</div>
	<div class="courseMsgBox pd-15 bg-1 bk-gray row cl">
		<p class="experimentName col-xs-12 col-sm-12 col-md-12">实验名称:&emsp;${csList.experiment.experimentName }</p>
		<div class="col-xs-12 col-sm-12 col-md-3 mb-15">
			<p>所属课程:&emsp;${csList.experimentCourse.courseName }</p>
			<p>所在实验室:&emsp;${csList.experimentLab.labName }</p>
			<p>上课时间:&emsp;${csList.newSchooltime }:${csList.sliceByte }</p>
		</div>
		<div class="changeMsgBox form col-xs-12 col-sm-12 col-md-7">
			<div class="row cl" style="margin-top:0;">
				<label class="col-xs-2 col-sm-2 pn-0 text-r"><!-- <span class="c-red pr-5">*</span> -->选择实验室: </label>
				<div class="formControls col-xs-10 col-sm-10 pr-15">
					<select name="" datatype="*" class="select select-box" id="labChange" onchange="_selLab(this)">
						<option value="">请选择实验室</option>
						<c:forEach items="${lablist }" var="lab">
						<option value="${lab.labId }">${lab.labName }</option>
						</c:forEach>
					</select> 
				</div>
			</div> 
			<div class="row cl">
				<label class="col-xs-2 col-sm-2 pn-0 text-r"><!-- <span class="c-red pr-5">*</span> -->选择周数: </label>
				<div class="formControls col-xs-10 col-sm-10 col-md-10 pr-15">
					<select name="" datatype="*" class="select select-box" id="weekChange" onchange="_selWeek(this)">
						<option value="-1" disabled="disabled">-请先选择实验室-</option>
					</select> 
				</div>
			</div> 
		</div>
	</div>
	<div class="scheduleBox row cl">
		<ul class="classesList col-xs-2 col-sm-2">
			<li><span>---</span></li>
			<li><span>第 1、2 节</span></li>
			<li><span>第 3、4 节</span></li>
			<li><span>午休</span></li>
			<li><span>第 5、6 节</span></li>
			<li><span>第 7、8 节</span></li>
			<li><span>第 9、10 节</span></li>
		</ul>
		<div class="classesContent col-xs-10 col-sm-10">
			<ul class="weekList clearfix">
				<li><div class="weekBox"><span>星期一</span></div></li>
				<li><div class="weekBox"><span>星期二</span></div></li>
				<li><div class="weekBox"><span>星期三</span></div></li>
				<li><div class="weekBox"><span>星期四</span></div></li>
				<li><div class="weekBox"><span>星期五</span></div></li>
				<li><div class="weekBox"><span>星期六</span></div></li>
				<li><div class="weekBox"><span>星期日</span></div></li>
			</ul>
			<div class="schedule clearfix">
				<div class="schedule-row">
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
				</div>
				<div class="schedule-row">
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
				</div>
				<div class="schedule-row">
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
				</div>
				<div class="schedule-row">
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
				</div>
				<div class="schedule-row">
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
				</div>
				<div class="schedule-row">
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
				</div>
				<div class="schedule-row">
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
					<div class="schedule-col"></div>
				</div>
			</div>
		</div>
		<div class="clearfix"></div>
		<div class="schedule-tips">
			<p><span class="color-part1"></span><span>整班上课</span></p>
			<!-- <p><span class="color-part2"></span><span>小组协作</span></p> -->
			<p><span class="color-part3"></span><span>自主预约</span></p>
		</div>
	</div>
</div>

<!--_footer 作为公共模版分离出去-->
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/jquery-1.8.3.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script> 
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script>
//开始时间所在的周一
var termStartTime = "${map.startTimeMonday}";
//console.log(termStartTime);
//consile.log("${map.endTime}");
//当前周
var selectedWeekNum = "${map.weekNum}";

//console.log("${map.weekCount}");
//console.log("${map.weekNum}");
//总周数
var total_weekNum ="${map.weekCount}";
var ctx = "${ctx}"; 
//课程表id
var scheduleId = "${csList.scheduleId}";
</script>
<script type="text/javascript" src="${ctx }/staticfile/js/changingCourse.js"></script>
<!--/_footer 作为公共模版分离出去-->
</body>
</html>