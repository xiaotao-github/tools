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
<title>实验室黑名单</title>
</head>
<body>
	
	<div class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验室黑名单
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</div>

	<div class="page-container clearfix">
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
			<p class="c-orange f-20 pl-20" style="letter-spacing:2px;"><strong>实验室黑名单</strong></p>
			<p class="pl-20">在实验室开放预约状态下,根据教师教学要求以及需要,可以对该实验室下已预约的学生进行加入黑名单操作，操作结果将在下表显示，点击删除即可将该学生从黑名单中解除。</p>
			<p class="c-red pl-20">*注意： 被加入黑名单的学生将不再拥有实验室的自主预约的权限。请教师谨慎操作！</p>
		</div>
		<div class="editbar cl pd-5 bg-1 bk-gray mb-20">
<%-- 			 <shiro:hasPermission name="批量删除用户（考勤机用户录入总表）"> --%>
<!-- 				 <a title="批量移除黑名单" class="btn radius btn-danger" href="javascript:void(0);" onclick="delAllUser()"><i class="Hui-iconfont Hui-iconfont-del2"></i>批量移除黑名单</a>  -->
<%-- 			 </shiro:hasPermission> --%>
		</div>
		
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr>
<!-- 						<th class="text-c" width="60">全选<input type="checkbox" id="allCheckedBtn" onchange="checkOrUncheck(this);"></th> -->
						<th class="text-c" width="100">用户账号</th>
						<th class="text-c" width="100">用户名称</th>
<!-- 						<th class="text-c" width="50">类型</th> -->
						<th class="text-c" width="100">所属院系</th>
						<th class="text-c" width="100">所属专业</th>
						<th class="text-c" width="100">所属年级</th>
						<th class="text-c" width="100">所属班级</th>
						<th class="text-c" width="200">创建时间</th>
						<th class="text-c" width="100">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${studentInfos }" var="userInfo">
					<tr>
<%-- 						<td class="text-c"><input type="checkbox" name="blacklistId" value="${userInfo.blacklistId }"></td> --%>
						<td class="text-c">${userInfo.studentInfo.username }</td>
						<td class="text-c">${userInfo.studentInfo.name }</td>
						<td class="text-c">${userInfo.studentInfo.departmentName }</td>
						<td class="text-c">${userInfo.studentInfo.majorName }</td>
						<td class="text-c">${userInfo.studentInfo.gradeName }</td>
						<td class="text-c">${userInfo.studentInfo.className }</td>
						<td class="text-c">${userInfo.createTimeStr }</td>
<%-- 						<td class="text-c">${userInfo.type}</td> --%>
					
						<td class="text-c f-16" style="letter-spacing:2px;">
							<a href="javascript:void(0);" title="移除黑名单" onclick="delUser(${userInfo.blacklistId },'${userInfo.studentInfo.name }','${userInfo.studentInfo.username }');"><i class="Hui-iconfont Hui-iconfont-del2"></i></a>
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

var loadingLayer ='';
function delUser(blacklistId,name,username){
	console.log(name);
	console.log(username);
	layer.confirm('确认要移出黑名单？',{title:'将该学生移除黑名单'},function(index){
		var url ='/lab/black/del';
		$.ajax({
		 	type: 'POST',
		 	url: url,
		 	dataType: 'json',
		 	data:{
		 		"blacklistId":blacklistId,
		 		"name":name,
		 		"username":username
		 	},
		 	success: function(data){
		 		if(data.status==200){
	        		 layer.msg(data.msg);
	        		 layer.close(index);
	        		 setTimeout('window.location.reload()',100);
	        	}else{
	        		layer.msg(data.msg);
	        	}
	 		},
		 	error:function(data) {
		 		layer.msg('服务器连接失败!');
		 	},
		 });
	});
}

</script>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
<script>
	$(".table").dataTable({  
		"aaSorting": [[1, "desc" ]],//默认第几个排序
		"bStateSave": false,//状态保存
		"aoColumnDefs": [
		  {"orderable":false,"aTargets":[0]}// 制定列不参与排序
	  	]
	});
</script>
</html>