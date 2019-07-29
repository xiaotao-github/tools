<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

   <!--权限判断   修改实验小组-->
	<c:set var="updateAllGroup" value="0"/>
	<c:set var="updateDeparGroup" value="0"/>
	<c:set var="updatePerGroup" value="0"/>
	       <c:set var="updateAllGroup" value="111"/>
<%-- 	<shiro:hasPermission name="修改实验小组(所有)">
	</shiro:hasPermission> --%>
   <shiro:hasPermission name="修改实验小组(院系)">	
	         <c:set var="updateDeparGroup" value="11"/>
	</shiro:hasPermission>
	<shiro:hasPermission name="修改实验小组(个人)">		
	         <c:set var="updatePerGroup" value="1"/>
	</shiro:hasPermission>
	
	   <!--权限判断   删除实验小组-->
	<c:set var="deleteAllGroup" value="0"/>
	<c:set var="deleteDeparGroup" value="0"/>
	<c:set var="deletePerGroup" value="0"/>
	<shiro:hasPermission name="修改实验小组(所有)">
	       <c:set var="deleteAllGroup" value="111"/>
	</shiro:hasPermission>
   <shiro:hasPermission name="修改实验小组(院系)">	
	         <c:set var="deleteDeparGroup" value="11"/>
	</shiro:hasPermission>
	<shiro:hasPermission name="修改实验小组(个人)">		
	         <c:set var="deletePerGroup" value="1"/>
	</shiro:hasPermission>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport"
	content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="${ctx }/staticfile/lib/html5shiv.js"></script>
<script type="text/javascript" src="${ctx }/staticfile/lib/respond.min.js"></script>
<![endif]-->
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/H-ui.min.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/H-ui.admin.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/lib/Hui-iconfont/1.0.8/iconfont.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/iconfont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<style>
	
</style>
<title>小组管理</title>
<script type="text/javascript"
	src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>

</head>
<body>

	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		小组管理 <span class="c-gray en">&gt;</span> 
		<c:if test="${menuParam==1}">
		所有实验小组
		</c:if>
		<c:if test="${menuParam==2}">
		院系实验小组
		</c:if>
		<c:if test="${menuParam==3}">
		我的实验小组
		</c:if>
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</nav>

	<div class="page-container clearfix">
		<c:choose>
			<c:when test="${menuParam eq 1 }">
				<shiro:hasPermission name="添加实验小组(所有)">
					<div class="editbarcl pd-5 bg-1 bk-gray mt-20">	
						<a onclick="group_add('添加小组','${ctx}/page/admin/experiment_group_manage/group_manage_add?menuParam=${menuParam}')" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont">&#xe600;</i>添加
						</a>
						<a onclick="group_add('添加历史小组','${ctx}/page/admin/experiment_group_manage/group_manage_assign?menuParam=${menuParam}')" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont">&#xe600;</i>添加历史实验小组
						</a>
					</div>
				</shiro:hasPermission>
			</c:when>
			<c:when test="${menuParam eq 2 }">
				<shiro:hasPermission name="添加实验小组(院系)">
					<div class="editbarcl pd-5 bg-1 bk-gray mt-20">	
						<a onclick="group_add('添加小组','${ctx}/page/admin/experiment_group_manage/group_manage_add?menuParam=${menuParam}')" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont">&#xe600;</i>添加
						</a>
						<a onclick="group_add('添加历史小组','${ctx}/page/admin/experiment_group_manage/group_manage_assign?menuParam=${menuParam}')" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont">&#xe600;</i>添加历史实验小组
						</a>
					</div>
				</shiro:hasPermission>
			</c:when>
			<c:otherwise>
				<shiro:hasPermission name="添加实验小组(个人)">
					<div class="editbarcl pd-5 bg-1 bk-gray mt-20">	
						<a onclick="group_add('添加小组','${ctx}/page/admin/experiment_group_manage/group_manage_add?menuParam=${menuParam}')" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont">&#xe600;</i>添加
						</a>
						<a onclick="group_add('添加历史小组','${ctx}/page/admin/experiment_group_manage/group_manage_assign?menuParam=${menuParam}')" title="添加" class="btn radius btn-primary">
							<i class="Hui-iconfont">&#xe600;</i>添加历史实验小组
						</a>
					</div>
				</shiro:hasPermission>
			</c:otherwise>
		</c:choose>
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="100">所属院系</th>
						<th width="80">所属课程</th>
						<th width="80">所属班级</th>
					    <th width="60">实验名称</th>
						<th width="60">小组名称</th>
					    <th width="110" style="display:none;">小组成员</th>
					    <th width="40">小组成员</th>
						<th width="40">指导老师</th>
						<th width="40">实验状态</th>
						<th width="40">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${experimentGroupList }" var="experimentGroup">
						<tr class="text-c">
							<td class="text-c">${experimentGroup.departmentName }</td>
						    <td class="text-c">${experimentGroup.experimentCourse.courseName }</td>
							<td class="text-c">${experimentGroup.tbClass.name }</td>
							<td class="text-c">${experimentGroup.experiment.experimentName }</td>							
							<td class="text-c">${experimentGroup.groupName }</td>
							<td class="text-c membersList" style="display:none;">${experimentGroup.studentListName }</td>
							<td class="text-c">
								<a style="color:#129bc5;" href="javascript:void(0);" title="查看小组成员" onclick="previewGroupMambers(${experimentGroup.experimentGroupId});"><i class="experimentFont">&#xe6af;</i>&nbsp;查看</a>
							</td>
							<td class="text-c">${experimentGroup.teacherInfo.name}</td>
							<td class="text-c">
								<c:choose>
									<c:when test="${experimentGroup.experimentStatus eq 1 }">即将开始</c:when>
									<c:when test="${experimentGroup.experimentStatus eq 2 }">进行中</c:when>
									<c:otherwise>已过期</c:otherwise>
								</c:choose>
							</td>
							<td class="text-c product-brand-manage">
								<a style="text-decoration: none;" onclick="previewGroup('小组预览','${ctx }/experimentGroupController/selectGroupAndStudentToPreviewPage/${experimentGroup.experimentGroupId }/${menuParam}')"><i class="experimentFont">&#xe64e;</i></a>
								 <c:choose>
									<c:when test="${menuParam eq 1 }">
										<c:if test="${updateAllGroup eq 111}">
											<a style="text-decoration: none;" onclick="group_edit('修改小组','${ctx }/experimentGroupController/selectGroupAndStudentToEditPage/${experimentGroup.experimentGroupId }')" title="修改"><i class="iconfont icon-bianji"></i></a>
										</c:if>
										<c:if test="${deleteAllGroup eq 111}">
											<a style="text-decoration: none" class="ml-5" onClick="group_del(this,${experimentGroup.experimentGroupId})" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
										</c:if>
									</c:when>
									<c:when test="${menuParam eq 2}">
										<c:if test="${updateDeparGroup eq 11}">
											<a style="text-decoration: none;" onclick="group_edit('修改小组','${ctx }/experimentGroupController/selectGroupAndStudentToEditPage/${experimentGroup.experimentGroupId }')" title="修改"><i class="iconfont icon-bianji"></i></a>
										</c:if>
										<c:if test="${deleteDeparGroup eq 11}">
											<a style="text-decoration: none" class="ml-5" onClick="group_del(this,${experimentGroup.experimentGroupId})" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
										</c:if>
									</c:when>
									<c:otherwise>
										<c:if test="${updatePerGroup eq 1}">
											<a style="text-decoration: none;" onclick="group_edit('修改小组','${ctx }/experimentGroupController/selectGroupAndStudentToEditPage/${experimentGroup.experimentGroupId }')" title="修改"><i class="iconfont icon-bianji"></i></a>
										</c:if>
										<c:if test="${deletePerGroup eq 1}">
											<a style="text-decoration: none" class="ml-5" onClick="group_del(this,${experimentGroup.experimentGroupId})" href="javascript:;" title="删除"><i class="experimentFont" style="color:#9a4346;">&#xe627;</i></a>
										</c:if>
									</c:otherwise>
								</c:choose> 
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>


	<!--_footer 作为公共模版分离出去-->
		<%@include file="../../footer.jsp" %>
	<script type="text/javascript"
		src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript"
		src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--/_footer 作为公共模版分离出去-->

	<!--请在下方写此页面业务相关的脚本-->

	<script type="text/javascript"
		src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<script type="text/javascript"
		src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/laypage/1.2/laypage.js"></script>
	<script type="text/javascript">

	//实验添加
	function group_add(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		// layer.full(index);
	}
	//实验修改
	function group_edit(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		// layer.full(index);
	}
	//实验删除
	function group_del(obj,id){
		layer.confirm('确认要删除吗？',{title:'删除小组'},function(index){
			$.ajax({
			 	type: 'POST',
			 	url: '${ctx}/experimentGroupController/deleteGroup/'+id,
			 	dataType: 'json',
			 	success: function(data){
			 		if(data.status=="200"){
			 			$(obj).parents("tr").remove();
				 		layer.msg('已删除!',{icon:1,time:1000});
			 		}else{
			 			layer.msg(data.msg,{icon:1,time:1000});
			 	}},
			 	error:function(data) {
			 		console.log(data.msg);
			 	},
			 });
		});
	}
	
	//小组信息预览
	function previewGroup(title,url){
		var index = layer.open({
			type:2,
			title: title,
			content: url,
			area : ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
	}
	
	//查看小组成员
	function previewGroupMambers(id){
		$.ajax({
			type:"post",
			url:"${ctx}/experimentGroupController/selectStudentByGroupId/"+id,
			async:"true",
			dataType: 'json',
			success:function(result){
				if(result.status==200){
					var content = "";
					console.log(result.data.length);
					for(var i = 0;i<result.data.length;i++){
						
						if(i==0){
							content = result.data[i].name;				
						}else{
							content = content +" "+result.data[i].name;				
						}
					}
					content = '<div class="pd-20"><p>'+content+'</p></div>';
					layer.open({
						type: 1,
						title: false, //不显示标题
						content: content,
						area: ['600px','200px']
					})
				}else{
					var content = "";
					content = result.msg;
					content = '<div class="pd-20"><p>'+content+'</p></div>';
					layer.open({
						type: 1,
						title: false, //不显示标题
						content: content,
						area: ['600px','200px']
					})
				}},
			error:function(){
				var content = "";
				content = "查询失败";
				content = '<div class="pd-20"><p>'+content+'</p></div>';
				layer.open({
					type: 1,
					title: false, //不显示标题
					content: content,
					area: ['600px','200px']
				})
			}	
			});
		//var content = $(obj).parent('td').siblings('.membersList').html();
	}
	
	
	$(function(){
		$('.table-sort').dataTable({
			"aaSorting": [[ 0, "desc" ]],//默认第几个排序
			"bStateSave": false,//状态保存
			"aoColumnDefs": [
			  {"orderable":false,"aTargets":[4,5,8]}// 制定列不参与排序
			]
		});
	});
</script>
</body>
</html>