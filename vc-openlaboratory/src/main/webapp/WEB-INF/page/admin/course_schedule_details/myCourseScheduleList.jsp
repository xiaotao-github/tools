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
		课表管理 <span class="c-gray en">&gt;</span> 
		我的课表
		<a class="btn btn-success radius r" style="line-height: 1.6em; margin-top: 3px" href="javascript:location.replace(location.href);" title="刷新">
			<i class="iconfont icon-shuaxin"></i>
		</a>
	</nav>
	<div class="pd-5 bg-1 bk-gray mt-20 ml-20 mr-20 clearfix">
	<form action="${ctx }/experimentLabStatisticsWebController/exportMyAllLabdata/${teacherInfo.id }"  method="post" class="f-r myAllScheduleForm">
			<div title="导出" class="btn radius btn-primary" onclick="putOutSchedule(1);">导出我的课表<i class="Hui-iconfont"></i></div>
	</form>
	</div>
	<div class="page-container clearfix">
		<div class="mt-20">
			<table class="table table-border table-bordered table-bg table-sort table-hover">
				<thead>
					<tr class="text-c">
						<th width="60">所属课程</th>
						<th width="60">实验名称</th>
						<th width="60">所属实验室</th>
						<th width="60">预约类型</th>
					 	<th width="60">上课时间</th> 
						<th width="60">创建时间</th>
						<th width="60">修改时间</th>
						<th width="30">操作</th>
					</tr>
				</thead>
				<tbody class="tbody">
					<c:forEach items="${csList }" var="cs">
						<tr class="text-c">
							<td class="text-c">${cs.experimentCourse.courseName }</td>
							<td class="text-c">${cs.experiment.experimentName }</td>
							<td class="text-c">${cs.experimentLab.labName }</td>
							<td class="text-c">
								<c:if test="${cs.type==1 }">
								整班上课
								</c:if>
								<c:if test="${cs.type==3 }">
								自主预约
								</c:if>
							</td>		
							<td class="text-c">
								<c:if test="${cs.timeStamp < currentTimeStamp}">
										<span>${cs.newSchooltime }</span> : <span>${cs.sliceByte }</span>
									
								</c:if>
								<c:if test="${cs.timeStamp >= currentTimeStamp}">
									<span class="c-green">${cs.newSchooltime }</span> : <span class="c-red">${cs.sliceByte }</span>
								</c:if>
							</td> 
							<td class="text-c">${cs.createTimeToString }</td>
							<td class="text-c">${cs.updateTimeToString }</td>
							<td class="text-c product-brand-manage">
							<c:if test="${menuParam == 3 }">
							<a style="text-decoration: none;" data-href="${ctx }/courseScheduleController/toScheduleDetailPage/${cs.scheduleId}/${menuParam}" data-title="预览${cs.experimentCourse.courseName }的排课" onclick="Hui_admin_tab(this);" title="查看课程">查看课程<i class="Hui-iconfont Hui-iconfont-sanjiao"></i></a>
							&nbsp;
							
							<c:if test="${cs.timeStamp > currentTimeStamp}">
							<a href="javascript:void(0);" onclick="changingCourse('${ctx }/courseScheduleController/changeCourse/${cs.scheduleId}','调课(${cs.experimentCourse.courseName })');" title="调课">调课<i class="Hui-iconfont Hui-iconfont-zhuanfa"></i></a>
							</c:if> 
							<!-- 上课时间小于当前时间不可修改 -->
							<c:if test="${cs.timeStamp <= currentTimeStamp}">
							<a href="javascript:layer.msg('该课程已经结束或正在进行，不可以更改！')" style="color:#999;">调课<i class="Hui-iconfont Hui-iconfont-zhuanfa"></i></a>
							</c:if>
							</c:if>
							</td>
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
	
	function putOutSchedule(type){
		if(type == 1){
			layer.confirm('是否确定导出您的所有课表信息!',{title:'导出课表',btn:['确定','取消']},function(index) {
				$('.myAllScheduleForm').submit();
				layer.close(index);
			},function(index){
				layer.close(index);
			});
		}
			
	}
	
	
	function changingCourse(url,title){
		var index = layer.open({
			type: 2,
			title: title,
			content: url,
			area: ['600px','450px'],
			maxmin: true,
			resize: true
		});
		//layer.full(index);
	}
	$('.table-sort').dataTable({
		"aaSorting": [[0, "desc" ]],//默认第几个排序
		"bStateSave": false,//状态保存
		"aoColumnDefs": [
		  {"orderable":false,"aTargets":[7]}// 制定列不参与排序
		]
	});
	
</script>
</body>
</html>