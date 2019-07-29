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
<title>考勤机列表管理</title>
</head>
<body>
	
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		考勤机管理
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			<p class="c-orange f-20 pl-20" style="margin-bottom:0px;letter-spacing:2px;"><strong>考勤机列表</strong></p>
		</div>
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			 <a title="" class="btn radius btn-primary" href="javascript:void(0);" onclick="addMachine('添加考勤机','${ctx }/labClockInManageController/toAddMachinePage')"><i class="Hui-iconfont">&#xe600;</i>添加考勤机</a> 
			 <a title="" class="btn radius btn-success f-r" href="javascript:void(0);" onclick="Hui_admin_tab(this)" data-title="用户录入总表" data-href="${ctx }/labClockInManageController/toMachineUserInfoListPage"><i class="iconfont icon-renyuanguanli5"></i>查看用户录入总表</a> 
		</div>
		
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr>
						<th class="text-c" width="100">考勤机ID</th>
						<th class="text-c" width="100">考勤机名称</th>
						<th class="text-c" width="100">所属实验室</th>
						<th class="text-c" width="100">操作</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach items="${machineList }" var="machihe">
					<tr>
						<td class="text-c">${machihe.clockinId }</td>
						<td class="text-c">${machihe.fkName }</td>
						<td class="text-c">${machihe.labName }</td>
						
						<td class="text-c f-16" style="letter-spacing:2px;">
							<shiro:hasPermission name="添加考勤机">
								<a href="javascript:void(0);" title="修改考勤机信息" onclick="editMachine('修改考勤机信息','${ctx }/labClockInManageController/toMachineEditPage/${machihe.clockinId }')"><i class="iconfont icon-bianji"></i></a>
							</shiro:hasPermission>
							<shiro:hasPermission name="查看考勤记录（考勤机用户管理）">
								<a href="javascript:void(0);" title="查看考勤记录" onclick="Hui_admin_tab(this);" data-title="考勤机考勤记录" data-href="${ctx }/labClockInManageController/toClockInRecordPage?userId=0&clockinId=${machihe.clockinId }"><i class="Hui-iconfont Hui-iconfont-yulan"></i></a>
							</shiro:hasPermission>
							<shiro:hasPermission name="考勤机用户管理">
							 	<a href="javascript:void(0);" title="考勤机用户管理" onclick="Hui_admin_tab(this);" data-title="考勤机用户管理" data-href="${ctx }/labClockInManageController/toMachineUserListPage?clockinId=${machihe.clockinId }"><i class="iconfont icon-renyuanguanli5"></i></a>
							</shiro:hasPermission>
							<shiro:hasPermission name="删除考勤机">
								<a href="javascript:void(0);" title="删除考勤机" onclick="delMachine('${machihe.clockinId }','${machihe.labId }');"><i class="Hui-iconfont Hui-iconfont-del2"></i></a>
							</shiro:hasPermission>
						</td>
					</tr>
					</c:forEach>
				
				</tbody>
			</table>
		</div>
		
	</div>
	<%@include file="../../footer.jsp" %>
</body>
<script type="text/javascript">
	var DELETE_MACHINE ='${DELETE_MACHINE}';
	var vcoocUserId ='${vcoocUserId}';
	var WISDOMLAB ='${sessionScope.WISDOMLAB}';
	var operatorId ='${teacherInfo.id}';
</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/studentAttendanceManage/machineList.js"></script>

</html>