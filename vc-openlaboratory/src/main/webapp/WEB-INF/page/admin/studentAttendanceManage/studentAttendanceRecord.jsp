<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<!-- <!DOCTYPE html PUBLIC "-//W3C//DTD sHTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> -->
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://shiro.apache.org/tags"  prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<link rel="Shortcut Icon" type="image/ico" href="${RESOURCE_WAY }/system_file/img/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5shiv.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<style>
	.selTime{display:none;}
</style>

<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>用户考勤记录表</title>
</head>
<body>
	
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		用户考勤记录表
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			<p class="c-orange f-20 pl-20" style="margin-bottom:0px;letter-spacing:2px;"><strong>用户考勤表</strong></p>
			<div class="pl-20 pt-5 clearfix">
				<p style="margin-bottom:0px;" class="f-l pr-20">用户名称:<span class="c-666 pl-5"><strong>${userInfo.name }</strong></span></p>
				<p style="margin-bottom:0px;" class="f-l pr-20">用户账号: <span class="c-666 pl-5"><strong>${userInfo.userName }</strong></span></p>
			</div>
			<div class="pl-20 clearfix">
				<p style="margin-bottom:0px;" class="f-l pr-20">所属学院: <span class="c-666 pl-5"><strong>${userInfo.departmentName }</strong></span></p>
				<p style="margin-bottom:0px;" class="f-l pr-20">所在年级: <span class="c-666 pl-5"><strong>${userInfo.gradeName }</strong></span></p>
				<p style="margin-bottom:0px;" class="f-l pr-20">所属专业: <span class="c-666 pl-5"><strong>${userInfo.majorName }</strong></span></p>
				<p style="margin-bottom:0px;" class="f-l">所属班级: <span class="c-666 pl-5"><strong>${userInfo.className }</strong></span></p>
			</div>
		</div>
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20 text-r">
			 <a title="导出考勤记录" class="btn radius btn-success" href="javascript:void(0);" onclick="exportUserRecord()"><i class="Hui-iconfont Hui-iconfont-daochu"></i>导出考勤记录</a> 
			 <a title="导出考勤记录" class="btn radius btn-secondary" href="javascript:void(0);" onclick="exportUserRecordAll()"><i class="Hui-iconfont Hui-iconfont-daochu"></i>导出所有考勤记录</a> 
			 <a title="按时间段导出考勤记录" class="btn radius btn-primary" href="javascript:void(0);" onclick="exportUserRecordByTime()"><i class="Hui-iconfont Hui-iconfont-daochu"></i>按时间段导出考勤记录</a> 
		</div>

		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr>
						<th class="text-c" width="40">全选<input type="checkbox" onchange="checkOrUncheck(this)"></th>
						<th class="text-c" width="100">所在实验室</th>
						<th class="text-c" width="100">考勤机名称</th>
						<th class="text-c" width="100">考勤时间</th>
						<!-- <th class="text-c" width="100">操作</th> -->
					</tr>
				</thead>
				<tbody class="text-c">
					<!-- 
					<tr>
						<td class="text-c"><input type="checkbox" name="recordId"></td>
						<td class="text-c">实验室一</td>
						<td class="text-c">考勤机1</td>
						<td class="text-c">2018-09-17 10:44</td>
					-->
						<!-- 理应不开放删除考勤记录功能 -->
						<!-- <td class="text-c f-16" style="letter-spacing:2px;">
							<a href="javascript:void(0);" title="删除考勤记录" onclick="delMachine(123);"><i class="Hui-iconfont Hui-iconfont-del2"></i></a>
						</td> -->
<!-- 					</tr> -->
				</tbody>
			</table>
		</div>
	</div>
	
	<div class="selTime form pd-20">
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>开始时间：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',maxDate:'%y-%M-%d'})" id="startTime" class="input-text Wdate" placeholder="学期开始时间!" id="param" name="startTime" value="">
				</div>
			</div>
		</div>
		<div class="row cl">
			<label class="col-xs-3 col-sm-3 pn-0 text-r"><span class="c-red pr-5">*</span>结束时间：</label>
			<div class="formControls col-xs-8 col-sm-8">
				<div>
					<input type="text" onfocus="WdatePicker({dateFmt:'yyyy-MM-dd HH:mm:ss',minDate:'#F{$dp.$D(\'startTime\')}',maxDate:'%y-%M-%d'})" id="endTime" class="input-text Wdate" placeholder="学期结束时间!" id="param" name="endTime" value="">
				</div>
			</div>
		</div>
		<div class="row text-c">
			<div class="radius btn btn-primary exportRecord">导出考勤记录</div>
			<div class="radius btn" onclick="layer.closeAll()">取消</div>
		</div>
	</div>
		<form action="${ctx}/labClockInManageController/exportUserClockinRecord" method="post" id="fas">
		 <input type="hidden" name="type" value="1" id="type">
		 <input type="hidden" name="ids" value="" id="ids">
		 <input type="hidden" name="clockinId" value="${clockinId}" id="clockinId">
		 <input type="hidden" name="userId" value="${userInfo.userId }" id=""userId"">
		 <input type="hidden" name="startTime" value="" id="startTime">
		 <input type="hidden" name="endTime" value="" id="endTime">
	</form>
	
	<form action="${ctx}/labClockInManageController/exportUserClockinRecord" method="post" id="fal">
		 <input type="hidden" name="type" value="2" id="type">
		 <input type="hidden" name="ids" value="" id="ids1">
		 <input type="hidden" name="clockinId" value="${clockinId}" id="clockinId">
		 <input type="hidden" name="userId" value="${userInfo.userId }" id=""userId"">
		 <input type="hidden" name="startTime" value="" id="startTime">
		 <input type="hidden" name="endTime" value="" id="endTime">
	</form>
	<form action="${ctx}/labClockInManageController/exportUserClockinRecord" method="post" id="fatime">
		 <input type="hidden" name="type" value="3" id="type">
		 <input type="hidden" name="ids" value="" id="ids1">
		 <input type="hidden" name="clockinId" value="${clockinId}" id="clockinId">
		 <input type="hidden" name="userId" value="${userInfo.userId }" id=""userId"">
		 <input type="hidden" name="startTime" value="" id="startTime1">
		 <input type="hidden" name="endTime" value="" id="endTime1">
	</form>
	<%@include file="../../footer.jsp" %>
</body>
<script type="text/javascript">
	var userId ='${userInfo.userId }';
	var clockinId='${clockinId}';
</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/studentAttendanceManage/studentAttendanceRecord.js"></script>

</html>