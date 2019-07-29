<%@ page language="java" contentType="text/html; charset=utf-8"
	pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />

<!DOCTYPE HTML>
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
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/experimen-newFont/iconfont.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui.admin/css/style.css" />
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/css/common.css">
<link rel="stylesheet" type="text/css" href="${ctx }/staticfile/h-ui/css/dataTable-experiment-skin.css">
<!--[if IE 6]>
<script type="text/javascript" src="${ctx }/staticfile/lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>实验管理</title>
<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
</head>
<body>
	<nav class="breadcrumb">
		<i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span>
		实验管理 <span class="c-gray en">&gt;</span> 
		<c:if test="${menuParam==1}">
		所有实验
		</c:if>
		<c:if test="${menuParam==2}">
		院系实验
		</c:if>
		<c:if test="${menuParam==3}">
		我的实验
		</c:if>
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</nav>
	<div class="page-container clearfix">
	<div class="editbarcl pd-5 bg-1 bk-gray mb-20">
	<c:choose>
		<c:when test="${menuParam eq 1 }">
			
				<%-- 	<a onclick="Hui_admin_tab(this);" href="javascript: void(0);" data-title="添加实验" data-href="${ctx}/experimentController/toAddAllExperimentPage/${menuParam}" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a> --%>
				 <a onclick="experiment_add('添加实验','${ctx}/experimentController/toAddAllExperimentPage/${menuParam}')" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a> 
			
		</c:when>
		<c:when test="${menuParam eq 2 }">
				<%-- 	<a onclick="Hui_admin_tab(this);" href="javascript: void(0);" data-title="添加实验" data-href="${ctx}/experimentController/toAddAllExperimentPage/${menuParam}" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a> --%>
			 	<a onclick="experiment_add('添加实验','${ctx}/experimentController/toAddAllExperimentPage/${menuParam}')" title="添加" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a> 
		</c:when>
		
		<c:otherwise>
		<a onclick="Hui_admin_tab(this);" href="javascript: void(0);" data-title="添加实验" data-href="${ctx}/experimentController/toAddAllExperimentPage/${menuParam}" class="btn radius btn-primary"><i class="Hui-iconfont">&#xe600;</i>添加实验</a>
		</c:otherwise> 
	</c:choose>
	</div>
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="60">实验名称</th>
						<!-- <th width="60" class="<c:if test="${menuParam eq 2}">hide</c:if>">所属院系</th> -->
						<th width="60">所属院系</th>
						<th width="60">所属课程</th>
						<!-- <th width="30">实验类型</th> -->
					 	<th width="30">难易程度</th> 
					 	<th width="30">实验课时</th> 
						<th width="30">作者</th>
						<!-- <th width="20">开放状态</th> -->
						<th width="60">实验创建时间</th>
						<th width="60">最近修改时间</th>
						
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${experimentList }" var="experiment">
						<tr class="text-c">
							<%-- <td class="text-c">${experiment.experimentName }</td> --%>
							<c:choose>
								<c:when test="${menuParam eq 3 }">
								<td class="text-c">${experiment.experimentName }</td>									
								</c:when>
								<c:otherwise>
								<td class="text-c"data-title="${experiment.experimentName }" data-href="${ ctx}/experimentController/selectExperimentToPreviewPage/${experiment.experimentId }" onclick="Hui_admin_tab(this);"><a>${experiment.experimentName }</a></td>
								</c:otherwise>
							</c:choose> 
						<%-- <td class="text-c"data-title="${experiment.experimentName }" data-href="${ ctx}/experimentController/selectExperimentToPreviewPage/${experiment.experimentId }" onclick="Hui_admin_tab(this);"><a>${experiment.experimentName }</a></td>  	 --%>					
							<td class="text-c">${experiment.department.name }</td>
							<td class="text-c">
							    ${experiment.experimentCourse.courseName}
							</td>
								<td class="text-c">
							 <c:choose>
								<c:when test="${experiment.level==1 }">
									容易
								</c:when>
								<c:when test="${experiment.level==2 }">
									适中
								</c:when>
								<c:when test="${experiment.level==3 }">
									困难
								</c:when>
							</c:choose> 
							</td>
							<td class="text-c">${experiment.needHour }</td>		
							<%-- <td class="text-c">${experiment.keyword}</td> --%>
							<td class="text-c">${experiment.author.name}</td>
							<td class="text-c">${experiment.createTimeToString}</td>
							<td class="text-c">${experiment.updateTimeToString}</td>
							
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>


	<!--_footer 作为公共模版分离出去-->
	<%@include file="../../footer.jsp" %>
	<script type="text/javascript" src="${ctx }/staticfile/lib/jquery/1.9.1/jquery.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/layer/2.4/layer.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui/js/H-ui.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/h-ui.admin/js/H-ui.admin.js"></script>
	<!--/_footer 作为公共模版分离出去-->

	<!--请在下方写此页面业务相关的脚本-->

	<script type="text/javascript" src="${ctx }/staticfile/lib/My97DatePicker/4.8/WdatePicker.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/datatables/1.10.0/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="${ctx }/staticfile/lib/laypage/1.2/laypage.js"></script>
	<script type="text/javascript">

	//实验添加
	function experiment_add(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
		    scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//实验修改
	function experiment_edit(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['655px','450px'],
		    maxmin:true,
		    scrollbar: false,
			resize: true
		});
		// layer.full(index);
	}
	//实验预览
	function experiment_preview(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//分配资源
	function file_add(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//添加实验报告模板
	function experiment_add_muban(title,url){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin:true,
			scrollbar: false,
			resize: true
		});
		layer.full(index);
	}
	//实验删除
	function experiment_del(obj,id,stealth){
		layer.confirm('确认要删除吗？',{title:'删除实验'},function(index){
			$.ajax({
			 	type: 'POST',
			 	url: '${ctx}/experimentController/updateExperimentStealth/'+id+'/'+stealth,
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
	//修改实验开放状态
	function updateStatus(ids,status,title){
		$.ajax({
		 	type: 'POST',
		 	url: '${ctx}/experimentController/updateExperimentStatus/'+status,
		 	 data: {
				experimentIds:ids
			 },
		 	success: function(data){
		 		if(data.status==200){
					layer.msg('已设置为'+title,{icon: 1,time:1500});
					setTimeout('window.location.reload()',1500);
		 		}else{
					layer.msg(data.msg,{icon: 2,time:2000});
		 		}
		 	},
		 	error:function(data) {
				layer.msg("连接失败,服务器错误",{icon:2,time:1500});
		 	},
		 });
	} 
	
	
	
	$(function(){
		var experimentResource = $('input[experimentResource]').val();
		if('${menuParam}'!=2){
			if(experimentResource == 1){
				$('.table-sort').dataTable({
					"aaSorting": [[2, "desc" ]],//默认第几个排序
					"bStateSave": false,//状态保存
					"aoColumnDefs": [
					  {"orderable":false,"aTargets":[0,4/* ,8,9 */]}// 制定列不参与排序
					]
				});
			}else{
				$('.table-sort').dataTable({
					"aaSorting": [[2, "desc" ]],//默认第几个排序
					"bStateSave": false,//状态保存
					"aoColumnDefs": [
					  {"orderable":false,"aTargets":[0,4/* ,8,9 */]}// 制定列不参与排序
					]
				});
			}
		}else{
			if(experimentResource == 1){
				$('.table-sort').dataTable({
					"aaSorting": [[1, "desc" ]],//默认第几个排序
					"bStateSave": false,//状态保存
					"aoColumnDefs": [
					  {"orderable":false,"aTargets":[0,4/* ,8,9 */]}// 制定列不参与排序
					]
				});
			}else{
				$('.table-sort').dataTable({
					"aaSorting": [[1, "desc" ]],//默认第几个排序
					"bStateSave": false,//状态保存
					"aoColumnDefs": [
					  {"orderable":false,"aTargets":[0,4/* ,8,9 */]}// 制定列不参与排序
					]
				});
			}
		}
	});
</script>
</body>
</html>