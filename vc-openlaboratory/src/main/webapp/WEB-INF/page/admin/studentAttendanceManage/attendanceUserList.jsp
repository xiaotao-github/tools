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
	.selectMachines{display:none;}
	.selectMachines ul li div{border:1px solid #ddd;color:#666;cursor:pointer;}
	.selectMachines ul li.checked div{border:1px solid #4ca3bc;color:#4ca3bc;}
	.selectMachines ul li p{margin-bottom:0;}
	.selectMachines ul li i{font-size:30px;}
	#assignBtn{margin:0 auto;}
</style>

<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>考勤机用户录入总表</title>
</head>
<body>
	
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		考勤机用户录入总表${cmd}
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			<p class="c-orange f-20 pl-20" style="margin-bottom:0px;letter-spacing:2px;"><strong>考勤机用户录入总表</strong></p>
		</div>
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			<shiro:hasPermission name="录入用户（考勤机用户录入总表）">
			 	<a title="添加用户" class="btn radius btn-primary" href="javascript:void(0);" onclick="addUser('添加用户','${ctx }/labClockInManageController/toInputMachineUserInfoPage')"><i class="Hui-iconfont">&#xe600;</i>录入用户</a> 
			</shiro:hasPermission>
			 <shiro:hasPermission name="批量删除用户（考勤机用户录入总表）">
				 <a title="批量删除用户" class="btn radius btn-danger" href="javascript:void(0);" onclick="delAllUser()"><i class="Hui-iconfont Hui-iconfont-del2"></i>批量删除用户</a> 
			 </shiro:hasPermission>
			 <shiro:hasPermission name="分配用户（考勤机用户录入总表）">
			 	<a title="分配用户到考勤机" class="btn radius btn-success f-r" href="javascript:void(0);" onclick="assignUserToMachine('分配用户到考勤机')"><i class="Hui-iconfont Hui-iconfont-user-group"></i>分配用户</a> 
			 </shiro:hasPermission>
			
		</div>
		
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="60">全选<input type="checkbox" id="allCheckedBtn" onchange="checkOrUncheck(this);"></th>
						<th width="100">用户账号</th>
						<th width="100">用户名称</th>
						<th width="50">类型</th>
						<th width="100">所属院系</th>
						<th width="100">所属专业</th>
						<th width="100">所属年级</th>
						<th width="100">所属班级</th>
						<th width="60">指纹1</th>
						<th width="60">指纹2</th>
						<th width="60">指纹3</th>
						<th width="50">头像图片</th>
						<th width="50">人脸</th>
						<th width="50">密码</th>
						<th width="50">ID卡</th>
						<th width="200">录入时间</th>
						<th width="100">操作</th>
					</tr>
				</thead>
				<tbody class="tbody text-c">
					<!--  
					<c:forEach items="${userInfoList }" var="userInfo">
					<tr>
						<td class="text-c"><input type="checkbox" name="userId" value="${userInfo.id }"></td>
						<td class="text-c">${userInfo.username }</td>
						<td class="text-c">${userInfo.name }</td>
						<td class="text-c">${userInfo.type}</td>
						<td class="text-c">${userInfo.departName }</td>
						<td class="text-c">${userInfo.majorName }</td>
						<td class="text-c">${userInfo.gradeName }</td>
						<td class="text-c">${userInfo.className }</td>
					
						<td class="text-c">${userInfo.enrollFp1}</td>
						<td class="text-c">
							${userInfo.enrollFp2}
						</td>
						<td class="text-c">
							${userInfo.enrollFp3}
						</td>
						<td class="text-c">
							${userInfo.enrollPhoto}
						</td>
						<td class="text-c">
							${userInfo.enrollFace}
						</td>
						<td class="text-c">
							${userInfo.enrollPassword}
						</td>
						<td class="text-c">
							${userInfo.enrollCard}
						</td>
						<td class="text-c">${userInfo.createTime }</td>
						<td class="text-c f-16" style="letter-spacing:2px;">
							<a href="javascript:void(0);" title="查看用户考勤记录" onclick="Hui_admin_tab(this);" data-title="用户考勤记录" data-href="${ctx }/page/admin/studentAttendanceManage/studentAttendanceRecord"><i class="Hui-iconfont Hui-iconfont-yulan"></i></a>
							<a href="javascript:void(0);" title="删除该用户" onclick="delUser(123);"><i class="Hui-iconfont Hui-iconfont-del2"></i></a>
						</td>
					</tr>
					 </c:forEach>
					-->
				</tbody>
			</table>
		</div>
		
	</div>
	
	<div class="selectMachines pd-20 clearfix text-c">
			<ul class="row clearfix">
				<c:forEach items="${machineList }" var="machine">
						<li class="col-sm-3 col-md-3 mt-10 mb-10 pt-5 pb-5" thisId="${machine.clockinId }">
							<div>
								<p>编号: <span>${machine.clockinId }</span></p>
								<p><i class="Hui-iconfont Hui-iconfont-chajian"></i></p>
								<p>名称: <span>${machine.fkName }</span></p>
							</div>
						</li>
				</c:forEach>
			</ul>
		
		<div class="btn btn-primary radius mt-20" id="assignBtn">导入到考勤机</div>
	</div>
	<%@include file="../../footer.jsp" %>
</body>
<script type="text/javascript">
	var WISDOMLAB ='${sessionScope.WISDOMLAB}';
	var operatorId ='${teacherInfo.id}';
	var SET_USER_INFO ='${SET_USER_INFO}';
	var vcoocUserId ='${vcoocUserId}';
	var deleteUserByUserInfoList = '${deleteUserByUserInfoList}';

</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/js/studentAttendanceManage/attendanceUserList.js"></script>

</html>