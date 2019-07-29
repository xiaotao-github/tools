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


<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>考勤机用户表</title>
</head>
<body>
	
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		考勤机用户表
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			<p class="c-orange f-20 pl-20" style="margin-bottom:0px;letter-spacing:2px;"><strong>考勤机用户表</strong></p>
			<div class="pl-20 pt-5">
				<p style="margin-bottom:0px;" class="f-l pr-20">考勤机名称:<span class="c-666 pl-5"><strong>${machine.fkName }</strong></span></p>
				<p style="margin-bottom:0px;" class="f-l pr-20">考勤机编号: <span class="c-666 pl-5"><strong>${machine.clockinId }</strong></span></p>
				<p style="margin-bottom:0px;" class="f-l">所在实验室: <span class="c-666 pl-5"><strong>${machine.labName }</strong></span></p>
			</div>
		</div>
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			 <shiro:hasPermission name="批量删除用户（考勤机用户录入总表）">
			 	<a title="批量删除用户" class="btn radius btn-danger" href="javascript:void(0);" onclick="delAllUser()"><i class="Hui-iconfont Hui-iconfont-del2"></i>批量删除用户</a> 
			 </shiro:hasPermission>
		</div>
		<%-- <div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			 <a title="添加用户" class="btn radius btn-primary" href="javascript:void(0);" onclick="addUser('添加用户','${ctx }/page/admin/studentAttendanceManage/machineUserAdd')"><i class="Hui-iconfont">&#xe600;</i>添加用户</a>
		</div> --%>
		
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="60">全选<input type="checkbox" id="allCheckedBtn" onchange="checkOrUncheck(this);"></th>
						<th width="100">用户账号</th>
						<th width="100">用户名称</th>
						<th width="100">用户类型</th>
						<th width="100">所属院系</th>
						<th width="100">所属专业</th>
						<th width="100">所属年级</th>
						<th width="100">所属班级</th>
						<th width="100">操作人</th>
						<th width="100">操作时间</th>
						<th width="100">操作</th>
					</tr>
				</thead>
				<tbody class="text-c">
<!-- 					<tr> -->
<!-- 						<td class="text-c"><input type="checkbox" name="userId" value="111"></td> -->
<!-- 						<td class="text-c">1111</td> -->
<!-- 						<td class="text-c">王大鹅</td> -->
<!-- 						<td class="text-c">计算机学院</td> -->
<!-- 						<td class="text-c">计算机科学与技术</td> -->
<!-- 						<td class="text-c">2016级</td> -->
<!-- 						<td class="text-c">计算机科学与技术1班</td> -->
<!-- 						<td class="text-c f-16" style="letter-spacing:2px;"> -->
<!-- 							<a href="javascript:void(0);" title="查看用户考勤记录" onclick="Hui_admin_tab(this);" data-title="用户考勤记录" data-href="${ctx }/page/admin/studentAttendanceManage/studentAttendanceRecord"><i class="Hui-iconfont Hui-iconfont-yulan"></i></a> -->
<!-- 							<a href="javascript:void(0);" title="删除该用户" onclick="delUser(123);"><i class="Hui-iconfont Hui-iconfont-del2"></i></a> -->
<!-- 						</td> -->
<!-- 					</tr> -->
				</tbody>
			</table>
		</div>
	</div>
	<%@include file="../../footer.jsp" %>
</body>
<script type="text/javascript">
	var WISDOMLAB ='${sessionScope.WISDOMLAB}';
	var operatorId ='${teacherInfo.id}';
	var DELETE_USER_BY_MACHINE ='${DELETE_USER_BY_MACHINE}';
	var vcoocUserId ='${vcoocUserId}';
	var deleteUserByUserInfoList = '${deleteUserByUserInfoList}';
	var clockinId ='${machine.clockinId }';
	var labId ='${machine.labId}';

</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/studentAttendanceManage/machineUserList.js"></script>

</html>